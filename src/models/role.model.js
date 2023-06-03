const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { toJSON, paginate } = require('./plugins');

const roleSchema = new Schema(
    {
        role_id: {
            type: Number, default: 1,
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
        role_description: {
            type: String,
        },
        role_name: {
            type: String,
            required: true
        },
        role_type: {
            type: Number,
            enum: [0, 1, 2],
            required: true
        },
    },
    { timestamps: true }
);

roleSchema.pre('save', async function (next) {
    const role = this;
    if (role.isNew) {
        const lastRole = await Role.findOne({}, 'role_id').sort({ role_id: -1 });
        role.role_id = lastRole ? lastRole.role_id + 1 : 1;
    }
    next();
});

// add plugin that converts mongoose to json
roleSchema.plugin(toJSON);
roleSchema.plugin(paginate);

const Role = mongoose.model('role', roleSchema);

module.exports = Role;
