const MDB_USER          = require('../models/MDB_USER');
const MDB_WALLET        = require('../models/MDB_WALLET');
const MDB_TRANSACTION   = require('../models/MDB_TRANSACTION');
const axios             = require('axios');
const { response } = require('express');

let api_transactions = [];

module.exports = class WalletClass
{
    constructor(user_information)
    {   
        this.mdb_user  = new MDB_USER();
        this.user_info = user_information;
    }

    async sendBTC()
    {
        let res  = {};
        let address = this.user_info.address;
        let amount  = this.user_info.amount;

        const btc_network = process.env.BTC_NETWORK;
        const btc_api = btc_network == 'mainnet' ? 
            'http://178.128.92.211:3000/api/send' : 
            'http://178.128.92.211:3000/api/testnet/send/';
            await axios.post(btc_api, { address: address, amount: amount })
            .then(async (response) => {
                
                console.log('RESPONSE: ', response.data.result);
       
            }, (error) => {
                console.log(error)
            });

        // await this.checkReceivingBTC();
        
        res.status = "success";
        return res;
    }

    // RECEIVING TRANSACTION PROCESS
    async checkReceivingBTC()
    {
        await axios.get("http://178.128.92.211:3000/api/testnet/motherwallet_transactions")
        .then(response => {
            api_transactions = response.data.result;
        })

        if(api_transactions.length !== 0)
        {
            this.receivingBTC(api_transactions);
        }

        return;
    }

    async receivingBTC(transactions)
    {
        const unconfirmed_txn = transactions.filter(x => x.category === "receive" && x.confirmations === 0);
        console.log('UNCONFIRMED', unconfirmed_txn);

        const mdb_transaction = new 
        MDB_TRANSACTION();
        for(let i=0; i < unconfirmed_txn.length; i++)
        {
           const is_transaction_existing = await mdb_transaction.findByTxHash(unconfirmed_txn[i].txid);
           if(!is_transaction_existing)
           {
                console.log(unconfirmed_txn[i]);
                this.createReceivingTransactionBTC(unconfirmed_txn[i].address, unconfirmed_txn[i].amount, unconfirmed_txn[i].txid);
           }
        }

        return;
    }

    async createReceivingTransactionBTC(public_key, decimal_amount, tx_hash)
    {
        const mdb_user              = new MDB_USER();
        const mdb_wallet            = new MDB_WALLET();
        const mdb_transaction       = new MDB_TRANSACTION();

        const client         = await mdb_wallet.findByPublicKey(public_key);
        const client_info    = await mdb_user.doc(client.user_id);

        // Assign new balance
        const amount = await this.toDbAmount(decimal_amount, client.decimal_places); // integer amount
        const client_updated_balance = client.balance + amount;

        const currency_abbreviation = 'BTC';
        const date_created = Date.now();
        const reference_number = await this.makeOrderNumber(currency_abbreviation, client.user_id);
        const client_amount    = await this.toClientAmount(amount, client.decimal_places);

        // Transaction
        let add_transaction_client =
        {
            user_id:                client.user_id,
            full_name:              client_info.full_name,
            email:                  client_info.email,
            public_key:             public_key,
            currency_name:          "Bitcoin",
            currency_abbreviation:  currency_abbreviation,
            decimal_places:         client.decimal_places,    
            transaction_type:       "crypto deposit",
            transaction_method:     "plus",
            amount:                 amount,
            balance_before:         client.balance,
            balance_after:          client_updated_balance,
            description:            `Received ${client_amount} ${currency_abbreviation} from External Wallet`,
            reference_number:       reference_number,
            tx_hash:                tx_hash,
            triggered_by:           client.user_id,
            status:                 'receiving',
            date_created:           date_created,
            timestamp_created_at:   date_created,
        };

        const amount_receiving = client.receiving_amount + amount;
        mdb_wallet.update(client._id, {
            is_receiving:       true,
            receiving_amount:   amount_receiving
        });
        mdb_transaction.add(add_transaction_client);

        // ----------- Realtime update of client BTC receiving ------------
        // this.notifyClientRealtime(client.user_id)

        return;
    }

    async toDbAmount(amount, decimal_places)
    {
        // 10^9 = 100000000
        // amount = 100.500000000 * 10^9 = 100500000000
        return Math.floor(amount * 10 ** decimal_places);
    }

    async toClientAmount(amount, decimal_places)
    {
        // amount = 100500000000
        // amount = 100500000000 / 10^9 = 100.5
        return (amount / 10 ** decimal_places).toLocaleString("en-US", { maximumFractionDigits: decimal_places });
    }

    async sleep(ms)
    {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async makeOrderNumber(code, user_id)
    {
        const mdb_transaction   = new MDB_TRANSACTION();

        let result = '';
        let stringed_chars = ('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789' + user_id).toString();
        let caps_chars = stringed_chars.toUpperCase();
        
        for (let i = 0; i < 9; i++)
        {
            result += caps_chars.charAt(Math.floor(Math.random() * caps_chars.length));
        }

        let reference_number = `${code}-${result}`

        // CHECKS IF THE GENERATED REFERENCE NUMBER IS ALREADY EXISTS ON transactions collection
        let is_existing = await mdb_transaction.findByReferenceNumber(reference_number);
        if(is_existing)
        {
            await this.makeOrderNumber(code, user_id);
        }
        else
        {
            return reference_number;
        }
    }

     // CONFIRMED TRANSACTION PROCESS
     async checkConfirmedBTC()
     {
        await this.sleep(5000);

        // await axios.get("http://178.128.92.211:3000/api/testnet/motherwallet_transactions")
        // .then(response => {
        //     api_transactions = response.data.result;
        // })      
 
         if(api_transactions.length !== 0)
         { 
             this.confirmedBTC(api_transactions);
         }
 
         return;
     }

     async confirmedBTC(transactions)
     {
         const confirmed_txn = transactions.filter(x => x.category === "receive" && x.confirmations  >= 1 && x.confirmations  <= 3);
         console.log('CONFIRMED', confirmed_txn)
 
         const mdb_transaction = new MDB_TRANSACTION();
         for(let i=0; i < confirmed_txn.length; i++)
         {
            const receiving_transaction = await mdb_transaction.findByTxHashReceiving(confirmed_txn[i].txid);
 
            if(receiving_transaction)
            {
                await this.createConfirmedTransactionBTC(receiving_transaction);
            }
         }
 
         return;
     }

     async createConfirmedTransactionBTC(txn)
    {
        const mdb_transaction = new MDB_TRANSACTION();
        const mdb_wallet      = new MDB_WALLET();
        //const mdb_admin_user  = new MDB_ADMIN_USER();
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
                // amount_accumulator = x += receiving_transactions[i].amount;
                // this.createMotherWalletMultiTransaction(
                //     amount_accumulator, // to_update_amount
                //     receiving_transactions[i].amount, // receiving_amount
                //     receiving_transactions[i].reference_number,
                //     receiving_transactions[i].tx_hash,
                //     receiving_transactions[i].user_id
                // );
            }

            // this.notifyClientRealtime(txn.user_id);

            // motherwallet update balance (total receiving)
            // const motherwallet_info = await mdb_admin_user.findByPublicKey(mother_wallet);
            // const motherwallet      = motherwallet_info.wallet.find(x => x.currency_abbreviation == 'BTC');
            // const mother_updated_balance = motherwallet.balance + total_receiving_amount;
            // mdb_admin_user.updateByPublicKey(mother_wallet, mother_updated_balance);

            // ----------- Realtime update motherwallet BTC balance and history ------------
            // const data = {
            //     user_id:                motherwallet_info._id,
            //     currency_abbreviation:  'BTC',
            //     balance:                mother_updated_balance
            // }
            // this.notifyAdminRealtime(data)
        }

        return;
    }

}