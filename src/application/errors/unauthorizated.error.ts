import { AppError } from '@/application/errors/app-error';
import { HttpErrorCode } from '@/application/http/http-errors';

export class UnauthorizatedError extends AppError {
  constructor(message?: string) {
    super(message || 'Unauthorizated', HttpErrorCode.UNAUTHORIZATED);
  }
}
