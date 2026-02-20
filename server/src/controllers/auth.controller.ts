import { Request, Response } from 'express';
import { authService } from '../services/auth.service.js';

export const authController = {
  async register(req: Request, res: Response) {
    const token = await authService.register(req.body);
    res.status(201).json({ token });
  },

  async login(req: Request, res: Response) {
    const token = await authService.login(req.body);
    res.json({ token });
  }
};
