const mongoose = require('mongoose')

const Admin = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isActive: { type: Boolean },
}, {
    collection: 'admins'
})

const model = mongoose.model('Admins', Admin)

module.exports = model
