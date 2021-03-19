export class ResponseError extends Error {
    status: number;
  
    constructor(status: number, message?: string) {
      super(message);
  
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, ResponseError);
      }
  
      this.status = status;
    }
  }
  