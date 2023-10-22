import { AppError } from '@/application/errors/app-error';
import { HttpErrorCode } from '@/application/http/http-errors';

export class ForbiddenError extends AppError {
  constructor(message?: string) {
    super(message || 'Forbidden', HttpErrorCode.FORBIDDEN);
  }
}
