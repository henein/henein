export class ResponseError extends Error {
  status: number;
  expose: boolean;

  constructor(status: number, message?: string) {
    super(message);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ResponseError);
    }

    this.status = status;
    this.expose = true;
  }
}
