import { createLogger } from '@/application/logger';

export interface PapayaRequest extends Request {
  context: {
    user?: { id: string; email: string; role?: string };
  };
  logger: ReturnType<typeof createLogger>;
  params: Partial<{ [key: string]: string }>;
  searchParams: Partial<{ [key: string]: string | string[] }>;
}
