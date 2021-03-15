const dotenv    = require('dotenv').config();
const MONGOOSE    = require('mongoose');

if(dotenv.error) {
    throw dotenv.error;
}

const connection_info = {
    DB_USER         :   process.env.DB_USER,
    DB_PASS         :   process.env.DB_PASS,
    DB_HOST         :   process.env.DB_HOST,
    DB_PORT         :   process.env.DB_PORT,
    DB_NAME         :   process.env.DB_NAME,
    DB_AUTH_SOURCE  :   process.env.DB_AUTH_SOURCE
};

let connection_url = `mongodb+srv://${connection_info.DB_USER}:${connection_info.DB_PASS}@${connection_info.DB_HOST}/${connection_info.DB_NAME}?retryWrites=true&w=majority`;
// mongodb+srv://bitcapp:Whatsnew2021@cluster0.plwrn.mongodb.net/cryptolab?retryWrites=true&w=majority

const connection = MONGOOSE.connect(connection_url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    },
    async function(error) {
        if (error) {
            console.log("ERROR", error);
            console.log('access denied');
        } else {
            console.log("access granted");
            console.log(connection_info);
        }
    }
);

MONGOOSE.set('useCreateIndex', true);
MONGOOSE.pluralize(null);

module.exports = MONGOOSE;
