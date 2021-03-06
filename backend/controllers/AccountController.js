const AccountClass   = require('../classes/AccountClass');
const User           = require('../models/MDB_USER').User;
const MDB_OTP        = require('../models/MDB_OTP');
const bcrypt         = require('bcryptjs');
const saltRounds     = 10;

const { render } = require('ejs');
module.exports =
{
    async login(req, res)
    {
        let email           = req.body.email;
        let password        = req.body.password;

        let authenticate    = await new AccountClass({email:email, password:password}).authenticate();
        
        if(authenticate.status == "success")
        {
            res.send(true);
        }
        else if(authenticate.status == "error")
        {
            res.status(400).send({ message: authenticate.message })
        }
    },

    async loginAdmin(req, res)
    {
        let email           = req.body.email;
        let password        = req.body.password;

        let authenticate    = await new AccountClass({email:email, password:password}).authenticateAdmin();
        
        if(authenticate.status == "success")
        {
            res.send(true);
        }
        else if(authenticate.status == "error")
        {
            res.status(400).send({ message: authenticate.message })
        }
    },

    async registration(req, res)
    {
        // remove {req, res} parameter if MDB.register doesn't need extra params anymore {req, res}
        let user_information =
        {
            full_name: req.body.full_name,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            confirm_password: req.body.confirm_password,
            country: req.body.country,
            terms: req.body.value
        }

        let account_class = new AccountClass(user_information);

        let account_validation = await account_class.validate();

        if(account_validation.status == "success")
        {
            res.json({ status: 'success', message: 'Successfully Registered' }).status(200);
        }
        else if(account_validation.status == "error")
        {
            res.status(200).send({ status : 'error', message: account_validation.message });
        }
    },

    async getUsersData(req, res)
    {
        let user_information = {
			user_id : req.body._id
		}

		let account_class = new AccountClass(user_information);
		let account = await account_class.getUser();
        res.send(account);
    },

    async forgotPassword (req, res)
    {
        const email = req.body.email;

        let account_class = new AccountClass();
        let forgot_pass = await account_class.forgotPassword(email);

        if (forgot_pass.status == 'success') {
            res.json(forgot_pass).status(200);
        }
        else if(forgot_pass.status =='not matched')
        {
            res.status(200).send({ status : 'not matched', message : forgot_pass.message });
        } 
        else 
        {
            res.status(400).send({ status : 'error', message : forgot_pass.message });
        }
    },

    async kyc(req, res)
    {
        let kyc_info =
        {
            id                  : req.body.id,
            first_name          : req.body.first_name,
            middle_name         : req.body.middle_name,
            last_name           : req.body.last_name,
            birth_date          : req.body.birth_date,
            country             : req.body.country,
            nationality         : req.body.nationality,
            mobile_number       : req.body.mobile_number,
            address_line        : req.body.address_line,
            street              : req.body.street,
            city                : req.body.city,
            zip_code            : req.body.zip_code,
            id_type             : req.body.id_type,
            id_number           : req.body.id_number,
            id_expiry           : req.body.id_expiry,
            security_question   : req.body.security_question,
            security_answer     : req.body.security_answer,
            code                : req.body.code,
            id_image            : 'id/' + req.files.id_image_files[0].filename,
            selfie_image        : 'selfie/' + req.files.selfie_image_files[0].filename,
            kyc_status          : 'pending',
            kyc_submitted       : Date.now()
        }
        let account_class = new AccountClass(kyc_info);
        let resp = await account_class.postKyc();
        res.send(resp);
    },


    async validateLinkKey (req, res)
    {
        let key = req.params.key;

        let account_class = new AccountClass();
        let is_valid = await account_class.validateKey(key);

        if (is_valid.status == 'success') {
            res.json({ status: 'success' }).status(200);
        } else {
            res.status(400).send({ status : 'error', message : is_valid.message });
        }
    },

    async fetchClientsByKyc(req, res)
    {
        let kyc_status          = req.body.kyc_status;
        
        let clients_res_obj     = await AccountClass.fetchClientsByKyc({kyc_status});

        if(clients_res_obj.status == 'success')
        {
            res.status(200).json({clients: clients_res_obj.clients});
        }

        if(clients_res_obj.status == 'error')
        {
            res.status(200).json({status: 'error', message: clients_res_obj.message});
        }
    },


    async frontendMounted(req, res)
    {
        if(req.session.user_info == undefined) {
            return;
        }
        else
        {
            let details = {
                user_id: req.session.user_info._id
            }

            let account_class = new AccountClass(details);
            let result = await account_class.frontendMounted();

            if(result.status == "success")
            {
                res.status(200).json({ 
                    status:     result.status, 
                    user_info:  result.user_info,
                    conversion: result.conversion
                });
            }
            else
            {
                res.status(400).json({ status: result.status, message: result.message });
            }
        }
    },

    async fetchUserKyc(req, res)
    {
        const kyc_res_obj = await AccountClass.fetchUserKyc('6046c2383d635207c43f2b02');  //5f90343d21e259119cb22fcc
        if(kyc_res_obj.status == 'success')
        {
            res.json({status: 'success', kyc: kyc_res_obj.kyc}).status(200);
        }
        else
        if(kyc_res_obj.status == 'error')
        {
            res.json({status: 'error', message: kyc_res_obj.message}).status(400);
        }
    },  

    async userMasterList(req, res)
    {
        let account_class = new AccountClass();
        let result = await account_class.userMasterList();

        if(result.status == 'success')
        {
            res.status(200).json({ status: result.status, data: result.data });
        }
        else if (result.status == 'error')
        {
            res.status(400).json({ status: result.status, message: result.message });
        }
    },

    async fetch(req, res){
    
        const account_class = new AccountClass(req.body);
        const result = await account_class.fetch();
      
        if(result.status == 'success')
        {
            res.json(result.data).status(200);
        }
        else
        {
            res.json(result.message).status(400);
        }
    },

    async resetUserPassword(req, res)
    {
        let reset_data =
        {
            password            : req.body.password,
            confirm_password    : req.body.confirm_password,
            key                 : req.params.key
        };

        let account_class = new AccountClass();
        let reset_password = await account_class.validatepassword(reset_data);

        if (reset_password.status == 'success') {
            // update password
            let email = reset_password.email;
            let password = reset_data.password;
            let id = reset_password.user_id;

            // const salt = await bcrypt.genSalt(10);
            //reset_data.password = await bcrypt.genSaltSync(reset_data.password, salt);

            const salt = bcrypt.genSaltSync(saltRounds);
            // const hash = bcrypt.hashSync(reset_data.password, salt);
            // password = bcrypt.hashSync(password, salt);
            // console.log(hash);

            // bcrypt.compareSync - compare has & pass from frontend
            // console.log(bcrypt.compareSync('password', hash)); 

            let reset = await account_class.resetpassword(email, password);

        } else {
            res.status(400).send({ status : 'error', message : reset_password.message });
        }
    },

    async kyc_data (req, res){
        let account_class = new AccountClass();
        let kyc_data = await account_class.getKyc_Data();
        res.send(kyc_data);
    },

    async userInfoControlller (req, res){
        let user = 
        {
            id: req.body.id
        }
        let account_class = new AccountClass(user);
        let user_info = await account_class.userInfoClass();
        res.send(user_info);
    },

    async kyc_approved (req, res){
        let kyc_details =
        {
            id: req.body.id,
            kyc_status: 'approved'
        }
        let account_class = new AccountClass(kyc_details);
        let resp = await account_class.updateKycStatus();
        res.send(resp);
    },

    async kyc_rejected (req, res){
        let kyc_details =
        {
            id: req.body.id,
            kyc_status: 'rejected',
            remarks: req.body.remarks
        }
        let account_class = new AccountClass(kyc_details);
        let resp = await account_class.update_kyc();
        res.send(resp);
    },
    async confirmRegistration(req, res)
    {
        let mdb_otp = new MDB_OTP();
        let otp_res = await mdb_otp.findByOtp(req.body.otp);

        const salt = bcrypt.genSaltSync(saltRounds);

        req.body.password = bcrypt.hashSync(req.body.password, salt);

        let user_information =
        {
            full_name: req.body.full_name,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            confirm_password: req.body.confirm_password,
            country: req.body.country,
            terms: req.body.value
        }

        let account_class = new AccountClass(user_information);
        
        // if invalid otp, notify user
        if(otp_res == null)
        {
            res.status = 'error';
            res.message= 'invalid OTP';
            return res;
        }

        if(otp_res != {})
        {
            //  CREATE ACCOUNT
            await account_class.create();

            // delete otp after registration
            await mdb_otp.removeUserOtp(otp_res.username, req.body.otp);

            // -------------- BTC WALLET TESTNET --------------


            res.json({ status: 'success' }).status(200);
        }

    },

    async resendRegistrationOtp(req, res)
    {
        let account_class           = new AccountClass();
        let resend_registration_otp = await account_class.resendUserOtp(req.body.email, req.body.username, 'registration');
        // console.log(resend_registration_otp.status)
        if(resend_registration_otp.status == 'success')
        {
            res.json(resend_registration_otp).status(200);
        }
        else
        {
            res.status(400).send({status: 'error', message: resend_registration_otp.message});
        }
    },
   
}   