import morgan from 'morgan';
import helmet from 'helmet';
import express, { Request, Response } from 'express';
import 'express-async-errors';
import apiRouter from './routes/api';
import logger from 'jet-logger';
import config from '@src/config';
import { HttpStatusCodes, NodeEnvs, RouteError } from '@src/models';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
) => {
  logger.err(err, true);
  let status = HttpStatusCodes.BAD_REQUEST;
  if (err instanceof RouteError) {
    status = err.status;
  }
  return res.status(status).json({ error: err.message });
});

export default app;
