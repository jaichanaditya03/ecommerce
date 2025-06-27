const express = require('express');
const router = express.Router();

const { addcart, cart, getCart,updateCart } = require('../controllers/cart.controller');

router.get('/userCart', cart);

router.post('/addcart', addcart);
router.get('/userCart', getCart);
router.put('/updateCart', updateCart);

module.exports = router;
