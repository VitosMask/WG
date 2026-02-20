import { Router } from 'express';
import { authController } from '../controllers/auth.controller.js';
import { loginDto, registerDto } from '../dtos/auth.dto.js';
import { authRateLimit } from '../middlewares/rate-limit.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';

export const authRouter = Router();

authRouter.post('/register', authRateLimit, validate(registerDto), authController.register);
authRouter.post('/login', authRateLimit, validate(loginDto), authController.login);
