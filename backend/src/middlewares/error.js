const { HttpException } = require("../app/exceptions/root");

const errorMiddleware = (error, req, res, next) => {
    // Kiểm tra xem đối tượng res có phải là đối tượng phản hồi của Express không
    if (typeof res.status !== 'function') {
        console.error('res.status is not a function:', res);
        return next(new Error('Internal Server Error'));
    }

    // Kiểm tra xem tiêu đề phản hồi đã được gửi chưa
    if (res.headersSent) {
        return next(error);
    }

    // Log lỗi ra console để debug
    console.log('Error:', error);
    console.log('Response object keys:', Object.keys(res));

    // Nếu lỗi là HttpException, trả về phản hồi với mã trạng thái và thông báo lỗi tương ứng
    if (error instanceof HttpException) {
        res.status(error.statusCode || 500).json({
            message: error.message || "Internal Server Error",
            errorCode: error.errorCode || "INTERNAL_SERVER_ERROR",
            errors: error.errors || []
        });
    } else {
        // Nếu lỗi không phải là HttpException, trả về lỗi máy chủ chung
        res.status(500).json({
            message: "Internal Server Error",
            errorCode: "INTERNAL_SERVER_ERROR",
            errors: []
        });
    }
};

module.exports = errorMiddleware;
