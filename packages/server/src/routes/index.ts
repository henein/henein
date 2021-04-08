import Router from '@koa/router';
import auth from './auth';
import maple from './maple';

const router = new Router();

router.use('/auth', auth.routes(), auth.allowedMethods());

router.use('/maple', maple.routes(), maple.allowedMethods());

export default router;
