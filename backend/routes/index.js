const express = require('express')
const router = express.Router();
const userRoute = require('./user');
const productRoute = require('./product');
const cart = require('./cart');

router.use('/user',userRoute);
router.use('/userProduct',productRoute);
router.use('/products',productRoute);
router.use('/addCart',cart);
//router.post('/addcart/:productId', addcart);



module.exports = router;