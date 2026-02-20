import { Request, Response } from 'express';
import { messageService } from '../services/message.service.js';

export const messageController = {
  async send(req: Request, res: Response) {
    const message = await messageService.send(req.user!.userId, req.body.recipientId, req.body.content);
    res.status(201).json(message);
  },

  async history(req: Request, res: Response) {
    const messages = await messageService.getConversation(req.user!.userId, req.params.conversationId);
    res.json(messages);
  }
};
