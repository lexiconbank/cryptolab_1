const WalletClass       = require('../classes/WalletClass');
const CronJob           = require('cron').CronJob;

module.exports = class ScheduleClass
{
}

// Check receiving every 15 mins

// ========================== BTC Scheduler ==========================

console.log('scheduleCheckReceivingBTC');

const scheduleCheckReceivingBTC = new CronJob('*/15 * * * * *', () =>
{
    const wallet_class = new WalletClass();
    wallet_class.checkReceivingBTC();
}, null, false)

//scheduleCheckReceivingBTC.start();

const scheduleCheckConfirmedBTC = new CronJob('*/15 * * * * *', () =>
{
    const wallet_class = new WalletClass();
    wallet_class.checkConfirmedBTC();
}, null, false)

//scheduleCheckConfirmedBTC.start();