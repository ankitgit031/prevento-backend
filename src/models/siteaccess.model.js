const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { toJSON, paginate } = require('./plugins');

const siteAccessSchema = new Schema(
    {
        siteaccess_id: {
            type: Number, default: 1,
            index: true
        },
        access_type: {
            type: Number,
            enum: [0, 1, 2, 3, 4],
            required: true
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
        site_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Site',
            required: true
        },
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
    },
    { timestamps: true }
);

siteAccessSchema.pre('save', async function (next) {
    const siteaccess = this;
    if (siteaccess.isNew) {
        const lastSiteAccess = await SiteAccess.findOne({}, 'siteaccess_id').sort({ siteaccess_id: -1 });
        siteaccess.siteaccess_id = lastSiteAccess ? lastSiteAccess.siteaccess_id + 1 : 1;
    }
    next();
});

// add plugin that converts mongoose to json
siteAccessSchema.plugin(toJSON);
siteAccessSchema.plugin(paginate);

const SiteAccess = mongoose.model('siteaccess', siteAccessSchema);

module.exports = SiteAccess;
