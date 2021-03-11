const express           = require('express');
const app               = express();
const cors              = require('cors')
const AccountController = require('./controllers/AccountController');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/api/front/login', AccountController.login);
app.post('/api/front/registration', AccountController.registration);
app.post('/api/front/forgotpassword', AccountController.forgotPassword);
app.post('/api/front/forgotpassword/:key', AccountController.resetUserPassword);
app.get('/api/front/forgotpassword/:key', AccountController.validateLinkKey);

//rei
app.post('/api/admin/user_masterlist', AccountController.userMasterList);
app.post('/api/front/fetch', AccountController.fetch)

                // fetch user kyc status

app.post('/api/member/kyc/user/fetch', AccountController.fetchUserKyc);
app.post('/api/admin/fetch/clients', AccountController.fetchClientsByKyc);





app.listen({port: 4000}, (err) => {
    if(err) {
        console.log(err);
        process.exit(1);
    }else {
        console.log('Cryptolab server is running on port 4000...');
    }
});