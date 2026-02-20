import { z } from 'zod';

export const createBonusDto = z.object({
  title: z.string().min(3).max(120),
  description: z.string().min(10).max(2000),
  offerUrl: z.string().url(),
  type: z.enum(['FREE', 'PREMIUM']),
  expiresAt: z.coerce.date()
});
