const MONGOOSE  = require('../config/mongo');
const MODEL    = require('./MODEL');
const Schema    = MONGOOSE.Schema;

const schema    = new Schema({
    Last_Name : 
    {
        type:       String,
        required:   true
    },
    First_Name: 
    {
        type:       String,
        required:   true
    },
    Age: 
    {
        type:       String,
        required:   true
    },
});

class dashboard extends MODEL
{
    constructor ()
    {
        super('trials', schema);
    }
    
    async findByRead()
    {
        const res = await this.collection.findall();
        return res ? res : null;
    
    }
  
}

module.exports = dashboard;