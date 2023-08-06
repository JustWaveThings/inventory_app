const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DiameterSchema = new Schema({
    size: {
        type: Number, 
        required: true,
        enum: [1.75, 3],
        default: 1.75
    },
});

// virtual for diameter url

DiameterSchema.virtual('url').get(function() {
    return `/catalog/diameter/${this._id}`;
});

module.exports = mongoose.model('Diameter', DiameterSchema);