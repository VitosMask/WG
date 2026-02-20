import { z } from 'zod';

export const createStreamDto = z.object({
  title: z.string().min(3).max(120),
  platformUrl: z.string().url(),
  viewersCount: z.number().int().nonnegative().default(0)
});
