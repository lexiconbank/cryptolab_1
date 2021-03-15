const MDB_USER          = require('../models/MDB_USER');
const MDB_WALLET        = require('../models/MDB_WALLET');
const MDB_OTP           = require('../models/MDB_OTP');
const nodemailer        = require("nodemailer");
const ejs               = require("ejs");
const axios             = require('axios');

module.exports = class AccountClass
{
    constructor(user_information)
    {
        this.mdb_user = new MDB_USER();
        this.user_information = user_information;
    }

    async validate()
    { 
        if(this.user_information.full_name.trim() == '' || this.user_information.password.trim() == '' || this.user_information.email.trim() == '' || this.user_information.username == '')
        {
            return {status : "error", message : "You need to fill up all fields in order to proceed."};
        }

        else if(this.user_information.confirm_password !== this.user_information.password)
        {
            return {status : "error", message : "The password you entered didn't match."};
        }

        else
        {
            let is_email_exist = await this.mdb_user.findByEmail(this.user_information.email);
            
            if (is_email_exist) 
            {
                return {status : "error", message :  "The email address you entered is already in use"};
            } 
            else 
            {
                await this.sendUserOtp(this.user_information.email, "", "registration");
                return {status : 'success'};
            }
        }

    }

    async authenticate()
    {
        let res = {};
        try
        {
            let user_data = 
            {
                email: this.user_information.email,
                password: this.user_information.password
            }

            let user = await this.mdb_user.findByUsernameAndPassword(user_data);

            if(user)
            {
                res.status = "success";
            }
            else
            {
                res.status = "error",
                res.message = "Invalid Credentials";
            }
        }
        catch(error)
        {
            res.status = "error",
            res.message = error.message;
        }

        return res;
    }

    async create()
    {
        let res = {};
        try
        {

            let add_form =
            { 
                full_name: this.user_information.full_name,
                email: this.user_information.email,
                username: this.user_information.username,
                password: this.user_information.password,
                country:this.user_information.country
            }

            let user_info  = await this.mdb_user.add(add_form);

            console.log('user registered : ', user_info);

            // ************* BTC WALLET **************

            const mdb_wallet        = new MDB_WALLET();
            const mdb_user          = new MDB_USER();

            let res  = {};
            let _id     = user_info._id;
            let username = user_info.username;

            const btc_network = process.env.BTC_NETWORK;
            const btc_api = btc_network == 'mainnet' ? 
                'http://178.128.92.211:3000/api/create_address/' : 
                'http://178.128.92.211:3000/api/testnet/create_address/';
                await axios.post(btc_api, { name: username })
                .then(async (response) => {
                    let wallet_details_btc 		=
                    {
                        user_id:                _id,
                        currency_name:          "Bitcoin",
                        currency_abbreviation:  "BTC",
                        decimal_places:         8,
                        public_key:             response.data.result,
                        balance:                0
                    }

                    let btc_wallet = await mdb_wallet.add(wallet_details_btc); // DB save
                    mdb_user.update( _id, {         // DB update
                        $addToSet: { wallet: btc_wallet._id }
                    })
                }, (error) => {
                    console.log(error)
                });

            res.status = "success";
            res.message = "Successfully Registered";
        }   
        catch (error)
        {
            res.status = "error";
            res.message = error.message;
        }

        return res;
    }

     async getUser()
     {
        console.log(this.user_information, 'user');
        let { user_id } = this.user_information;
        let user_info = await this.mdb_user.findByUserId(user_id);

        return user_info;
     }
 

    //FORGOT PASSWORD

     /**
     *
     * @param { String } email
     *
     * @return { Object }
     */
    async forgotPassword (email)
    {
        const mdb_user = new MDB_USER();
        let res = {};
        try {
            // check if email address is existing
            let is_email_exist = await mdb_user.findByEmail(email);

            if (is_email_exist) {
                let { email } = is_email_exist;
                // send otp
                await this.sendUserOtp(email, "", 'forgot_password');
                res.status = 'success';
            } else {
                res.status = 'not matched';
                res.message =  `${email} not match in our records`;
            }
        } catch (error) {
            res.status = 'error';
            res.message = error.message;
        }
        return res;
    }

    async sendUserOtp(email, username, otp_for)
    {
        await this.createUserOtp(email, username, otp_for);
    }

    async createUserOtp(email, username, otp_for)
    {
        let mdb_otp     = new MDB_OTP();
        let otp         = this.generateOtp(otp_for);

        let otp_result = {};

        if (otp_for == 'forgot_password') {
            await this.sendOtpEmail(email, otp, otp_for);
            let deleted_otp = await mdb_otp.removeOtpByUserOrEmail(email);
            otp_result  = await mdb_otp.createUserOtp({email: email, otp: otp, otp_for: otp_for});
        } else {
            await this.sendOtpEmail(email, otp);
            let deleted_otp = await mdb_otp.removeOtpByUserOrEmail(username);
            otp_result  = await mdb_otp.createUserOtp({email: email, username: username, otp: otp, otp_for: otp_for});
        }

        return otp_result;
    }

    async sendOtpEmail(email, otp, otp_for = '')
    {
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true, // use SSL
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });

        otp = (otp_for == 'forgot_password') ? `${process.env.RESET_PASSWORD_LINK}/${otp}` : otp;
        let email_template = (otp_for == 'forgot_password') ? 'email_template_forgot_password.ejs' : 'email_template.ejs';
        let html = await ejs.renderFile(`./views/${email_template}`, { otp });

        let from = `"Cryptolab One Time Passcode" ${process.env.EMAIL}`;
        let subject = 'One Time Passcode';

        if (otp_for) {
            from = `"Cryptolab Reset Password" ${process.env.EMAIL}`;
            subject = 'Reset Password';
        }

        let mailOptions = {
            from    : from,
            to      : email,
            subject : subject,
            html    : html
        };

        let res = await transporter.sendMail(mailOptions);

        return res.accepted.includes(email) === false ? 'otp not sent' : 'otp sent';
    }

    generateOtp(otp_for)
    {
        const numbers       = "0123456789";
        const chars         = "abcdefghijklmnopqrstuvwxyz";
        const chars_caps    = chars.toUpperCase();
        const all_chars     = numbers + chars + chars_caps;
        let otp = '';
        let length = (otp_for == 'forgot_password') ? 26 : 6;
        for (let i = 0; i < length; i++) {
            let rand = this.getRandomArbitrary(0, all_chars.length);
            otp += all_chars[parseInt(rand)];
        }

        return otp;
    }

    getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }

    async validatepassword(reset_data)
    {
        if(reset_data.password != reset_data.confirm_password)
        {
            // res.status      = "error";
            // res.message     = "The password you entered didn't match.";
            return {status : "error", message : "The password you entered didn't match."};
        }
        else
        {
            let is_valid = await this.validateResetUserPasswordData(reset_data);
            if (is_valid.status == 'success' && is_valid.email) {
                return { status : "success", email : is_valid.email, user_id: is_valid.user_id };
            } else {
                return is_valid;
            }
        }
    }

    async validateResetUserPasswordData(reset_data)
    {
        const { password, confirm_password, key } = reset_data;
        console.log(reset_data.key, 'gg');
        let res = {};

        try {
            let mdb_otp = new MDB_OTP();
            let otp_data = await mdb_otp.findByOtp(key);

            if (otp_data) {
                res.status = 'success';
                res.email = otp_data.email;
                res.user_id = otp_data._id;
            } else {
                res.status = 'error';
                res.message = 'Either your link has expired or invalid';
            }
        } catch (error) {
            res.status = 'error';
            res.message = error.message;
        }
        
        return res;
    }

    async resetpassword(email, new_password)
    {
        let res        = {};
        let reset      = await this.mdb_user.resetpass(email, new_password);
        if (reset) {
            res.status = 'success';
        } else {
            res.status = 'error';
            res.message = 'Error in changing password';
        }
    }

    async resendUserOtp(email, username, otp_for)
    {
        let res         = {};
        let mdb_otp     = new MDB_OTP();
        // delete existing user otp
        let deleted_otp = await mdb_otp.removeOtpByUserOrEmailAndFor(email, otp_for);
        // create new user otp
        let otp_result  = await this.createUserOtp(email, username, otp_for);
        // check if otp_result is json object and if empty
        if(Object.keys(otp_result).length == 0)
        {
            res.status  = 'error';
            res.message = otp_result
        }
        else
        {
            res.status  = 'success';
        }
        return res;
    }
    
}


