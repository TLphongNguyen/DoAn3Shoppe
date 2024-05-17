const express = require('express');
const authRouters = require('./auth');

const rootRouter = express.Router();

rootRouter.use('/auth', authRouters)

module.exports = rootRouter;
