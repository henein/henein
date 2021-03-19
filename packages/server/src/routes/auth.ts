import Router from '@koa/router';
import Controller from '../controllers/auth';

const router = new Router();

router.get('/register', Controller.register)

export default router;
