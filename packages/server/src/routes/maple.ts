import Router from '@koa/router';
import Controller from '../controllers/maple';

const router = new Router();

router.post('/verification', Controller.verification);

export default router;
