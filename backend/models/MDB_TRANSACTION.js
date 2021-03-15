const MONGOOSE = require('../config/mongo');
const MODEL    = require('./MODEL');
const Schema   = MONGOOSE.Schema;

const schema = new Schema({
    user_id:
    {
        type: String
    },
    full_name:
    {
        type: String,
    },
    email:
    {
        type: String
    },
    public_key:     // wallet_address / account #
    {
        type: String
    },
    currency_name:
    {
        type: String
    },
    currency_abbreviation:
    {
        type: String
    },
    decimal_places:
    {
        type: Number
    },
    transaction_type: // convert / send /  receive / issue
    {
        type: String
    },
    transaction_method:
    {
        type: String, //plus or minus
    },
    amount:
    {
        type: Number,
        default: 0
    },
    balance_before:
    {
        type: Number,
    },
    balance_after:
    {
        type: Number,
    },
    description:
    {
        type: String,
    },
    triggered_by:
    {
        type: String // user_id
    },
    remarks:
    {
        type: String
    },
    reference_number:
    {
        type: String
    },
    blockchain_fee:
    {
        type: Number
    },
    fee:
    {
        type: Number,
        default: 0
    },
    tx_hash:
    {
        type: String
    },
    status:
    {
        type: String
    },
    // conversion_rate:
    // {
    //     type: String
    // },
    // deposit_slip_path: 
    // {
    //     type: String
    // },
    date_created:
    {
        type: Date
    },
    timestamp_created_at:
    {
        type: Number
    }
},  {   
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
});

class MDB_TRANSACTION extends MODEL {
    constructor() {
        super('transactions', schema);
    }

    async findByTransactionHistory(user_id, abbreviation, skip) {
        const res = await this.collection.find({ user_id: user_id, currency_abbreviation: abbreviation, status: { $ne: 'receiving' } }).sort({ date_created: 'desc' }).limit(5).skip(skip);
        return res ? res : null;
    }

    async findByReferenceNumber(reference_number)
    {
        const res = await this.collection.findOne({ reference_number: reference_number });
        return res ? res : null;
    }

    async findByTransactionHistoryAdmin(user_id, abbreviation, skip) {
        const res = await this.collection.find({ user_id: user_id, currency_abbreviation: abbreviation }).sort({ date_created: 'desc' }).limit(5).skip(skip);
        return res ? res : null;
    }

    async findByTxHash(tx_hash) {
        const res = await this.collection.findOne({ tx_hash: tx_hash });
        return res ? res : null;
    }

    async findByTxHashReceiving(tx_hash) {
        const res = await this.collection.findOne({ tx_hash: tx_hash, status: 'receiving' });
        return res ? res : null;
    }

    async findByUserIdReceiving(user_id) {
        const res = await this.collection.find({ user_id: user_id, status: 'receiving' });
        return res ? res : null;
    }
}

module.exports = MDB_TRANSACTION;
