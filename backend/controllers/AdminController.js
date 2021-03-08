const AdminClass   = require('../classes/AdminClass');
module.exports =
{
    async login(req, res)
    {
        let email           = req.body.email;
        let password        = req.body.password;

        let authenticate    = await new AdminClass({email:email, password:password}).authenticate();
        
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


        let admin_information =
        {
            full_name: req.body.full_name,
            email: req.body.email,
            password: req.body.password,
            confirm_password: req.body.confirm_password,
        }

        let admin_class = new AdminClass(admin_information);

        let account_validation = await admin_class.validate();

        if(account_validation.status == "success")
        {
            await admin_class.create();
        }
        else if(account_validation.status == "error")
        {
            res.status(400).send({ message: account_validation.message });
        }
        res.send(true);
    },
   
}