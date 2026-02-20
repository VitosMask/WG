import { Router } from 'express';
import { bonusController } from '../controllers/bonus.controller.js';
import { createBonusDto } from '../dtos/bonus.dto.js';
import { authMiddleware, premiumMiddleware, roleMiddleware } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';

export const bonusRouter = Router();

bonusRouter.get('/', authMiddleware, bonusController.list);
bonusRouter.get('/premium', authMiddleware, premiumMiddleware, bonusController.list);
bonusRouter.post('/', authMiddleware, roleMiddleware(['ADMIN']), validate(createBonusDto), bonusController.create);
