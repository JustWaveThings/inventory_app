const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RollSchema = new Schema({
    material : {type: Schema.Types.ObjectId, ref: 'Material', required: true},
    diameter : {type: Schema.Types.ObjectId, ref: 'Diameter', required: true},
    brand: {type: Schema.Types.ObjectId, ref: 'Brand', required: true},
    priceInCents: {type: Number, required: true, min: 0},
    quantityOf: {type: Number, required: true, min: 0},
    description: {type: String, required: false},
    SKU: {type: String, required: true, min: 0},
    color: {type: String, required: true, min: 0},
    weightInGrams: {type: Number, required: true, min: 0}
});

// virtual for roll's name
RollSchema.virtual('name').get(function() {
    return `${this.material} - ${this.brand} - ${this.diameter}`;
});

// virtual url for roll
RollSchema.virtual('url').get(function() {
    return `/catalog/roll/${this._id}`;
});

// price in dollars
RollSchema.virtual('priceInDollars').get(function() {
    return this.priceInCents / 100;
});

// price per 100 grams in cents
RollSchema.virtual('pricePerOunceInDollars').get(function() {
    return this.priceInCents / (this.weightInGrams / 100);
});

// in stock status 
RollSchema.virtual('inStock').get(function() {
    return this.quantityOf > 0;
});

module.exports = mongoose.model('Roll', RollSchema);