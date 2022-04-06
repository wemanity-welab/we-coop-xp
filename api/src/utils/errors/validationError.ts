import { HttpStatus } from '@nestjs/common';

class ValidationError extends Error {
  errors: any;
  status: HttpStatus;
  constructor(errors: any, ...params: any) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ValidationError);
    }

    const message = 'La validation des entrées a échouée';

    this.name = `ValidationError`;
    this.status = HttpStatus.BAD_REQUEST;
    this.message = message;
    this.errors = errors;
  }
}

export default ValidationError;
