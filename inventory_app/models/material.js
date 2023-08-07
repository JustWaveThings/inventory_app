const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MaterialSchema = new Schema({
    name: {type: String, required: true, min: 3, max: 1000},
    description: {type: String, required: true, min: 3, max: 1000},

});

// virtual for url

MaterialSchema.virtual('url').get(function() {
    return `/catalog/material/${this._id}`;
});

module.exports = mongoose.model('Material', MaterialSchema);