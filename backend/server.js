const express           = require('express');
const app               = express();
const cors              = require('cors')
const AccountController = require('./controllers/AccountController');
const DashboardController = require('./controllers/DashboardController');

const AdminSecurityController = require('./controllers/AdminSecurityController');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/api/front/login', AccountController.login);
app.post('/api/front/dashboardmain', DashboardController.viewDashboard);
app.post('/api/front/adminsecurity', AdminSecurityController.adminSecurityupdate);
app.post('/api/front/findemail', AdminSecurityController.findemail);
app.post('/api/front/registration', AccountController.registration);
app.post('/api/front/forgotpassword', AccountController.forgotPassword);
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