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

    async createConfirmedTransactionBTC(txn)
    {
        const mdb_transaction = new MDB_TRANSACTION();
        const mdb_wallet      = new MDB_WALLET();
        const mdb_admin_user  = new MDB_ADMIN_USER();
        const date_created    = Date.now();
        const mother_wallet   = process.env.BTC_MOTHER_WALLET;

        const receiving_transactions = await mdb_transaction.findByUserIdReceiving(txn.user_id);
        const wallet = await mdb_wallet.findByPublicKey(txn.public_key);

        if(receiving_transactions.length == 1) // Single receiving function
        {
            if(wallet.receiving_amount === txn.amount)
            {
                const balance = wallet.balance + txn.amount;
                mdb_wallet.updateByPUBLIC_KEY(txn.public_key, { 
                    balance:            balance,
                    is_receiving:       false,
                    receiving_amount:   0
                });
            }
            else if(wallet.receiving_amount !== txn.amount)
            {
                const balance = wallet.balance + txn.amount;
                const receiving_amount = wallet.receiving_amount - txn.amount;

                mdb_wallet.updateByPUBLIC_KEY(txn.public_key, { 
                    balance:            balance,
                    receiving_amount:   receiving_amount < 0 ? 0 : receiving_amount
                });
            }

            mdb_transaction.update(txn._id, {
                status:                 'confirmed',
                date_created:           date_created,
                timestamp_created_at:   date_created
            });

            // this.notifyClientRealtime(txn.user_id);

            // this.createMotherWalletSingleTransaction(txn.amount, txn.reference_number, txn.tx_hash, txn.user_id);
        }
        else if(receiving_transactions.length >= 2) // Multi receiving function
        {
            const amount_arr = receiving_transactions.map(x => x.amount);
            const total_receiving_amount = amount_arr.reduce((a, b) => a + b);
            const balance = wallet.balance + total_receiving_amount;
            
            mdb_wallet.updateByPUBLIC_KEY(txn.public_key, { 
                balance:            balance,
                is_receiving:       false,
                receiving_amount:   0
            });

            receiving_transactions.reverse(); // reverse array

            let balance_after = 0;
            let x = 0;
            let amount_accumulator = 0;
            for(let i=0; i < receiving_transactions.length; i++)
            {
                balance_after = wallet.balance += receiving_transactions[i].amount;
                mdb_transaction.update(receiving_transactions[i]._id, {
                    balance_after:          balance_after,
                    status:                 'confirmed',
                    date_created:           date_created,
                    timestamp_created_at:   date_created
                });

                // motherwallet create transactions
                amount_accumulator = x += receiving_transactions[i].amount;
                this.createMotherWalletMultiTransaction(
                    amount_accumulator, // to_update_amount
                    receiving_transactions[i].amount, // receiving_amount
                    receiving_transactions[i].reference_number,
                    receiving_transactions[i].tx_hash,
                    receiving_transactions[i].user_id
                );
            }

            // this.notifyClientRealtime(txn.user_id);

            // motherwallet update balance (total receiving)
            const motherwallet_info = await mdb_admin_user.findByPublicKey(mother_wallet);
            const motherwallet      = motherwallet_info.wallet.find(x => x.currency_abbreviation == 'BTC');
            const mother_updated_balance = motherwallet.balance + total_receiving_amount;
            mdb_admin_user.updateByPublicKey(mother_wallet, mother_updated_balance);

            // ----------- Realtime update motherwallet BTC balance and history ------------
            const data = {
                user_id:                motherwallet_info._id,
                currency_abbreviation:  'BTC',
                balance:                mother_updated_balance
            }
            // this.notifyAdminRealtime(data)
        }

        return;
    }
}

module.exports = MDB_WALLET;