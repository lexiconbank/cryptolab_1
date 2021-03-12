const MDB_ADMIN_USER = require('../models/MDB_ADMIN_USER')
const MDB_ROLE = require('../models/MDB_ROLE')
const MDB_OTP           = require('../models/MDB_OTP');
const nodemailer        = require("nodemailer");
const ejs               = require("ejs");
module.exports = class AdminClass{
    constructor(data)
    {
        this.mdb_admin_user = new MDB_ADMIN_USER();
        this.mdb_role = new MDB_ROLE();
        this.mdb_otp = new MDB_ROLE();
        this.data = data;
    }

    async update(){
        let response = {}
        let data = {}

        try
        {
            response.status = "success";

            if(this.data.form == "role"){
                data = {
                    id: this.data.id,
                    role_title: this.data.role_title,
                    access: this.data.access,
                    description: this.data.description,
                    dateCreated: this.data.dateCreated
                }
                await this.mdb_role.update(data)
            }else{
                data = {
                    id: this.data.id,
                    fullname: this.data.fullname,
                    designation: this.data.designation,
                    contact_number: this.data.contact_number,
                    email: this.data.email,
                    password: this.data.password,
                    dateCreated: this.data.dateCreated
                }

                await this.mdb_admin_user.update(data)
            }
        }
        catch (error)
        {
            response.status = "error";
            response.message = error.message;
        }

        return response;
    }

    async delete(){
        let response = {}

        try{
            let query_result = null

            if(this.data.form == "role"){
                query_result = await this.mdb_role.delete(this.data.id)
            }else{
                query_result = await this.mdb_admin_user.delete(this.data.id)
            }
            if(query_result){
                response.status = "success"
            }else{
                response.status = "error"
                response.message = "Invalid Credentials"
            }
        }catch(error){
            response.status = "error"
            response.message = error.message
        }
        return response
    } 

    async fetch(){
        let response = {};

        try{
            const query_result = await this.mdb_admin_user.fetch();
            response.status = 'success';
            response.data   = query_result;
        }catch(error){
            response.status  = 'error';
            response.message = error.message;
        }
        return response;
    }

    async roleFetch(){
        let response = {};

        try{
            const query_result = await this.mdb_role.fetch();
            response.status = 'success';
            response.data   = query_result;
        }catch(error){
            response.status  = 'error';
            response.message = error.message;
        }
        return response;
    }

    async insert(){
        let response = {}
        let data = {}

        try
        {
            if(this.data.form == "role"){
                data = {
                    role_title: this.data.role_title,
                    access: this.data.access,
                    description: this.data.description,
                    dateCreated: this.data.dateCreated
                }

                await this.mdb_role.add(data)

                response.status = "success";
            }else{
                data = {
                    fullname: this.data.fullname,
                    designation: this.data.designation,
                    contact_number: this.data.contact_number,
                    email: this.data.email,
                    password: this.data.password,
                    dateCreated: this.data.dateCreated
                }

                let inserted = await this.mdb_admin_user.add(data)

                if(inserted){
                    await this.sendUserPassword(data.email, data.password)
                    response.status = "success";
                }else{
                    response.status = "error"
                    response.message = error.message
                }
            }
        }
        catch (error)
        {
            response.status = "error";
            response.message = error.message;
        }

        return response;
    }

    async sendUserPassword(email, password)
    {
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true, // use SSL
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        })

        let email_template = 'email_template_for_admin_user.ejs'
        let html = await ejs.renderFile(`./views/${email_template}`, { password });
        let from = `"Cryptolab Team" ${process.env.EMAIL}`;
        let subject = 'Password';

        let mailOptions = {
            from    : from,
            to      : email,
            subject : subject,
            html    : html
        }

        let respond = await transporter.sendMail(mailOptions);

        return respond.accepted.includes(email) === false ? 'email not sent' : 'email sent';
    }
}