const ADMIN_SECURITY = require('../models/ADMIN_SECURITY');

module.exports = class AdminsecurityClass
{
    constructor(user_information)
    {
        this.admin_Security = new ADMIN_SECURITY();
        this.user_information = user_information;
    }
   
    async security()
    {
        let res = {};
        try
        {
            res.status = "success";
            let add_form =
            { 
                email: this.user_information.email,
                password: this.user_information.password,
        
            }
            await this.admin_Security.findByUpdate(add_form);
        }

        catch (error)
        {
            res.status = "error";
            res.message = error.message;
        }
        return res;
    }
    async findemails()
    {
        let res = {};
        try
        {
            res.status = "success";

            let add_form =
            { 
                email: this.user_information.email,
        
            }
           let response = await this.admin_Security.findByEmail(add_form);
            res.data=response;
        }

        catch (error)
        {
            res.status = "error";
            res.message = error.message;
        }
        return res;
    }
}


