const mongoose = require('mongoose')

const Product = new mongoose.Schema({
    name: { type: String, required: true },
    model: { type: String, required: true, unique: true },
    description: { type: String },
    price: { type: Number, required: true },
    image: { type: String },
    category: { type: String },
}, {
    collection: 'products'
})

const model = mongoose.model('Products', Product)

module.exports = model

// table    =   collection
// record   =   document
// column   =   field