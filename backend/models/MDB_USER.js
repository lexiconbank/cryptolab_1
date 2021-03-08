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

    first_name:
    {
        type:       String,
    },
    middle_name:
    {
        type:       String,
    },
    last_name:
    {
        type:       String,
    },
    birth_date: 
    {
        type:       Date,
    },
    country: 
    {
        type:       String,
    },
    nationality: 
    {
        type:       String,
    },
    mobile_number: 
    {
        type:       String,
    },
    address_line: 
    {
        type:       String,
    },
    street: 
    {
        type:       String,
    },
    city:
    {
        type:       String,
    },
    zip_code: 
    {
        type:       String,
    },
    id_type: 
    {
        type:       String,
    },
    id_number:
    {
        type:       String,
    },
    id_expiry:
    {
        type:       Date,
    },
    security_question: 
    {
        type:       String,
    },
    security_answer:
    {
        type:       String,
    },
    code:
    {
        type:       String,
    },
    frontId:
    {
        type:       String,
    },
    selfieId: 
    {
        type:       String,
    },
    kyc_status:
    {
        type:       String,
    },
    kyc_submitted:
    {
        type:       Date
    },
    country: 
    {
        type:       String,
        required:   true
    }
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

    async postKyc(kycInfo)
    {
        const res = await this.collection.findByIdAndUpdate(
            {_id: kycInfo.id}, 
            { 
                first_name: kycInfo.first_name,
                middle_name: kycInfo.middle_name,
                last_name: kycInfo.last_name,
                birth_date: kycInfo.birth_date,
                country: kycInfo.country,
                nationality: kycInfo.nationality,
                mobile_number: kycInfo.mobile_number,
                address_line: kycInfo.address_line,
                street: kycInfo.street,
                city: kycInfo.city,
                zip_code: kycInfo.zip_code,
                id_type: kycInfo.id_type,
                id_number: kycInfo.id_number,
                id_expiry: kycInfo.id_expiry,
                security_question: kycInfo.security_question,
                security_answer: kycInfo.security_answer,
                code: kycInfo.code,
                frontId: kycInfo.frontId,
                selfieId: kycInfo.selfieId,
                kyc_status: 'pending',
                kyc_submitted: Date.now()
            });
            
        return res ? res : null;
    }


    async resetpass(email, new_password)
    {
        const res = await this.collection.findOneAndUpdate({email}, { password: new_password }, {new: true});   
        console.log(res); 
        return res ? res : null;
    }
}

module.exports = MDB_USER;
module.exports.User = User;