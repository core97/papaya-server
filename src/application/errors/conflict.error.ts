import { AppError } from '@/application/errors/app-error';
import { HttpErrorCode } from '@/application/http/http-errors';

export class ConflictError extends AppError {
  constructor(message = 'Conflict', bussinessCode?: string) {
    super(message, HttpErrorCode.CONFLICT, bussinessCode);
  }
}
