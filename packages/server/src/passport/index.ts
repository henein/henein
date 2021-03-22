import passport from 'koa-passport';
import localStrategy from './local';

passport.use(localStrategy);
