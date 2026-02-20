import { Router } from 'express';
import { messageController } from '../controllers/message.controller.js';
import { sendMessageDto } from '../dtos/message.dto.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { messageRateLimit } from '../middlewares/rate-limit.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';

export const messageRouter = Router();

messageRouter.post('/', authMiddleware, messageRateLimit, validate(sendMessageDto), messageController.send);
messageRouter.get('/:conversationId', authMiddleware, messageController.history);
