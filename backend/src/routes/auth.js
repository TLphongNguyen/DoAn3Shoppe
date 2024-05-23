const express = require('express');
const { signup, login, customer } = require('../app/controller/auth');
const middleware = require("../middlewares/auth")



const authRouters = express.Router();

authRouters.post('/register', signup)
authRouters.post('/login', login)
authRouters.get('/customer', [middleware], customer)


module.exports = authRouters;
