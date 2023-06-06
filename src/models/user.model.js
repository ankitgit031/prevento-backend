const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { toJSON, paginate } = require('./plugins');

const bcrypt = require('bcryptjs');
const validator = require('validator');


const userSchema = new Schema(
    {
        user_id: {
            type: Number, default: 1
        },
        date_created: {
            type: Date,
            required: false
        },
        date_modified: {
            type: Date,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error('Invalid email');
                }
            },
        },
        finger_print: {
            type: String,
            required: false,
        },
        first_name: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        middle_name: {
            type: String,
            required: false,
            trim: true
        },
        last_name: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        last_otp: {
            type: Number,
            required: false,
        },
        date_of_birth: {
            type: String,
            required: true
        },
        gender: {
            type: String,
            enum: ['Male', 'Female'],
            required: true
        },
        phone: {
            type: Number,
            required: true
        },
        alternate_phone: {
            type: Number,
            required: false
        },
        last_signed_in: {
            type: String,
            required: false
        },
        login_type: {
            type: String,
            enum: ['INFINITY', 'ORIGIN'],
            required: true
        },
        otp_expiry: {
            type: Date,
            required: false,
        },
        user_state: {
            type: Number,
            enum: [0, 1, 2, 3, 4],
            required: true
        },
        password: {
            type: String,
            required: true,
            trim: true,
            minlength: 8,
            validate(value) {
                if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
                    throw new Error('Password must contain at least one letter and one number');
                }
            },
            private: true, // used by the toJSON plugin
        },
        // password_hash: {
        //     type: String,
        //     required: true,
        //     trim: true
        // },
        // avatar: {
        //     type: String
        // },
        // role: { type: String, required: true },
        // userHouses: [
        //     {
        //         userHourseId: {
        //             type: mongoose.Schema.Types.ObjectId,
        //             ref: 'House',
        //             required: false
        //         }
        //     }
        // ],
        // userRenters: [
        //     {
        //         userRenterId: {
        //             type: mongoose.Schema.Types.ObjectId,
        //             ref: 'Renter',
        //             required: false
        //         }
        //     }
        // ],

        // userHouses: {
        //     type: mongoose.Types.ObjectId,
        //     ref: 'organizations',
        //     required: true
        // },
        // verificationToken: String,
        // verified: Date,
        // resetToken: {
        //     token: String,
        //     expires: Date
        // },
        // passwordReset: Date,
        // resetPasswordLink: {
        //     data: String,
        //     default: ''
        // },
        // acceptTerms: Boolean
    },
    { timestamps: true }
);

// add plugin that converts mongoose to json
userSchema.plugin(toJSON);
userSchema.plugin(paginate);


// userSchema.set('toJSON', {
//     virtuals: true,
//     versionKey: true,
//     transform: function (doc, ret) {
//         // remove these props when object is serialized
//         delete ret._id;
//         //delete ret.password;
//         delete ret.password;
//     }
// });

/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
    const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
    return !!user;
};


/**
 * Check if password matches the user's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
userSchema.methods.isPasswordMatch = async function (password) {
    const user = this;
    return bcrypt.compare(password, user.password);
};


userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isNew) {
        const lastUser = await User.findOne({}, 'user_id').sort({ user_id: -1 });
        user.user_id = lastUser ? lastUser.user_id + 1 : 1;
    }
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

const User = mongoose.model('user', userSchema);
User.collection.createIndex({ user_id: 1 }, { unique: true });
module.exports = User;
