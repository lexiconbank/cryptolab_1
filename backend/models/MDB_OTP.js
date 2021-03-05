const MONGOOSE  = require('../config/mongo');
const MODEL     = require('./MODEL');
const Schema    = MONGOOSE.Schema;

const schema    = new Schema({
    otp         : {
        type        : String
    },
    email       : {
        type        : String,
        lowercase   : true,
        unique      : true
    },
    username    : {
        type        : String,
        lowercase   : true,
        unique      : true
    },
    for         : {
        type        : String,
        enum        : ['registration', 'login', 'forgot_password'],
        required    : true,
    },
    expireAt    : {
        type        : Date,
        default     : Date.now,
        index       : { expires: '5m' },
    }
});

class MDB_OTP extends MODEL
{
    constructor()
    {
        super('otp', schema);
    }

    async createUserOtp(options = {})
    {

        let { otp_for } = options;

        let otp = {};

        if (otp_for == 'forgot_password') {
            otp   = await super.add({email: options.email, otp: options.otp, for: options.otp_for});
        } else {
            otp   = await super.add({email: options.email, username: options.username, otp: options.otp, for: options.otp_for});
        }

        return otp;
    }

    async removeOtpByUserOrEmail(usernameOrEmail)
    {
        return this.collection.findOneAndRemove({$or:[{
            username: usernameOrEmail,
        },{
            email   : usernameOrEmail,
        }
        ]})
    }

    async removeUserOtp(usernameOrEmail, otp)
    {
        return this.collection.findOneAndRemove({$or:[{
            username: usernameOrEmail,
            otp: otp
        },{
            email   : usernameOrEmail,
            otp: otp
        }
        ]})
    }

    async removeOtpByUserOrEmailAndFor(usernameOrEmail, type)
    {
        return this.collection.findOneAndRemove({$or:[{
            username    : usernameOrEmail,
            for         : type
        },{
            email       : usernameOrEmail,
            for         : type
        }
        ]})
    }

    async findUserOtp(usernameOrEmail, otp)
    {
        return this.collection.findOne({$or:[{
            username: usernameOrEmail,
            otp     : otp
        },{
            email   : usernameOrEmail,
            otp     : otp
        }
        ]})
    }

    async findByOtp (otp)
    {
        let res = await this.collection.findOne({ otp : otp });

        return res;
    }

}

module.exports = MDB_OTP;