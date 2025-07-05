export interface PrismaError {
  code: string;
  meta?: {
    target?: string[];
  };
}