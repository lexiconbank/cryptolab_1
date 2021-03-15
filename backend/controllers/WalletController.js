const WalletClass   = require('../classes/WalletClass');
const MDB_WALLET    = require('../models/MDB_WALLET');
module.exports =
{
    async sendwallet(req, res)
    {
        let user_information = {
            address    : req.body.address,
            amount     : req.body.amount,
            user_id    : "604a0984c4f12d391c389108"
        }

        console.log('user_info', user_information);

        let wallet_class    = new WalletClass(user_information);
        let send            = await wallet_class.sendBTC();

        if (send.status == 'success') {
            res.json({ status: 'success' }).status(200);
        } else {
            res.status(400).send({ status : 'error', message : is_valid.message });
        }
    }

}
