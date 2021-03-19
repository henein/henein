import { Middleware } from '@koa/router';
import argon2 from 'argon2';
import { validate } from 'class-validator';
import { User } from '../entity/User';
import { ResponseError } from './../errors/responseError';

export type RegisterBody = {
  name: string;
  email: string;
  password: string;
  // birthday: Date;
};

export default class Controller {
  static register: Middleware = async (context, next) => {
    try {
      const body = context.request.body as RegisterBody;

      const hash = await argon2.hash(body.password, { type: argon2.argon2id, timeCost: 4, parallelism: 4 });

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
    } catch (error) {
        throw error;
    }
  };
}
