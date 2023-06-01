const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { toJSON, paginate } = require('./plugins');

const customerSchema = new Schema(
    {
        customer_id: {
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
        description: {
            type: String,
            required: false
        },
        name: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        status: {
            type: Number,
            enum: [0, 1],
            required: true
        },
        phone: {
            type: Number,
            required: false
        },
    },
    { timestamps: true }
);

customerSchema.pre('save', async function (next) {
    const customer = this;
    if (customer.isNew) {
        const lastCustomer = await Customer.findOne({}, 'customer_id').sort({ customer_id: -1 });
        customer.customer_id = lastCustomer ? lastCustomer.customer_id + 1 : 1;
    }
    next();
});

// add plugin that converts mongoose to json
customerSchema.plugin(toJSON);
customerSchema.plugin(paginate);

const Customer = mongoose.model('customer', customerSchema);

module.exports = Customer;
