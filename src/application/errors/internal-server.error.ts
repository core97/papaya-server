import { AppError } from '@/application/errors/app-error';
import { HttpErrorCode } from '@/application/http/http-errors';

export class InternalServerError extends AppError {
  constructor(message?: string) {
    super(message || 'Internal server error', HttpErrorCode.INTERNAL_ERROR);
  }
}
