import { Router, Request, Response } from 'express';
import logger from 'jet-logger';
const apiRouter = Router();

interface ICollect {
  product: string;
}

/**
 * Triggers a Bright Data collector for a given product
 */
apiRouter.post('/collect', (req: Request, res: Response) => {
  const method = 'brightData.collect';
  // Take in product name
  const { product } = (req.body as ICollect);

  try {
    // TODO Trigger Bright Data collector
    logger.info("Triggering Bright Data collector...");
    logger.info(product, true);
  
    return res.status(200).json({ success: true });
  }
  catch (error) {
    let message = "Error triggering Bright Data collector";
    if (error instanceof Error) {
      message = error.message;
    }

    logger.err({ method, message, error }, true);
    return res.sendStatus(500);
  }
});
export default apiRouter;
