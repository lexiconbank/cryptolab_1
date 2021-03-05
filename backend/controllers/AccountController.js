const AccountClass   = require('../classes/AccountClass');
const User           = require('../models/MDB_USER').User;
const MDB_OTP        = require('../models/MDB_OTP');
const bcrypt         = require('bcryptjs');
const saltRounds     = 10;

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

    async registration(req, res)
    {
        let user_information =
        {
            full_name: req.body.full_name,
            email: req.body.email,
            password: req.body.password,
            confirm_password: req.body.confirm_password
        }

        let account_class = new AccountClass(user_information);

        let account_validation = await account_class.validate();

        if(account_validation.status == "success")
        {
            await account_class.create();
        }
        else if(account_validation.status == "error")
        {
            res.status(400).send({ message: account_validation.message });
        }
        res.send(true);
    },

    async forgotPassword (req, res)
    {
        console.log('click here');
        const email = req.body.email;

        let account_class = new AccountClass();
        let forgot_pass = await account_class.forgotPassword(email);

        if (forgot_pass.status == 'success') {
            res.json(forgot_pass).status(200);
        }
        else if( forgot_pass.status =='not matched')
        {
            res.status(200).send({ status : 'not matched', message : forgot_pass.message });
        } 
        else 
        {
            res.status(400).send({ status : 'error', message : forgot_pass.message });
        }
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
            console.log('success!!');
            
            console.log(reset_password, password)

            // const salt = await bcrypt.genSalt(10);
            //reset_data.password = await bcrypt.genSaltSync(reset_data.password, salt);

            const salt = bcrypt.genSaltSync(saltRounds);
            // const hash = bcrypt.hashSync(reset_data.password, salt);
            password = bcrypt.hashSync(password, salt);
            // console.log(hash);

            // bcrypt.compareSync - compare has & pass from frontend
            // console.log(bcrypt.compareSync('password', hash)); 

            let reset = await account_class.resetpassword(email, password);

        } else {
            res.status(400).send({ status : 'error', message : reset_password.message });
        }
    }
   
}