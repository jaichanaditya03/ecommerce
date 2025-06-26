const express = require('express');
const { sign } = require('jsonwebtoken');
const { signup,login } = require('../controllers/user.controller');
const router = express.Router();

//singup route
router.post('/register', signup);

//login route
router.post('/login',login);

module.exports = router;