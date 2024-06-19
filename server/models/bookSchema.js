const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    title: {
        type: String,
        require: true
    }, 
    image: {
        type: String,
        require: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "register"            
     },
     price: {
        type: String,
        require: true 
     },
     quantity: {
        type: Number,
        min: [1, "Please Enter Quantity less then 10"],
        require: true
     } 
}) 
 
const bookModel = mongoose.model('book', bookSchema);

module.exports = bookModel; 