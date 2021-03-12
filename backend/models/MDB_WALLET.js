const MONGOOSE  = require('../config/mongo');
const MODEL     = require('./MODEL');
const Schema    = MONGOOSE.Schema;

const schema = new Schema({
    user_id:
    {
        type: String,
        required: true
    },
    currency_name:
    {
        type: String
    },
    currency_abbreviation:
    {
        type: String,
        required: true
    },
    decimal_places:
    {
        type: Number
    },
    public_key:
    {
        type: String,
        required: true
    },
    private_key:
    {
        type: String
    },
    encrypted_wallet:
    {
        type: Object,
        default: {}
    },
    balance:
    {
        type: Number,
        default: 0
    },
    is_receiving:
    {
        type: Boolean,
        default: false
    },
    receiving_amount:
    {
        type: Number,
        default: 0
    },
});

new MONGOOSE.model("wallets", schema);
class MDB_WALLET extends MODEL {
    constructor() {
        super('wallets', schema);
    }

    async findByCurrencyAndUserId(abbreviation, user_id)
    {
        const res = await this.collection.findOne({ currency_abbreviation: abbreviation, user_id: user_id });
        return res ? res : null;
    }

    async findByPublicKey(public_key) 
    {
        const res = await this.collection.findOne({ public_key: public_key });
        return res ? res : null;
    }

    async updateByPublicKey(public_key, balance)
    {
        const res = await this.collection.findOneAndUpdate({ public_key: public_key }, {balance: balance}, {new: true});
        return res ? res : null;
    }

    async findByUserId(user_id)
    {
        const res = await this.collection.findOne({ user_id: user_id });
        return res ? res : null;
    }

    async updateByPUBLIC_KEY(public_key, options = {}) // this is like update() function in MODEL.js (using public_key)
    {   
        const res = await this.collection.findOneAndUpdate({ public_key: public_key }, options, {new: true});
        return res ? res : null;
    }

    async findByAbbreviation(abbreviation)
    {
        const res = await this.collection.find({ currency_abbreviation: abbreviation });
        return res ? res : null;
    }
}

module.exports = MDB_WALLET;