// const mongoose = require('mongoose');
// const { product } = require('../controllers/product.controller');

// const cartSchema = new mongoose.Schema({
    
//     products:{
//         product:{
//             type:mongoose.Schema.ObjectId,
//         ref:'product'
//         },
//         quantity:{
//             type:Number,
//             default:1
//         }
//     },
//     total:{
//         type:Number,
//     }
// })

// const Cart = mongoose.model('Cart',cartSchema);
// module.exports = {Cart};



const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  products: [
    {
      product: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product' // Capital "P" and must match your model name
      },
      quantity: {
        type: Number,
        default: 1
      }
    }
  ],
  total: {
    type: Number
  }
});

const Cart = mongoose.model('Cart', cartSchema);
module.exports = { Cart };
