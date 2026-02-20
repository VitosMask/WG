import { Request, Response } from 'express';
import { bonusService } from '../services/bonus.service.js';

export const bonusController = {
  async list(req: Request, res: Response) {
    const bonuses = await bonusService.listActive(Boolean(req.user?.isPremium || req.user?.role === 'ADMIN'));
    res.json(bonuses);
  },

  async create(req: Request, res: Response) {
    const bonus = await bonusService.create(req.user!.userId, req.body);
    res.status(201).json(bonus);
  }
};
