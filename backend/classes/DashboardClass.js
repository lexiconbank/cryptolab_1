const DASHBOARD = require('../models/Dashboard');

module.exports = class DashboardClass
{
    constructor(user_information)
    {
        this.dashboard = new DASHBOARD();
        this.user_information = user_information;
    }

 
    async authenticate()
    {
        let res = {};
        try
        {
            let user_data = 
            {
                full_name: this.user_information.full_name,
                email: this.user_information.email
            }

            let user = await this.mdb_user.findByLastNameandFirstName(user_data);

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


    async view_dashboard(){
        let res = {};
            try
            {
                res.status = "success";
                let response = await this.dashboard.findByRead();
                res.data = response;
            }
            catch (error)
            {
                res.status = "error";
                res.message = error.message;
            }

            return res;
           
           
     }
    
           
     
  
}


