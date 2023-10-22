import { httpHandler } from '@/application/http/http-handler';
import { ERROR_CODE_TO_HTTP_STATUS } from '@/application/http/http-errors';
import { createLogger } from '@/application/logger';
import { AppError } from '@/application/errors/app-error';
import { PapayaRequest } from '@/types/request';

interface ControllerOptions {
  isAuthenticatedRoute?: boolean;
  onFinish?: () => Promise<void> | void;
  validateAuthentication?: () => Promise<PapayaRequest['context']['user']>;
}

export const controller = (
  callback: (request: PapayaRequest) => Promise<Response>,
  optionsCtrl: ControllerOptions = {}
) => ({
  run: async (
    request: PapayaRequest,
    options?: { urlParams?: Record<string, string> }
  ) => {
    const logger = createLogger({ method: request.method, url: request.url });

    logger.info('Starting request');

    const url = new URL(request.url);

    request.params = options?.urlParams || {};
    request.searchParams = {};
    request.context = {
      log: logger,
    };

    url.searchParams.forEach((key, value) => {
      const searchParamValue = request.searchParams[key];

      if (Array.isArray(searchParamValue)) {
        request.searchParams[key] = [...searchParamValue, value];
      } else if (searchParamValue) {
        request.searchParams[key] = [searchParamValue, value];
      } else {
        request.searchParams[key] = value;
      }
    });

    try {
      if (optionsCtrl.isAuthenticatedRoute) {
        if (!optionsCtrl.validateAuthentication) {
          throw new Error('Missing "validateAuthentication()" to authenticate');
        }

        const auth = await optionsCtrl.validateAuthentication();

        if (!auth?.email) {
          return httpHandler.unauthorized('You are not logged in');
        }

        request.context.user = {
          email: auth.email,
          id: auth.id,
          role: auth.role,
        };
      }

      const res = await callback(request);

      await optionsCtrl.onFinish?.();

      logger.info('Request completed');

      return res;
    } catch (error) {
      const errorMsg =
        error instanceof Error ? error.message : 'unexpected error';

      logger.error(`Request error: ${errorMsg}`);
      logger.error(error);

      if (error instanceof AppError) {
        const httpStatus = ERROR_CODE_TO_HTTP_STATUS[error.httpCode];

        return httpHandler.jsonResponse(httpStatus, {
          businessCode: error.businessCode,
          httpCode: error.httpCode,
        });
      }

      return httpHandler.fail();
    }
  },
});
