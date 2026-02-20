import { NextFunction, Request, Response } from 'express';
import { Prisma } from '@prisma/client';
import { ZodError } from 'zod';

export const errorHandler = (error: unknown, _req: Request, res: Response, _next: NextFunction) => {
  if (error instanceof ZodError) {
    return res.status(400).json({ message: 'Validation failed', issues: error.flatten() });
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    return res.status(409).json({ message: 'Database conflict', code: error.code });
  }

  const message = error instanceof Error ? error.message : 'Internal server error';
  return res.status(500).json({ message });
};
