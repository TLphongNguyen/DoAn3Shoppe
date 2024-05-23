const { HttpException, errorCode } = require("./src/app/exceptions/root")
const InternalException = require("./src/app/exceptions/internal")


const errorHandler = (() => {
    return async (req, res, next) => {
        try {
            await method(req, res, next)
        } catch (error) {
            let exceptions = HttpException;
            if (error instanceof HttpException) {
                exceptions = error;
            }
            else {
                exceptions = new InternalException("something went wrong", error, errorCode.INTERNAL_EXCEPTION)
            }
        }
    }
})
module.exports = errorHandler