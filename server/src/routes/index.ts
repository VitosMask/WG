import { Router } from 'express';
import { authRouter } from './auth.routes.js';
import { bonusRouter } from './bonus.routes.js';
import { feedRouter } from './feed.routes.js';
import { messageRouter } from './message.routes.js';
import { streamRouter } from './stream.routes.js';
import { userRouter } from './user.routes.js';

export const appRouter = Router();

appRouter.use('/auth', authRouter);
appRouter.use('/feed', feedRouter);
appRouter.use('/users', userRouter);
appRouter.use('/bonuses', bonusRouter);
appRouter.use('/streams', streamRouter);
appRouter.use('/messages', messageRouter);
