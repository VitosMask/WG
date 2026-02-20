import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import { env } from '../config/env.js';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.replace('Bearer ', '');

  if (!token) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Unauthorized' });
  }

  const payload = jwt.verify(token, env.JWT_SECRET) as Express.UserPayload;
  req.user = payload;
  next();
};

export const roleMiddleware = (roles: Array<'USER' | 'ADMIN'>) => (req: Request, res: Response, next: NextFunction) => {
  if (!req.user || !roles.includes(req.user.role)) {
    return res.status(StatusCodes.FORBIDDEN).json({ message: 'Forbidden' });
  }

  next();
};

export const premiumMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user?.isPremium && req.user?.role !== 'ADMIN') {
    return res.status(StatusCodes.FORBIDDEN).json({ message: 'Premium subscription required' });
  }

  next();
};
