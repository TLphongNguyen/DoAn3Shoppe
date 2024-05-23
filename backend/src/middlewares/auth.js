
const UnauthorizedException = require("../app/exceptions/Unauthored")
const { errorCode } = require("../app/exceptions/root")
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const middleware = async (req, res, next) => {
    const token = req.headers.authorization
    if (!token) {
        next(new UnauthorizedException("Unauthorized1", errorCode.UNAUTHORED))
    }
    try {
        const payload = jwt.verify(token, "abcxyz")
        const account = await prisma.customer.findFirst({ where: { accountId: payload.customerId } })
        req.customer = account
        console.log(token);
        next()
    } catch (err) {
        next(new UnauthorizedException("Unauthorized", errorCode.UNAUTHORED))
    }
}
module.exports = middleware