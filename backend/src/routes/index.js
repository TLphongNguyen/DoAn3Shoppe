const express = require('express');
const authRouters = require('./auth');
const service = require('./serviceRouter');

const rootRouter = express.Router();

rootRouter.use('/auth', authRouters)
rootRouter.use('/service', service)

module.exports = rootRouter;
