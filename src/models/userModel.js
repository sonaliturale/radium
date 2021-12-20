const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    "title": {
        type: String,
        required: true,
        enum: ['Mr', 'Mrs', 'Miss']
    },
    "name": {
        type: String,
        required: true
    },
    "phone": {
        type: String,
        required: true,
        unique: true
    },
    "email": {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: "Please enter a valid email"
        }
    },
    "password": {
        type: String,
        required: true
    },
    "address": {
        street: { type: String },
        city: { type: String },
        pincode: { type: String }
    }
}, { timestamps: true });
module.exports = mongoose.model('user1', userSchema)

