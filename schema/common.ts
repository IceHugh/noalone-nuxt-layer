import { z } from 'zod';

export const parseNumber = (val: string, defaultValue: number) => {
  const parsed = Number(val);
  if (isNaN(parsed)) {
    throw new Error('Invalid number');
  }
  return parsed;
};
export const paginationSchema = z.object({
  page: z
    .string()
    .transform((val) => parseNumber(val, 0))
    .pipe(z.number().min(0).optional().default(1)),
  pageSize: z
    .string()
    .transform((val) => parseNumber(val, 10))
    .pipe(z.number().min(1).max(500).optional().default(10)),
});

export type PaginationSchema = z.output<typeof paginationSchema>;
