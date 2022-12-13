import { collect } from '@src/controllers';
import { Router } from 'express';
const apiRouter = Router();

apiRouter.post('/collect', collect);

export default apiRouter;
