import { Middleware } from 'koa';
import jwt from 'jsonwebtoken';
import { ResponseError } from './../errors/responseError';
import config from '../configs';
import { AccessTokenPayload } from '../entity/Token';

export const authenticateHandler: Middleware = async (context, next) => {
  const { authorization } = context.headers;

  if (!authorization?.startsWith('Bearer')) {
    throw new ResponseError(401);
  }

  const token = authorization.split('Bearer ')[1];

  if (!token) {
    throw new ResponseError(401);
  }

  const decodedToken = jwt.verify(token, config.jwtSecret, {
    subject: 'accessToken',
    issuer: 'henein.club',
    ignoreExpiration: false,
  }) as AccessTokenPayload;

  context.user = {
    id: decodedToken.userId,
  };

  return next();
};
