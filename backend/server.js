const express           = require('express');
const app               = express();
const cors              = require('cors')
const multer            = require('./middlewares/multer');
const AccountController = require('./controllers/AccountController');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/api/front/login', AccountController.login);
app.post('/api/front/registration', AccountController.registration);
app.post('/api/front/forgotpassword', AccountController.forgotPassword);
app.post('/api/front/kyc', multer.kyc_upload, AccountController.kyc);
app.post('/api/front/file', multer.kyc_upload);

app.listen({port: 4000}, (err) => {
    if(err) {
        console.log(err);
        process.exit(1);
    }else {
        console.log('Cryptolab server is running on port 4000...');
    }
});