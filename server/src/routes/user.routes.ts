import { Router } from 'express';
import { userController } from '../controllers/user.controller.js';
import { updateProfileDto } from '../dtos/user.dto.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';

export const userRouter = Router();

userRouter.get('/me', authMiddleware, userController.me);
userRouter.patch('/me', authMiddleware, validate(updateProfileDto), userController.updateMe);
userRouter.get('/:userId', userController.profile);
userRouter.post('/:userId/follow', authMiddleware, userController.toggleFollow);
