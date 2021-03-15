require('dotenv');
const passport          = require('passport');
const LocalStrategy     = require('passport-local').Strategy;
const JWTstrategy       = require('passport-jwt').Strategy;
const ExtractJwt        = require('passport-jwt').ExtractJwt;
const MDB_USER          = require('../models/MDB_USER');
const MDB_ADMIN_USER    = require('../models/MDB_ADMIN_USER');
const User              = require('../models/MDB_USER').User;
const AdminUser         = require('../models/MDB_ADMIN_USER').AdminUser;
const mdb_user          = new MDB_USER();
const mdb_admin_user    = new MDB_ADMIN_USER();

/**
 * Called when user is added into the session
 *
 * It stores only the unique id of the user into the session
 */
passport.serializeUser((user, done) => {
    done(null, user.id);
});

/**
 * Called when needed the data of user
 *
 * It takes the id into the session then finds the user in the database
 * and returns it
 *
 * Can store whole user data into the session to avoid calling database for user
 */
passport.deserializeUser((id, done) => {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

// client login
passport.use('client-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback : true
}, async (req, email, password, done) =>
{
    await User.findOne({ 'email' : email })
        .then(user => {
            console.log(user, 'user passport')
            if (!user) {
                return done(null, false, { message: `User with email address ${email} doesn't exist` });
            } else {
                let authenticate = User.authenticate();

                authenticate(user.email, user.password, function (err, userdata) {
                    console.log('user data authenticate pass', userdata)
                    if (err) {
                        console.log(err);
                    } else if (!userdata) {
                        return done(null, false, { message: 'Invalid password' });
                    } else {
                        req.session.user_info = userdata;
                        return done(null, req.session.user_info);
                    }
                });
            }
        }).catch(done);
}));


// admin login
passport.use('admin-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) =>
{

    await AdminUser.findOne({ email })
            .then(async user =>
            {   

                let check_pass = !user ? '' : await mdb_admin_user.validatePassword(password, user.password)
                
                if (!user) {
                    return done(null, false, { message: `Invalid Email.` });
                }
                
                req.session.admin_user = user;
                return done(null, req.session.admin_user);

            }).catch(done);
}));

const opts =
{
    jwtFromRequest  : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey     : process.env.PASSPORT_SECRET_KEY
}

passport.use(
    'jwt-client',
    new JWTstrategy(opts, (payload, done) =>
    {
        User.find({ email : payload.email }, (err, user) =>
        {
            if (err) {
                return done(err, false);
            }

            if (user) {
                return done(null, {
                    email   : user.email,
                    _id     : user._id
                });
            }

            return done(null, false);
        });
    })
);

passport.use(
    'jwt-admin',
    new JWTstrategy(opts, (payload, done) =>
    {
        AdminUser.find({ email : payload.email }, (err, user) =>
        {
            if (err) {
                return done(err, false);
            }

            if (user) {
                return done(null, {
                    email   : user.email,
                    _id     : user._id
                });
            }

            return done(null, false);
        })
    })
);



module.exports = passport;
