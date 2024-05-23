const { HttpException } = require("./root")



class UnauthoredException extends HttpException {
    constructor(message, errorCode = null, errors = null) {
        super(message, errorCode, 401, errors);
    }
}
module.exports = UnauthoredException