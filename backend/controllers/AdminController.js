const AdminClass = require('../classes/AdminClass')

module.exports =
{
    
    //admin login -michael
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
    // end -michael

    async insert(req, res){
        console.log("controller_insert:", req.body)

        let adminclass = new AdminClass(req.body)
        let response = await adminclass.insert()

        if(response){
            res.status = "success"
        }else{
            res.status = "error";
            res.message = error.message;
        }
        res.send()
    },

    async update(req, res){
        let adminclass = new AdminClass(req.body)
        let response = await adminclass.update()

        if(response){
            res.status = "success"
        }else{
            res.status = "error"
            res.message = error.message
        }
        res.send()
    },

    async deleteThis(req, res){
        let adminclass = new AdminClass(req.body)
        let response = await adminclass.delete()

        if(response.status == "success"){
            res.status(200).send({ message: response.message })
        }else if(response.status == "error"){
            res.status(400).send({ message: response.message })
        }   
    },

    async fetch(req, res){
        let adminclass = new AdminClass(req.body)
        let response = await adminclass.fetch()

        if(response.status == "success"){
            res.json(response.data).status(200)
        }else{
            res.json(response.message).status(400)
        }
    },

    async roleFetch(req, res){
        let adminclass = new AdminClass(req.body)
        let response = await adminclass.roleFetch()

        if(response.status == "success"){
            res.json(response.data).status(200)
        }else{
            res.json(response.message).status(400)
        }
    }
}