import axios, { AxiosRequestConfig } from 'axios';
import logger from 'jet-logger';
import config from '../config';

const BEARER_TOKEN = config.brightData_bearerToken;
const collectorId = config.brightData_collectorId;

export async function triggerCollector(keyword: string): Promise<{ success: boolean }> {
  const method = "triggerCollector";
  const metadata = { method, keyword };
  logger.info({ message: "Calling triggerCollector()", method }, true);

  if (!keyword) {
    logger.info({ message: "No keyword provided", data: { metadata } }, true);
    return { success: false };
  }

  const apiUrl = `https://api.brightdata.com/dca/trigger?collector=${collectorId}&queue_next=1`;
  const headers = {
    'Authorization': 'Bearer ' + BEARER_TOKEN,
    'Content-Type': 'application/json',
  };
  const body = {
    keyword,
  };
  const options: AxiosRequestConfig = {
    method: 'POST',
    headers,
  };
  try {
    const result = await axios.post(apiUrl, JSON.stringify(body), options);
    if (result.status >= 400) {
      logger.err({ message: "Failed to trigger the Bright Data collector", data: { result, apiUrl, options, metadata } }, true);
      return { success: false };
    }

    logger.info({ message: "Bright Data collector triggered", data: { result, metadata } }, true);
    return { success: true };
  }
  catch (error) {
    logger.err({ error: error as unknown, apiUrl, options, metadata }, true);
    return { success: false };
  }
}