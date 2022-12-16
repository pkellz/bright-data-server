import { collect, webhook, getProducts } from '@src/controllers';
import { Router } from 'express';
const apiRouter = Router();

apiRouter.post('/collect', collect);
apiRouter.post('/webhook', webhook);
apiRouter.get('/products', getProducts);

export default apiRouter;
