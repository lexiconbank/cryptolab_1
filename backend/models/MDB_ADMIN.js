const MONGOOSE  = require('../config/mongo');
const MODEL     = require('./MODEL');
const Schema    = MONGOOSE.Schema;

const schema    = new Schema({
    full_name : 
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
 
});


class MDB_ADMIN extends MODEL
{
    constructor ()
    {
        super('admin_users', schema);
    }
    
    async findByUsernameAndPassword(info)
    {
        const res = await this.collection.findOne({ email: info.email, password: info.password });
        return res ? res : null;
    }


    async findByEmail(email)
    {
        let res = await this.collection.findOne({email});
        return res;
    }


}

module.exports = MDB_ADMIN;
