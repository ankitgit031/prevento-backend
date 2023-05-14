const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { toJSON, paginate } = require('./plugins');

const bcrypt = require('bcryptjs');
const validator = require('validator');


const userSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        middleName: {
            type: String,
            required: true,
            trim: true
        },
        lastName: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        dateOfBirth: {
            type: Date,
            required: false
        },
        gender: {
            type: String,
            enum: ['Male', 'Female'],
            required: true
        },
        countryCode: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true,
            trim: true,
        },
        district: {
            type: String,
            required: true,
            trim: true,
        },
        city: {
            type: String,
            required: true,
            trim: true,
        },
        phone: {
            type: Number,
            required: true
        },
        alternatePhone: {
            type: Number,
            required: false
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
        // passwordHash: {
        //     type: String,
        //     required: true,
        //     trim: true
        // },
        // avatar: {
        //     type: String
        // },
        role: { type: String, required: true },
        userHouses: [
            {
                userHourseId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'House',
                    required: false
                }
            }
        ],
        userRenters: [
            {
                userRenterId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Renter',
                    required: false
                }
            }
        ],

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
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});


const User = mongoose.model('users', userSchema);

module.exports = User;
