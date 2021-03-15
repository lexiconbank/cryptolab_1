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
    country: 
    {
        type:       String,
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