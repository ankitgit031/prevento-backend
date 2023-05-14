const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { toJSON, paginate } = require('./plugins');

const homeSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        locality: {
            type: String,
            required: true,
            trim: true
        },
        city: {
            type: String,
            required: true,
            trim: true,
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
        countryCode: {
            type: String,
            required: true
        },
        sqft: {
            type: Number,
            required: true
        },
        type: {
            type: String,
            enum: ['1R', '1RK', '1BHK', '2BHK', '1Floor', '2Floors'],
            required: true
        },
        isCctv: {
            type: Boolean
        },
        isSecurityGuard: {
            type: Boolean
        },
        isFireExtinguisher: {
            type: Boolean
        },
        isBathroomToiletCombined: {
            type: Boolean,
            required: true
        },
        bathroomQty: {
            type: Number,
            required: true
        },
        isBalcony: {
            type: Boolean
        },
        balconyQty: {
            type: Number,
            required: true
        },
        isVacant: {
            type: Boolean,
            required: true
        },
        vacantDate: {
            type: Date,
            required: false
        },
        renterDetails: [
            {
                userRenterId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Users',
                    required: false
                },
                startDate: {
                    type: Date,
                    required: false
                },
                endDate: {
                    type: Date,
                    required: false
                },
            }
        ],
    },
    { timestamps: true }
);

// add plugin that converts mongoose to json
homeSchema.plugin(toJSON);
homeSchema.plugin(paginate);

const Home = mongoose.model('homes', homeSchema);

module.exports = Home;
