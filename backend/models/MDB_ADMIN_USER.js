const MONGOOSE  = require('../config/mongo');
const MODEL     = require('./MODEL');
const Schema    = MONGOOSE.Schema;

const schema    = new Schema({
    fullname : 
    {
        type:       String,
        required:   true
    },
    designation: 
    {
        type:       String,
        required:   true
    },
    contact_number: 
    {
        type:       String,
        required:   true
    },
    email: 
    {
        type:       String,
        required:   true
    },
    password: 
    {
        type:       String,
        required:   true
    },
    dateCreated:{
        type:       String,
        required:   true
    }
});

class MDB_ADMIN_USER extends MODEL
{
    constructor ()
    {
        super('AdminUser', schema);
    }

    async fetch(){
        const query_data = await this.collection.find();
        return query_data ? query_data : null;
    }

    async delete(id){
        const query_data = await this.collection.findOneAndDelete({_id: id})
        return query_data ? query_data : null;
    }

    async update(data){
        const query_data = await this.collection.findByIdAndUpdate({_id: data.id}, {_id: data.id, fullname: data.fullname, designation: data.designation, contact_number: data.contact_number, email: data.email, password: data.password})
        return query_data ? query_data : null;
    }
    
}

module.exports = MDB_ADMIN_USER;