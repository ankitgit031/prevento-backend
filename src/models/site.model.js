const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { toJSON, paginate } = require('./plugins');

const siteSchema = new Schema(
    {
        site_id: {
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
        default_flag: {
            type: Boolean,
            required: true
        },
        ip_address: {
            type: String,
            required: false
        },
        is_onboarding_completed: {
            type: Boolean,
            required: false
        },
        site_description: {
            type: String,
            required: false,
        },
        site_icon_url: {
            type: String,
            required: false,
        },
        site_name: {
            type: String,
            required: true,
            index: true
        },
        status_type: {
            type: Number,
            enum: [0, 1],
            required: true
        },
    },
    { timestamps: true }
);

siteSchema.pre('save', async function (next) {
    const site = this;
    if (site.isNew) {
        const lastSite = await Site.findOne({}, 'site_id').sort({ site_id: -1 });
        site.site_id = lastSite ? lastSite.site_id + 1 : 1;
    }
    next();
});

// add plugin that converts mongoose to json
siteSchema.plugin(toJSON);
siteSchema.plugin(paginate);

const Site = mongoose.model('site', siteSchema);

module.exports = Site;
