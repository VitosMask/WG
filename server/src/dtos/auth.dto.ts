import { z } from 'zod';

export const registerDto = z.object({
  email: z.string().email(),
  username: z.string().min(3).max(30),
  password: z.string().min(8).max(100)
});

export const loginDto = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});
