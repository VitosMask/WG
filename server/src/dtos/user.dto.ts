import { z } from 'zod';

export const updateProfileDto = z.object({
  username: z.string().min(3).max(30).optional(),
  bio: z.string().max(200).optional(),
  avatarUrl: z.string().url().optional()
});
