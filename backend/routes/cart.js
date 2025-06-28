const express = require('express');
const router = express.Router();

const { addcart, cart, getCart,updateCart, payment } = require('../controllers/cart.controller');

router.get('/userCart', cart);

router.post('/addcart', addcart);
router.get('/userCart', getCart);
router.put('/updateCart', updateCart);
//router.post('/payment',);
router.post('/payment', payment);

module.exports = router;
