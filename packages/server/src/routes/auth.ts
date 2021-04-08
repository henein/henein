import Router from '@koa/router';
import Controller from '../controllers/auth';

const router = new Router();

router.post('/login', Controller.login);

router.post('/logout', Controller.logout);

router.post('/register', Controller.register);

export default router;
