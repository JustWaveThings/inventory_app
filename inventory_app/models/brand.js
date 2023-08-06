const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BrandSchema = new Schema({
    name: {type: String, required: true, min: 3, max: 100},
    description: {type: String, required: false},
    websiteUrl: {type: String, required: false},

});

// virtual for url

BrandSchema.virtual('url').get(function() {
    return '/catalog/brand/' + this._id;
});

module.exports = mongoose.model('Brand', BrandSchema);
    