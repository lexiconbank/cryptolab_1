const MONGOOSE  = require('../config/mongo');
const MODEL     = require('./MODEL');
const Schema    = MONGOOSE.Schema;
const findOrCreate          = require('mongoose-findorcreate');

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

schema.plugin(findOrCreate);

let User = new MONGOOSE.model("users", schema);

class MDB_USER extends MODEL
{
    constructor ()
    {
        super('users', schema);
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

    async resetpass(email, new_password)
    {
        console.log('here', email);
        const res = await this.collection.findOneAndUpdate({email}, { password: new_password }, {new: true});    
        return res ? res : null;
    }
}

module.exports = MDB_USER;
module.exports.User = User;