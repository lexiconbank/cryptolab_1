const MDB_ADMIN          = require('../models/MDB_ADMIN');

module.exports = class AdminClass
{
    constructor(admin_information)
    {
        this.mdb_admin = new MDB_ADMIN();
        this.admin_information = admin_information;
    }

    async validate()
    { 
        let res = {};
        if(this.admin_information.full_name.trim() == '' || this.admin_information.password.trim() == '' || this.admin_information.email.trim() == '')
        {
            res.status      = "error";
            res.message     = "You need to fill up all fields in order to proceed.";
        }
        else if(this.admin_information.confirm_password !== this.admin_information.password)
        {
            res.status      = "error";
            res.message     = "The password you entered didn't match.";
        }
        else
        {
            res.status = "success";
        }

        return res;
    }

    async authenticate()
    {
        let res = {};
        try
        {
            let user_data = 
            {
                email: this.admin_information.email,
                password: this.admin_information.password
            }

            let user = await this.mdb_admin.findByUsernameAndPassword(user_data);

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

    async validate()
    { 
        let res = {};
        if(this.admin_information.full_name.trim() == '' || this.admin_information.password.trim() == '' || this.admin_information.email.trim() == '')
        {
            res.status      = "error";
            res.message     = "You need to fill up all fields in order to proceed.";
        }
        else if(this.admin_information.confirm_password !== this.admin_information.password)
        {
            res.status      = "error";
            res.message     = "The password you entered didn't match.";
        }
        else
        {
            res.status = "success";
        }

        return res;
    }

    async create()
    {
        let res = {};
        try
        {
            res.status = "success";

            let add_form =
            { 
                full_name: this.admin_information.full_name,
                email: this.admin_information.email,
                password: this.admin_information.password,
                country:this.admin_information.country
            }

            await this.mdb_admin.add(add_form);
        }   
        catch (error)
        {
            res.status = "error";
            res.message = error.message;
        }

        return res;
    }






  

    

   
}


