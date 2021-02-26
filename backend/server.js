const express           = require('express');
const app               = express();
const cors              = require('cors')
const AccountController = require('./controllers/AccountController');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/api/front/login', AccountController.login);
app.post('/api/front/registration', AccountController.registration);

app.listen({port: 4000}, (err) => {
    if(err) {
        console.log(err);
        process.exit(1);
    }else {
        console.log('Camelot server is running on port 4000...');
    }
});