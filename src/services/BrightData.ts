import axios, { AxiosRequestConfig } from 'axios';
import logger from 'jet-logger';
import config from '../config';

const BEARER_TOKEN = config.brightData_bearerToken;
const collectorId = config.brightData_collectorId;

logger.info(BEARER_TOKEN + " " + collectorId, true);

async function collect(keyword: string) {
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
    headers: headers,
    data: JSON.stringify(body),
  };
  try{
    const result = await axios.post(apiUrl, options);
  }
  catch(error)
  {
 
  }
  

  logger.info(result, true);
}

export default {
  collect,
};