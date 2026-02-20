import { prisma } from '../config/prisma.js';

export const feedService = {
  listFeed(cursor?: string, sort: 'new' | 'popular' = 'new') {
    return prisma.post.findMany({
      take: 10,
      skip: cursor ? 1 : 0,
      cursor: cursor ? { id: cursor } : undefined,
      orderBy: sort === 'new' ? { createdAt: 'desc' } : { likes: { _count: 'desc' } },
      include: {
        author: { select: { id: true, username: true, avatarUrl: true } },
        _count: { select: { likes: true, reposts: true, comments: true } }
      }
    });
  },

  createPost(userId: string, data: { content: string; imageUrl?: string; voiceUrl?: string }) {
    return prisma.post.create({ data: { authorId: userId, ...data } });
  }
};
