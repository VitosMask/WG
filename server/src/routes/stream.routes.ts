import { Router } from 'express';
import { streamController } from '../controllers/stream.controller.js';
import { createStreamDto } from '../dtos/stream.dto.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';

export const streamRouter = Router();

streamRouter.get('/', streamController.list);
streamRouter.post('/', authMiddleware, validate(createStreamDto), streamController.create);
