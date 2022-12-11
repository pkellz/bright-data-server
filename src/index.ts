import './pre-start';
import logger from 'jet-logger';
import config from '@src/config';
import server from './server';

const message = 'Express server started on port: ' + config.port.toString();
server.listen(config.port, () => logger.info(message));
