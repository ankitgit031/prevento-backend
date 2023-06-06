const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { toJSON, paginate } = require('./plugins');

const customerLicenseSchema = new Schema(
    {
        customerlicense_id: {
            type: Number, default: 1,
            index: true
        },
        begin_date: {
            type: Date,
            required: true
        },
        begin_timestamp: {
            type: Number,
            required: true
        },
        category: {
            type: String,
        },
        comments: {
            type: String,
        },
        created_by: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        current_people_count: {
            type: Number,
            index: true
        },
        customer_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Customer',
            required: true
        },
        date_created: {
            type: Date,
            required: false
        },
        date_modified: {
            type: Date,
            required: true
        },
        expiry_date: {
            type: Date,
            required: true
        },
        expiry_timestamp: {
            type: Number,
            required: true
        },
        license: {
            type: String,
            required: true
        },
        modified_by: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        status: {
            type: Number,
            enum: [0, 1],
            required: true
        },
        total_people_count: {
            type: Number,
            index: true
        },
        site_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Site',
            required: true
        },
    },
    { timestamps: true }
);

customerLicenseSchema.pre('save', async function (next) {
    const customerlicense = this;
    if (customerlicense.isNew) {
        const lastCustomerLicense = await CustomerLicense.findOne({}, 'customerlicense_id').sort({ customerlicense_id: -1 });
        customerlicense.customerlicense_id = lastCustomerLicense ? lastCustomerLicense.customerlicense_id + 1 : 1;
    }
    next();
});

// add plugin that converts mongoose to json
customerLicenseSchema.plugin(toJSON);
customerLicenseSchema.plugin(paginate);

const CustomerLicense = mongoose.model('customerlicense', customerLicenseSchema);

module.exports = CustomerLicense;
