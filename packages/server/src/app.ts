import 'reflect-metadata';
import Koa from 'koa';
import cors from '@koa/cors';
import logger from 'koa-logger';
import helmet from 'koa-helmet';
import bodyParser from 'koa-bodyparser';
import passport from 'koa-passport';
import router from './routes';
import './passport';
import './configs';

const app = new Koa();

app.use(logger());

app.use(cors());
app.use(helmet());
app.use(bodyParser());

app.use(passport.initialize());

app.use(router.routes()).use(router.allowedMethods());

export default app;
