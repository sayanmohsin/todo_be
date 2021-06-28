// environment variables
const { env }: any = process;

// imports
import express, { Application, Request, Response, NextFunction } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import helmet from 'helmet';
import cors, { CorsRequest } from 'cors';
import pino from 'pino';
import expressPino from 'express-pino-logger';
import { normalizePort } from './utils/server.util';
import { successMsg, errorMsg, infoMsg } from './configs/log.config';
import { errorHandlerMiddleware, forbiddenHandlerMiddleware, notFoundHandlerMiddleware } from './middlewares/handlers.middleware';
import { initDataSource, mongoConnect, pgConnect } from './configs/db.config';

let level = env.NODE_ENV === 'production' ? 'info' : 'error'
if (env.NODE_ENV === 'test')
  level = 'silent'

const logger = pino({
  name: 'TODO_BE',
  level: level,
  prettyPrint: {
    colorize: true,
    levelFirst: false,
    timestampKey: 'time',
    translateTime: false,
  },
});

const appInstance = (async () => {
  try {
    logger.info(infoMsg(`Starting server`));

    const app: Application = express();
    await pgConnect(logger)
    await mongoConnect(logger);
    await initDataSource(logger);

    // routes
    const { todoRouter } = await import('./routes/todo');

    const port: string | boolean = normalizePort(env.PORT || '3000');

    // middlewares
    app.options('*', cors() as any);
    app.use(cors());
    app.use(
      expressPino({
        logger: logger,
      }) as any
    );

    app.use(helmet() as any);
    app.use(compression());

    app.use(
      express.json({
        limit: '50mb'
      }) as any
    );

    app.use(
      express.urlencoded({
        limit: '50mb', extended: true
      }) as any
    );
    app.use(cookieParser());

    app.use(
      '/public',
      express.static(path.join(__dirname, '../public'))
    );

    app.all('/', (req, res) => {
      res.redirect('https://documenter.getpostman.com/view/3873826/Tzedi53j');
    });

    app.all('/health', (req: Request, res: Response, next: NextFunction) => {
      try {
        res.send({
          health: true,
          message: 'healthy',
          version: 1.0,
          environment: env.NODE_ENV
        });
      } catch (err) {
        next(err);
      }
    });

    app.use('/todo', await todoRouter());

    // auth error
    app.get('/forbidden', forbiddenHandlerMiddleware);

    // catch 404 and forward to error handler
    app.use(notFoundHandlerMiddleware);

    // error handler
    app.use(errorHandlerMiddleware);

    app.listen(port, (): void => {
      logger.info(successMsg(`Express server started on port ${port}`));
    });

    return app;

  } catch (e: any) {
    logger.error('e: ', e);
    logger.error(errorMsg`Server start error due to ${e.message}`);
  }
})();

export default appInstance;