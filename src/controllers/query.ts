import { Request, Response } from 'express';
import { mongo } from '@src/services/MongoDB';
import logger from 'jet-logger';
import { IQuery } from '@src/models';

/**
 * Given a keyword, search the db for a Query object. If found, return data.
 */
export async function getQuery(req: Request, res: Response): Promise<Response> {
  const method = "brightData.getQuery";
  const metadata = { method, body: req.body as { keyword: string } };
  const { keyword } = req.body as { keyword: string };

  if (!keyword) {
    const message = "No keyword provided";
    logger.err({ message, ...{ metadata } }, true);
    return res.status(400).json({ success: false, message });
  }

  try {
    const data = await mongo.find<IQuery>({ keyword });
    return res.status(200).json({ success: true, data });
  }
  catch (error) {
    logger.err({ method, message: "Error finding query in MongoDB", error: error as unknown, metadata }, true);
    return res.status(500).json({ success: false, message: "An unexpected error has occurred" });
  }
}