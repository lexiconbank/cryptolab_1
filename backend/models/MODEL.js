const MONGOOSE  = require('../config/mongo');

module.exports = class MODEL 
{
    constructor(collection, schema) 
    {
        this.collection = collection;
        this.schema     = schema
        this.collection      = MONGOOSE.con.model(collection, schema, collection);
    }

    async doc (id) 
    {

        try 
        {
            const collection     = this.collection;
            const res       = await collection.findById(id);

            return res;
        } 
        catch (error) 
        {
            console.log(error);
            return error;
        }
    }

    async docs () 
    {
        try 
        {
            const collection     = this.collection;
            const res       = await collection.find();

            return res;
        } 
        catch (error) 
        {
            console.log(error);
            return error;
        }
    }

    async add(options = {}) 
    {
        try 
        {
            const collection     = this.collection;
            // sets object to insert
            const modelObj  = new collection(options);

            // confirms the insertion
            const modelRes  = await modelObj.save();

            return modelRes;
            
        } 
        catch (error) 
        {
            console.log(error);
            return error;
        }
    }

    async update(_id, options = {}) 
    {
        try 
        {
            const collection     = this.collection;
            
            const modelRes  = await collection.findByIdAndUpdate({_id}, options, {new: true});

            return modelRes;
        } 
        catch (error) 
        {
            console.log(error);
            return error;
        }
    }
}