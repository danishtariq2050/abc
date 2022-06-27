const mongoose = require('mongoose')

const User = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    country: { type: String },
}, {
    collection: 'users'
})

const model = mongoose.model('Users', User)

module.exports = model

// table    =   collection
// record   =   document
// column   =   field