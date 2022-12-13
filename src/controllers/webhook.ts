import logger from 'jet-logger';
import { Request, Response } from 'express';
import { Mongo } from '@src/services';

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
export async function webhook(req: Request, res: Response) {
  const method = "brightData.webhook";
  const metadata = { method, body: req.body as IProduct[] };
  const data = req.body as IProduct[];

  // TODO Validate the data?

  // TODO Put the products into MongoDB
  try {
    // TODO
    const result = await Mongo.insertMany(data);

    if(!result.success)
    {
      logger.err({ message: "Failed to insert products into Mongo", data: { result, data } }, true);
      return res.status(500).json({ success: false, message: "An unexpected error has occurred" });
    }

    return res.status(200).json({ success: true });
  }
  catch (error) {
    let message = "Error storing products in MongoDB";
    if (error instanceof Error) {
      message = error.message;
    }

    logger.err({ method, message, error: error as unknown }, true);
    return res.status(500).json({ success: false, message: "An unexpected error has occurred" });
  } 
}