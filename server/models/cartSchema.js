const mongoose = require('mongoose');

  const CartSchema = new mongoose.Schema({

    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"register",
    },
    items:[
              {
               bookId: {
                type:mongoose.Schema.Types.ObjectId,
                required:true,
                ref:'book'     
               },
               price: {
                type:Number
               },
               quantity:{
                type:Number,
                required:true,
                default: 1        
               },     
            }
                
    ],
    totalPrice: {
      type: Number
  } 
});

const cartModel = mongoose.model('cart', CartSchema);

module.exports = cartModel;