import { z } from 'zod';

export const sendMessageDto = z.object({
  recipientId: z.string().cuid(),
  content: z.string().min(1).max(2000)
});
