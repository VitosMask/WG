import { Request, Response } from 'express';
import { prisma } from '../config/prisma.js';
import { feedService } from '../services/feed.service.js';

export const feedController = {
  async list(req: Request, res: Response) {
    const posts = await feedService.listFeed(req.query.cursor as string | undefined, (req.query.sort as 'new' | 'popular') ?? 'new');
    res.json(posts);
  },

  async create(req: Request, res: Response) {
    const post = await feedService.createPost(req.user!.userId, req.body);
    res.status(201).json(post);
  },

  async comment(req: Request, res: Response) {
    const comment = await prisma.comment.create({
      data: { postId: req.params.postId, authorId: req.user!.userId, content: req.body.content }
    });
    res.status(201).json(comment);
  },

  async like(req: Request, res: Response) {
    const like = await prisma.like.upsert({
      where: { postId_userId: { postId: req.params.postId, userId: req.user!.userId } },
      create: { postId: req.params.postId, userId: req.user!.userId },
      update: {}
    });
    res.json(like);
  },

  async repost(req: Request, res: Response) {
    const repost = await prisma.repost.upsert({
      where: { postId_userId: { postId: req.params.postId, userId: req.user!.userId } },
      create: { postId: req.params.postId, userId: req.user!.userId },
      update: {}
    });
    res.json(repost);
  }
};
