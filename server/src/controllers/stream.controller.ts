import { Request, Response } from 'express';
import { streamService } from '../services/stream.service.js';

export const streamController = {
  async list(_req: Request, res: Response) {
    const streams = await streamService.list();
    res.json(streams);
  },

  async create(req: Request, res: Response) {
    const stream = await streamService.create(req.user!.userId, req.body);
    res.status(201).json(stream);
  }
};
