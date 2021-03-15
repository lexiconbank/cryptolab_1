const MDB_USER          = require('../models/MDB_USER');
const MDB_OTP           = require('../models/MDB_OTP');
const nodemailer        = require("nodemailer");
const ejs               = require("ejs");

module.exports = class AccountClass
{
    constructor(user_information)
    {
        this.mdb_user = new MDB_USER();
        this.user_information = user_information;
    }

    async validate()
    { 
        if(this.user_information.full_name.trim() == '' || this.user_information.password.trim() == '' || this.user_information.email.trim() == '')
        {
            return {status : "error", message : "You need to fill up all fields in order to proceed."};
        }
        else if(this.user_information.confirm_password !== this.user_information.password)
        {
            return {status : "error", message : "The password you entered didn't match."};
        }
        // else if(this.user_information.value == false || this.user_information.value == null)
        // {
        //     return {status : "error", message : "Before you complete your registration, you must accept the Terms and Conditions."};
        // }
        else
        {
            console.log('validate email');

            let is_email_exist = await this.mdb_user.findByEmail(this.user_information.email);
            console.log(is_email_exist);
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
                password: this.user_information.password,
                country:this.user_information.country
            }

            await this.mdb_user.add(add_form);

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

    async postKyc(){
        let res = {};
        try
        {
            res.status = "success";

            let kyc_info =
            { 
                id                  : this.user_information.id,
                first_name          : this.user_information.first_name,
                middle_name         : this.user_information.middle_name,
                last_name           : this.user_information.last_name,
                birth_date          : this.user_information.birth_date,
                country             : this.user_information.country,
                nationality         : this.user_information.nationality,
                mobile_number       : this.user_information.mobile_number,
                address_line        : this.user_information.address_line,
                street              : this.user_information.street,
                city                : this.user_information.city,
                zip_code            : this.user_information.zip_code,
                id_type             : this.user_information.id_type,
                id_number           : this.user_information.id_number,
                id_expiry           : this.user_information.id_expiry,
                security_question   : this.user_information.security_question,
                security_answer     : this.user_information.security_answer,
                code                : this.user_information.code,
                id_image            : this.user_information.id_image,
                selfie_image        : this.user_information.selfie_image,
                kyc_status          : this.user_information.kyc_status,
                kyc_submitted       : this.user_information.kyc_submitted,
            }
           await this.mdb_user.postKyc(kyc_info);
        }
        catch (error)
        {
            res.status = "error";
            res.message = error.message;
        }

        return res;
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

    async getKyc_Data()
    {
        let res = {};
        try
        {
            res.status = "success";
            let response = await this.mdb_user.getKycData();
            res.data = response;
        }
        catch (error)
        {
            res.status = "error";
            res.message = error.message;
        }

        return res;
    }

    async userInfoClass()
    {
        let res = {};
        try
        {
            res.status = "success";
            let user = 
            {
                id: this.user_information.id
            }
            let response = await this.mdb_user.userInfoModel(user);
            res.data = response;
        }
        catch (error)
        {
            res.status = "error";
            res.message = error.message;
        }

        return res;
    }

    async updateKycStatus()
    {
        let res = {};
        try
        {
            res.status = "success";

            let kyc_info =
            { 
                id: this.user_information.id,
                kyc_status: this.user_information.kyc_status
                
            }
           await this.mdb_user.update_kycstatus(kyc_info);
        }
        catch (error)
        {
            res.status = "error";
            res.message = error.message;
        }

        return res;
    }

    async update_kyc()
    {
        let res = {};
        try
        {
            res.status = "success";

            let kyc_info =
            { 
                id: this.user_information.id,
                kyc_status: this.user_information.kyc_status,
                remarks: this.user_information.remarks
                
            }
           await this.mdb_user.update_kyc_rejected(kyc_info);
        }
        catch (error)
        {
            res.status = "error";
            res.message = error.message;
        }

        return res;
    }

    async userMasterList()
    {
        const mdb_user = new MDB_USER();
        let res = {}

        try {
            let users = await mdb_user.findAllClients();

            res.data   = users;
            res.status = "success";
        }
        catch (error) {
            res.status  = "error";
            res.message = error.message;
        }
        return res;
    }

    
    static async fetchClientsByKyc({kyc_status})
    {
        let res                 = {};
        const mdb_user          = new MDB_USER();
        const clients_res_obj   = await mdb_user.fetchClientsByKyc({kyc_status});

        if(Array.isArray(clients_res_obj))
        {
            res.status  = 'success';
            res.clients = clients_res_obj;
        }

        if(clients_res_obj == null)
        {

            res.status  = 'error';
            res.message = 'returned data is equal to null';
        }

        return res;

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


    static async fetchUserKyc(_id)
    {
            let res = {}
            const mdb_user      = new MDB_USER();
            const kyc_res_obj   = await mdb_user.fetchUserKyc(_id);

            if (kyc_res_obj == null || kyc_res_obj == '')
            {
                res.status      = 'error';
                res.message     = 'no document found';
            }

            if (res.status == undefined || res.status == null || res.status == '')
            {
                res.status      = 'success';
                res.kyc         = kyc_res_obj;
            }

            return res;
            }

    async frontendMounted()
    {
        const mdb_user       = new MDB_USER();
        let res = {};

        try
        {
            let user_info  = await mdb_user.findByUserId(this.user_information.user_id);
            let conversion = await mdb_conversion.findByAbbreviation('USD');

            res.user_info  = user_info;
            res.conversion = conversion;
            res.status     = "success";
        }
        catch(error)
        {
            res.status  = "error";
            res.message = error.message;
        }
        return res;
    }

}