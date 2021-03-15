const express                   = require('express');
const app                       = express();
const cors                      = require('cors')
const multer                    = require('./middlewares/multer');
const AccountController         = require('./controllers/AccountController');
const AdminController           = require('./controllers/AdminController');
const AdminAccountController    = require('./controllers/AdminController');
const WalletController          = require('./controllers/WalletController');

// app.use(ScheduleClass);

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.post('/api/admin/users/insert', AdminController.insert);
app.post('/api/admin/users/update', AdminController.update);
app.post('/api/admin/users/deleteThis', AdminController.deleteThis);
app.post('/api/admin/users/fetch', AdminController.fetch);

app.post('/api/admin/users/roleFetch', AdminController.roleFetch);
//admin
app.post('/api/front/admin/login', AdminAccountController.login);

app.post('/api/front/login', AccountController.login);
app.post('/api/front/registration', AccountController.registration);
app.post('/api/front/forgotpassword', AccountController.forgotPassword);
app.post('/api/front/kyc', multer.kyc_upload, AccountController.kyc);
app.post('/api/front/kycdata', AccountController.kyc_data);
app.post('/api/front/kycapproved', AccountController.kyc_approved);
app.post('/api/front/kycrejected', AccountController.kyc_rejected);
app.post('/api/front/user', AccountController.userInfoControlller);


// app.post('/api/front/file', multer.kyc_upload);
app.post('/api/front/forgotpassword/:key', AccountController.resetUserPassword);
app.get('/api/front/forgotpassword/:key', AccountController.validateLinkKey);
app.post('/api/front/confirmregistration', AccountController.confirmRegistration);
app.post('/api/front/resendregistrationotp', AccountController.resendRegistrationOtp);
app.post('/api/users/all', AccountController.getUsersData);


//  wallet
app.post('/api/wallet/send', WalletController.sendwallet);
// app.post('/api/wallet/receiving', WalletController.sendwallet);


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
