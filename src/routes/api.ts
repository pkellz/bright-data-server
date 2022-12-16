import { collect, webhook, getQuery } from '@src/controllers';
import { Router } from 'express';
const apiRouter = Router();

apiRouter.post('/collect', collect);
apiRouter.post('/webhook', webhook);
apiRouter.post('/query', getQuery);

export default apiRouter;
