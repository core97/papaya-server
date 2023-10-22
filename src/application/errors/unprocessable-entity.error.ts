import { AppError } from '@/application/errors/app-error';
import { HttpErrorCode } from '@/application/http/http-errors';

export class UnprocessableEntityError extends AppError {
  constructor(message?: string) {
    super(message || 'Unprocesable entity', HttpErrorCode.UNPROCESSABLE_ENTITY);
  }
}
