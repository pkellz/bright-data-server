import logger from 'jet-logger';
import { Request, Response } from 'express';
import { mongo } from '@src/services';
import { IQuery } from '@src/models';

/**
 * Receive webhook from Bright Data collector and insert the Query into Mongo
 */
export async function webhook(req: Request, res: Response): Promise<Response> {
  const method = "brightData.webhook";
  const metadata = { method, body: req.body as IQuery[] };
  const data = req.body as IQuery[];

  // TODO Validate the data?

  try {
    const result = await mongo.insert<IQuery>(data[0]);

    if (!result.success) {
      logger.err({ message: "Failed to insert products into Mongo", ...{ result, metadata } }, true);
      return res.status(500).json({ success: false, errorMessage: "An unexpected error has occurred" });
    }

    return res.status(200).json({ success: true });
  }
  catch (error) {
    let message = "Error storing products in MongoDB";
    if (error instanceof Error) {
      message = error.message;
    }

    logger.err({ method, message, error: error as unknown, metadata }, true);
    return res.status(500).json({ success: false, errorMessage: "An unexpected error has occurred" });
  }
}