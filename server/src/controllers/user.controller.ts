import { Request, Response } from 'express';
import { userService } from '../services/user.service.js';

export const userController = {
  async profile(req: Request, res: Response) {
    const profile = await userService.getProfile(req.params.userId);
    res.json(profile);
  },

  async me(req: Request, res: Response) {
    const profile = await userService.getProfile(req.user!.userId);
    res.json(profile);
  },

  async updateMe(req: Request, res: Response) {
    const user = await userService.updateProfile(req.user!.userId, req.body);
    res.json(user);
  },

  async toggleFollow(req: Request, res: Response) {
    const result = await userService.toggleFollow(req.user!.userId, req.params.userId);
    res.json(result);
  }
};
