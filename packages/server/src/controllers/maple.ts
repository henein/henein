import { Middleware } from 'koa';
import { CheckExistRequest, CheckExistResponse } from '@henein/core';
import { ResponseError } from './../errors/responseError';
import { getCharacterDetailToken, getJobs } from './../utilities/maple';

export default class Controller {
  static checkExist: Middleware = async (context, next) => {
    const requestBody = context.request.body as CheckExistRequest;

    if (!requestBody.nickname) {
      throw new ResponseError(422, '잘못된 입력입니다');
    }

    const response: CheckExistResponse = {
      nickname: requestBody.nickname,
      exist: (await getCharacterDetailToken(requestBody.nickname)) !== '',
    };

    context.body = response;
  };

  static verification: Middleware = async (context, next) => {
    await getJobs();
  };
}
