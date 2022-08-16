const mongoose = require('mongoose')

const Order = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    mobileNo: { type: String, required: true },
    address: { type: String, required: true },
    deliveryDate: { type: Date, required: true },
    products: { type: Array },
    totalQuantity: { type: Number },
    totalPrice: { type: Number },
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true },
}, {
    collection: 'orders'
})

const model = mongoose.model('Orders', Order)

module.exports = model
