import { Role } from '@prisma/client';

declare global {
  namespace Express {
    interface UserPayload {
      userId: string;
      role: Role;
      isPremium: boolean;
    }

    interface Request {
      user?: UserPayload;
    }
  }
}

export {};
