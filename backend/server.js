const express                   = require('express');
const app                       = express();
const cors                      = require('cors')
const AccountController         = require('./controllers/AccountController');
const AdminAccountController    = require('./controllers/AdminController');
const WalletController          = require('./controllers/WalletController');
const passport                  = require('./config/passport');
const session                   = require('express-session');


app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'))   
//admin
app.post('/api/front/admin/login', AdminAccountController.login);

//Cleint
app.post('/api/front/login', AccountController.localLogin);
app.post('/api/front/registration', AccountController.registration);
app.post('/api/front/forgotpassword', AccountController.forgotPassword);
app.post('/api/front/forgotpassword/:key', AccountController.resetUserPassword);
app.get('/api/front/forgotpassword/:key', AccountController.validateLinkKey);
app.post('/api/front/confirmregistration', AccountController.confirmRegistration);
app.post('/api/front/resendregistrationotp', AccountController.resendRegistrationOtp);
app.post('/api/users/all', AccountController.getUsersData);

//  wallet
app.post('/api/wallet/send', WalletController.sendwallet);

//rei
app.post('/api/admin/user_masterlist', AccountController.userMasterList);
app.post('/api/front/fetch', AccountController.fetch)

// fetch user kyc status
app.post('/api/member/kyc/user/fetch', AccountController.fetchUserKyc);
app.post('/api/admin/fetch/clients', AccountController.fetchClientsByKyc);

//Andrea Destajo
//Passport js used in login
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
//End Of Passport



app.listen({port: 4000}, (err) => {
    if(err) {
        console.log(err);
        process.exit(1);
    }else {
        console.log('Cryptolab server is running on port 4000...');
    }
});