const express                   = require('express');
const app                       = express();
const cors                      = require('cors')
const AccountController         = require('./controllers/AccountController');
const AdminAccountController    = require('./controllers/AdminController');
const WalletController          = require('./controllers/WalletController');


app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//admin
app.post('/api/front/admin/login', AdminAccountController.login);

app.post('/api/front/login', AccountController.login);
app.post('/api/front/registration', AccountController.registration);
app.post('/api/front/forgotpassword', AccountController.forgotPassword);
app.post('/api/front/forgotpassword/:key', AccountController.resetUserPassword);
app.get('/api/front/forgotpassword/:key', AccountController.validateLinkKey);
app.post('/api/front/confirmregistration', AccountController.confirmRegistration);
app.post('/api/front/resendregistrationotp', AccountController.resendRegistrationOtp);
app.post('/api/users/all', AccountController.getUsersData);


//  wallet
app.post('/api/wallet/send', WalletController.sendwallet);



app.listen({port: 4000}, (err) => {
    if(err) {
        console.log(err);
        process.exit(1);
    }else {
        console.log('Cryptolab server is running on port 4000...');
    }
});