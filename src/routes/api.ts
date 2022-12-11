import { Router, Request, Response } from 'express';
import logger from 'jet-logger';
const apiRouter = Router();

// Test route
apiRouter.post('/', (req: Request, res: Response) => {
  logger.info(req.body, true);
  const { name } = (req.body as any);
  return res.send(`Hello, ${name as string}`);
});

export default apiRouter;
