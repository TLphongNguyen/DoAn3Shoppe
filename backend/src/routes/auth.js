const express = require('express');
const { signup, login, customer, UpdateCustomer, UpdateAddress } = require('../app/controller/auth');
const middleware = require("../middlewares/auth")



const authRouters = express.Router();

authRouters.post('/register', signup)
authRouters.post('/login', login)
authRouters.get('/customer', [middleware], customer)
authRouters.post('/updatecustomer', UpdateCustomer)
authRouters.post('/updateaddress', UpdateAddress)



module.exports = authRouters;
