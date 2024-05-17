const express = require('express');
const { signup, login } = require('../app/controller/auth');


const authRouters = express.Router();

authRouters.post('/register', signup)
authRouters.post('/login', login)


module.exports = authRouters;
