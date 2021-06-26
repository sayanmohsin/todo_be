const { env }: any = process;

// imports
import { Request, Response, NextFunction } from 'express';
import { ErrorHandler } from '../utils/server.util';

export const forbiddenHandlerMiddleware = (req: Request, res: Response, next: NextFunction) => {
    req.log.warn('Forbidden');
    next(new ErrorHandler(403, "Forbidden"));
}

export const notFoundHandlerMiddleware = (req: Request, res: Response, next: NextFunction) => {
    req.log.warn('Not found');
    next(new ErrorHandler(404, "Not found"));
}

export const errorHandlerMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
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
}