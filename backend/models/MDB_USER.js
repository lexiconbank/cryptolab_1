const MONGOOSE  = require('../config/mongo');
const MODEL     = require('./MODEL');
const Schema    = MONGOOSE.Schema;

const schema    = new Schema({
    first_name : 
    {
        type:       String,
        required:   true
    },
    middle_name : 
    {
        type:       String,
        required:   true
    },
    last_name : 
    {
        type:       String,
        required:   true
    },
    full_name : 
    {
        type:       String,
        required:   true
    },
    username :
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
    id_image:
    {
        type:       String,
    },
    selfie_image: 
    {
        type:       String,
    },
    kyc_status_:
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
    },
    remarks:
    {
        type: String,
        required:   true
    },

    kyc_status              :
    {
        type        : String,
        enum        : ['not submitted', 'approved', 'rejected', 'submitted'],
        lowercase   : true,
        default     : 'not submitted',
    },
    kyc_remarks             :
    {
        type        : String,
        default     : ''
    },
    created_timestamp   :
    {
        type        : Number,
    },
    updated_timestamp   :
    {
        type        : Number,
    },
    
    wallet              :
    [{ 
        type: Schema.Types.ObjectId,
        ref: 'wallets' 
    }],
},


{
    timestamps          :
    {
        createdAt   : 'created_at',
        updatedAt   : 'updated_at'
    }
    
});

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
                first_name          : kycInfo.first_name,
                middle_name         : kycInfo.middle_name,
                last_name           : kycInfo.last_name,
                birth_date          : kycInfo.birth_date,
                country             : kycInfo.country,
                nationality         : kycInfo.nationality,
                mobile_number       : kycInfo.mobile_number,
                address_line        : kycInfo.address_line,
                street              : kycInfo.street,
                city                : kycInfo.city,
                zip_code            : kycInfo.zip_code,
                id_type             : kycInfo.id_type,
                id_number           : kycInfo.id_number,
                id_expiry           : kycInfo.id_expiry,
                security_question   : kycInfo.security_question,
                security_answer     : kycInfo.security_answer,
                code                : kycInfo.code,
                id_image            : kycInfo.id_image,
                selfie_image        : kycInfo.selfie_image,
                kyc_status          : kycInfo.kyc_status,
                kyc_submitted       : kycInfo.kyc_submitted
            });
        return res ? res : null;
    }

    async resetpass(email, new_password)
    {
        const res = await this.collection.findOneAndUpdate({email}, { password: new_password }, {new: true});   
        console.log(res);
        return res ? res : null;
    }

    async findByUserId(id)
    {
        const res = await this.collection.findById(id).populate('wallet');
        return res ? res : null;
    }

    async getKycData(){
        try 
        {
            const collection     = this.collection;
            const res            = await collection.find({kyc_status: "pending"});
            return res;
        } 
        catch (error) 
        {
            return error;
        }
    }

    async userInfoModel(user){
        try 
        {
            const collection     = this.collection;
            const res            = await collection.find({_id: user.id});
            return res;
        } 
        catch (error) 
        {
            return error;
        }
    }

    async update_kycstatus(details)
    {
        const res = await this.collection.findByIdAndUpdate({_id: details.id}, {kyc_status: details.kyc_status});
        return res ? res : null;
    }

    async update_kyc_rejected(details)
    {
        const res = await this.collection.findByIdAndUpdate({_id: details.id}, {kyc_status: details.kyc_status, remarks: details.remarks});
        return res ? res : null;
    }

    async fetchClientsByKyc({kyc_status})
    {
        let res;
        if(kyc_status.length == 0)
        {
            res = await this.collection.find({kyc_status: {$in: ['not submitted', 'submitted', 'approved', 'rejected']}});
        }
        else
        {
            res = await this.collection.find({kyc_status: {$in: kyc_status}}, {}, {$order_by: {created_at: 'DESC'}});
        }

        console.log(res);
        return res;
    }

    async findAllClients() // User Masterlist
    {
        const res = await this.collection.find();
        return res ? res : null;
    }

    async fetch(){
        const query_data = await this.collection.find();
        return query_data ? query_data : null;
    }

    async fetchUserKyc(_id)
    {
        const res = await this.collection.findOne({_id}, {kyc_status: 1, kyc_remarks: 1});
        return res
    }
}

module.exports = MDB_USER;
module.exports.User = User;