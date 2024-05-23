class HttpException extends Error {
    constructor(message, errorCode, statusCode, errors) {
        super(message);  // Gọi hàm khởi tạo của lớp cha (Error)
        this.message = message;
        this.errorCode = errorCode;
        this.statusCode = statusCode;
        this.errors = errors;
        Error.captureStackTrace(this, this.constructor);
    }
}
const errorCode = {
    User_Not_Found: 1001,
    User_Already_Exists: 1002,
    Incorect_Password: 1003,
    UNPROCESSABLE_ENTITY: 2001,
    INTERNAL_EXCEPTION: 3001,
    UNAUTHORED: 401

}
module.exports = { errorCode, HttpException }