import { Middleware } from 'koa';
import passport from 'koa-passport';
import argon2 from 'argon2';
import { validate } from 'class-validator';
import jwt from 'jsonwebtoken';
import { User } from '../entity/User';
import { ResponseError } from './../errors/responseError';
import { RefreshTokenPayload, Token } from '../entity/Token';
import config from '../configs';

export type RegisterBody = {
  name: string;
  email: string;
  password: string;
  // birthday: Date;
};

export default class Controller {
  static login: Middleware = async (context, next) => {
    return passport.authenticate(
      'local',
      { session: false },
      async (error, user) => {
        if (error) {
          throw error;
        }

        if (!user) {
          throw new ResponseError(400, '잘못된 이메일 또는 비밀번호입니다');
        }

        const { refreshToken, accessToken } = await Token.generateToken(user);

        context.cookies.set('refreshToken', refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          maxAge: 1000 * 60 * 60 * 24 * 14,
        });
        context.body = { accessToken };
      }
    )(context, next);
  };

  static logout: Middleware = async (context, next) => {
    const signedToken = context.cookies.get('refreshToken');

    if (!signedToken) {
      throw new ResponseError(401);
    }

    const decodedToken = jwt.verify(signedToken, config.jwtSecret, {
      subject: 'refreshToken',
      issuer: 'henein.club',
      ignoreExpiration: false,
    }) as RefreshTokenPayload;

    const token = await Token.findOne(decodedToken.tokenId);

    if (!token || token.disabled) {
      throw new ResponseError(401);
    }

    token.disabled = true;
    token.save();

    context.cookies.set('refreshToken');
  };

  static register: Middleware = async (context, next) => {
    const body = context.request.body as RegisterBody;

    if (await User.findOne({ email: body.email })) {
      throw new ResponseError(409, '중복된 이메일입니다');
    }

    // 패스워드 검증 추가

    const hash = await argon2.hash(body.password, {
      type: argon2.argon2id,
      timeCost: 4,
      parallelism: 4,
    });

    const user = new User();
    user.name = body.name;
    user.email = body.email;
    user.password = hash;

    const errors = await validate(user);

    if (errors.length > 0) {
      throw new ResponseError(422, '잘못된 입력입니다');
    } else {
      await user.save();
      context.status = 201;
    }
  };

  static mapleVerification: Middleware = async (context, next) => {
    // maple
  };
}
