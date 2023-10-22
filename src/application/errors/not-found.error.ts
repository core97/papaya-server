import { AppError } from '@/application/errors/app-error';
import { HttpErrorCode } from '@/application/http/http-errors';

export class NotFoundError extends AppError {
  constructor(message?: string) {
    super(message || 'Not found', HttpErrorCode.NOT_FOUND);
  }
}
