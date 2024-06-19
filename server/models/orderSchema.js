const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: {
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'cart'
    },
    bookId: {
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'cart'
    },
    quantity: {
        type: String,
        require: true
    }, 
    price: {
        type: String,
        require: true
    },
    author: {
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'book'       
     }
}) 
 
const orderModel = mongoose.model('order', orderSchema);

module.exports = orderModel; 