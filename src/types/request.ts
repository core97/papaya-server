import { createLogger } from '@/application/logger';

export interface PapayaRequest extends Request {
  context: {
    log: ReturnType<typeof createLogger>;
    user?: { id: string; email: string; role?: string };
  };
  params: Partial<{ [key: string]: string }>;
  searchParams: Partial<{ [key: string]: string | string[] }>;
}
