import { Router } from 'express';
import { feedController } from '../controllers/feed.controller.js';
import { createCommentDto, createPostDto } from '../dtos/post.dto.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';

export const feedRouter = Router();

feedRouter.get('/', feedController.list);
feedRouter.post('/', authMiddleware, validate(createPostDto), feedController.create);
feedRouter.post('/:postId/comments', authMiddleware, validate(createCommentDto), feedController.comment);
feedRouter.post('/:postId/likes', authMiddleware, feedController.like);
feedRouter.post('/:postId/reposts', authMiddleware, feedController.repost);
