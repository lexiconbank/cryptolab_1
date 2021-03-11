const AdminSecurityClass = require('../classes/AdminSecurityClass');
const bcrypt         = require('bcrypt');
// const saltRounds     = 10;
module.exports =
{   
    
    async adminSecurityupdate(req, res)
    {
        const salt = bcrypt.genSaltSync(10);
        req.body.password = bcrypt.hashSync(req.body.password, salt);

            let user_information =
            {
                email: req.body.email,
                password: req.body.password
                
            }
            
           
            // bcrypt.genSalt(10, (err, salt) => {
            //     bcrypt.hash(user_information.password, salt, (err, hash) => {
            //         if(err) throw err;

            //         // Set the hashed password and save the model
            //         user_information.password = hash;
            //         user_information.save()
            //         .then((user) => res.json(user))
            //         .catch(error => console.log(error));
            //     })
            // });

            //console.log(user_information.password, 'hash');
       
            let admin_security_class = new AdminSecurityClass(user_information);
            let resp = await admin_security_class.security(user_information);
            res.send(resp);
    },
    async findemail(req, res)
    {
      
            let find_email =
            {
                email: req.body.email,
                password: req.body.password,}
       
            let admin_security_class = new AdminSecurityClass(find_email);
            let resp = await admin_security_class.findemails(find_email);
              
            if (resp.status == 'success'){
      
               if (resp.data==null){
                res.status(200).json(resp.validation = 'no email found');
                res = 'null' ;
               }
               else{
                res.status(200).json(resp);
               }

            }else{
                res.status(400).send(resp);
            }
    
    },
  
   
}