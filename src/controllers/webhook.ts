import logger from 'jet-logger';
import { Request, Response } from 'express';
import { mongo } from '@src/services';

interface IProduct {
  search: string,
  title: string,
  url: string,
  price: number,
  image: string,
  imageset: string,
  input: {
    keyword: string
  }
  error?: string
}

/**
 * Receive webhook from Bright Data collector and process the data
 */
export async function webhook(req: Request, res: Response): Promise<Response> {
  const method = "brightData.webhook";
  const metadata = { method, body: req.body as IProduct[] };
  const data = req.body as IProduct[];

  // TODO Validate the data?

  try {
    const result = await mongo.insertMany(data);

    if (!result.success) {
      logger.err({ message: "Failed to insert products into Mongo", ...{ result, metadata } }, true);
      return res.status(500).json({ success: false, message: "An unexpected error has occurred" });
    }

    return res.status(200).json({ success: true });
  }
  catch (error) {
    let message = "Error storing products in MongoDB";
    if (error instanceof Error) {
      message = error.message;
    }

    logger.err({ method, message, error: error as unknown, metadata }, true);
    return res.status(500).json({ success: false, message: "An unexpected error has occurred" });
  }
}