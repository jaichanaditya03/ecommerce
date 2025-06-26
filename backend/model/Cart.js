const mongoose = require('mongoose');
const { product } = require('../controllers/product.controller');

const cartSchema = new mongoose.Schema({
    
    products:{
        product:{
            type:mongoose.Schema.ObjectId,
        ref:'product'
        },
        quantity:{
            type:Number,
            default:1
        }
    },
    total:{
        type:Number,
    }
})

const start = mongoose.model('Cart',cartSchema);
module.exports = {Cart};