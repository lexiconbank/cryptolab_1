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
        console.log("controller_update", req.body)

        let adminclass = new AdminClass(req.body)
        let response = await adminclass.update()

        if(response){
            res.status = "success"
        }else{
            res.status = "error"
            res.message = error.message
        }
        console.log(res.status);
        res.send()
    },

    async deleteThis(req, res){
        console.log("controller_delete:", req.body)
        // console.log(req.body._id)

        let adminclass = new AdminClass(req.body)
        let response = await adminclass.delete()

        if(response.status == "success"){
            res.status(200).send({ message: response.message })
        }else if(response.status == "error"){
            res.status(400).send({ message: response.message })
        }   
    },

    async fetch(req, res){
        console.log("controller_fetch:", req.body)

        let adminclass = new AdminClass(req.body)
        let response = await adminclass.fetch()

        // console.log(response.data)
        if(response.status == "success"){
            res.json(response.data).status(200)
        }else{
            res.json(response.message).status(400)
        }
        // console.log(res);
    },

    async roleFetch(req, res){
        console.log("controller_fetch_role:", req.body)

        let adminclass = new AdminClass(req.body)
        let response = await adminclass.roleFetch()

        // console.log(response.data)
        if(response.status == "success"){
            res.json(response.data).status(200)
        }else{
            res.json(response.message).status(400)
        }
    }
}