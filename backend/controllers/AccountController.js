const AccountClass = require('../classes/AccountClass');

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

   
}