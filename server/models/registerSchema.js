const mongoose = require('mongoose');

const registerSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    contact: {
        type: Number,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    role: {
        type: String,
        enum: ["Author", "User"],
        require: true
    },
    cardId: {
        type: String
    }
})

const Model = mongoose.model('register', registerSchema);

module.exports = Model; 