const express           = require('express');
const app               = express();
const cors              = require('cors')
const multer            = require('./middlewares/multer');
const AccountController = require('./controllers/AccountController');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

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


app.listen({port: 4000}, (err) => {
    if(err) {
        console.log(err);
        process.exit(1);
    }else {
        console.log('Cryptolab server is running on port 4000...');
    }
});