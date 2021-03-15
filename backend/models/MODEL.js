const passport              = require("passport");
const findOrCreate          = require('mongoose-findorcreate');
const MONGOOSE              = require('../config/mongo');

module.exports = class MODEL 
{
    constructor(collection, schema) 
    {
        schema.plugin(findOrCreate);
        this.collection     = collection;
        this.schema         = schema;
        this.collection     = MONGOOSE.model(collection, schema, collection);
    }

    getSchema()
    {
        return this.schema;
    }

    async find(filters = {})
    {
        const collection    = this.collection;
        const res           = await collection.find(filters);
        return res;
    }

    async doc (id) 
    {

        const collection    = this.collection;
        const res           = await collection.findById(id);

        return res;
    }

    async docs () 
    {
        const collection     = this.collection;
        const res       = await collection.find({});
        return res;
    }

    async add(options = {}) 
    {
        const collection     = this.collection;
        // sets object to insert
        const modelObj  = new collection(options);

        // confirms the insertion
        const modelRes  = await modelObj.save();

        return modelRes;
            
    }

    async update(filters = {}, options = {}) 
    {
        const collection     = this.collection;
        
        const modelRes  = await collection.findByIdAndUpdate(filters, options, {new: true});

        return modelRes;
    }
}