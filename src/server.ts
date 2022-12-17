import morgan from 'morgan';
import helmet from 'helmet';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import apiRouter from './routes/api';
import logger from 'jet-logger';
import config from '@src/config';
import { HttpStatusCodes, NodeEnvs, RouteError } from '@src/models';
import qs from 'qs';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Query parser
app.set('query parser', (str: string) => qs.parse(str));

// Show routes called in console during development
if (config.nodeEnv === NodeEnvs.Dev) {
  app.use(morgan('dev'));
}

// Security
if (config.nodeEnv === NodeEnvs.Production) {
  app.use(helmet());
}

// Add API routes
app.use('/api', apiRouter);

// Setup error handler
app.use((
  err: Error,
  _: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction,
) => {
  logger.err(err, true);
  let status = HttpStatusCodes.BAD_REQUEST;
  if (err instanceof RouteError) {
    status = err.status;
  }
  return res.status(status).json({ error: err.message });
});

process.on('warning', e => logger.warn(e.stack));

process.on('uncaughtException', (err, origin) => {
  logger.err({ err, origin }, true);
  throw new Error(err as unknown as string);
});

export default app;
