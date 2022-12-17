import logger from 'jet-logger';
import { triggerCollector } from "../services";
import { Request, Response } from 'express';

interface ICollect {
    keyword: string;
}

/**
 * Triggers a Bright Data collector for a given product
 */
export async function collect(req: Request, res: Response): Promise<Response> {
  const method = 'brightData.collect';
  const metadata = { method, body: req.body as ICollect };
  const { keyword } = (req.body as ICollect);

  if (!keyword) {
    logger.err({ message: "No keyword provided", data: { metadata } }, true);
    return res.status(400).json({ success: false, errorMessage: "No keyword provided" });
  }

  try {
    const response = await triggerCollector(keyword);
    if (!response.success) {
      logger.err({ message: "Failed to trigger the Bright Data collector", data: { response, metadata } }, true);
      return res.status(500).json({ success: false, errorMessage: "An unexpected error has occurred" });
    }

    return res.status(200).json({ success: true });
  }
  catch (error) {
    let message = "Error triggering Bright Data collector";
    if (error instanceof Error) {
      message = error.message;
    }

    logger.err({ method, message, error: error as unknown }, true);
    return res.status(500).json({ success: false, errorMessage: "An unexpected error has occurred" });
  }
}