const MONGOOSE  = require('../config/mongo');
const MODEL     = require('./MODEL');
const Schema    = MONGOOSE.Schema;

const schema    = new Schema({
    role_title:
    {
        type:       String,
        required:   true
    },
    access: 
    {
        type:       String,
        required:   true
    },
    description: 
    {
        type:       String,
        required:   true
    },
    dateCreated:{
        type:       String,
        required:   true
    }
});

class MDB_ROLE extends MODEL
{
    constructor ()
    {
        super('role', schema);
    }

    async fetch(){
        const query_data = await this.collection.find();
        return query_data ? query_data : null;
    }

    async delete(data){
        const query_data = await this.collection.findOneAndDelete({_id: data})
        return query_data ? query_data : null;
    }

    async update(data){
        const query_data = await this.collection.findByIdAndUpdate({_id: data.id}, {_id: data.id, role_title: data.role_title, access: data.access, description: data.description })
        return query_data ? query_data : null;
    }
}

module.exports = MDB_ROLE;