import { z } from 'zod';

export const createPostDto = z.object({
  content: z.string().min(1).max(2000),
  imageUrl: z.string().url().optional(),
  voiceUrl: z.string().url().optional()
});

export const createCommentDto = z.object({
  content: z.string().min(1).max(500)
});
