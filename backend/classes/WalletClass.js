const MDB_USER          = require('../models/MDB_USER');
const MDB_WALLET        = require('../models/MDB_WALLET');
const axios             = require('axios');

module.exports = class WalletClass
{
    constructor(user_information)
    {
        this.mdb_user = new MDB_USER();
        this.user_info = user_information;
    }

    async send()
    {
        const mdb_wallet        = new MDB_WALLET();
        const mdb_user          = new MDB_USER();

        let res  = {};
        let address = this.user_info.address;
        let amount  = this.user_info.amount;
        let _id     = this.user_info.user_id;

        const btc_network = process.env.BTC_NETWORK;
        const btc_api = btc_network == 'mainnet' ? 
            'http://178.128.92.211:3000/api/send' : 
            'http://178.128.92.211:3000/api/testnet/send/';
            await axios.post(btc_api, { address: address, amount: amount })
            .then(async (response) => {
                let wallet_details_btc 		=
                {
                    user_id:                _id,
                    currency_name:          "Bitcoin",
                    currency_abbreviation:  "BTC",
                    decimal_places:         8,
                    public_key:             response.data.result,
                    balance:                0
                }

                let btc_wallet = await mdb_wallet.add(wallet_details_btc); // DB save
                mdb_user.update( _id, {         // DB update
                    $addToSet: { wallet: btc_wallet._id }
                })
            }, (error) => {
                console.log(error)
            });
        
        res.status = "success";
        return res;
    }
}