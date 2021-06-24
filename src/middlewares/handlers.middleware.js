"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandlerMiddleware = exports.notFoundHandlerMiddleware = exports.forbiddenHandlerMiddleware = void 0;
const { env } = process;
const server_util_1 = require("../utils/server.util");
const forbiddenHandlerMiddleware = (req, res, next) => {
    req.log.warn('Forbidden');
    next(new server_util_1.ErrorHandler(403, "Forbidden"));
};
exports.forbiddenHandlerMiddleware = forbiddenHandlerMiddleware;
const notFoundHandlerMiddleware = (req, res, next) => {
    req.log.warn('Not found');
    next(new server_util_1.ErrorHandler(404, "Not found"));
};
exports.notFoundHandlerMiddleware = notFoundHandlerMiddleware;
const errorHandlerMiddleware = (err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    // eslint-disable-next-line no-constant-condition
    res.locals.error = env.NODE_ENV || req.app.get('env')
        === 'development' || 'local' ? err : {};
    res.status(err.statusCode || 400).json({
        code: err.code || err.statusCode || 400,
        error: err.message,
    });
    next();
};
exports.errorHandlerMiddleware = errorHandlerMiddleware;
