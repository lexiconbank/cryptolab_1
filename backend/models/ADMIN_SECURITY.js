const MONGOOSE  = require('../config/mongo');
const MODEL    = require('./MODEL');
const Schema    = MONGOOSE.Schema;
// var crypto = require('crypto'); 
const schema    = new Schema({
    email : 
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

class adminsecurity extends MODEL
{
    constructor ()
    {
        super('trial', schema);
    }
    async findByUpdate(info)
    {
    const res = await this.collection.find({email: info.email}).updateOne( {password: info.password}                   );
    return res ? res : null;
    }
    async findByEmail(info)
    { 
        let res = await this.collection.findOne({email: info.email});
        return res? res : null;

    }
}
     
module.exports = adminsecurity;