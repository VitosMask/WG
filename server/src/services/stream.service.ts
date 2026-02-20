import { prisma } from '../config/prisma.js';

export const streamService = {
  create(userId: string, data: { title: string; platformUrl: string; viewersCount: number }) {
    return prisma.stream.create({ data: { userId, ...data } });
  },

  list() {
    return prisma.stream.findMany({
      where: { isLive: true },
      orderBy: { viewersCount: 'desc' },
      include: { user: { select: { username: true, avatarUrl: true } } }
    });
  },

  updateViewers(streamId: string, viewersCount: number) {
    return prisma.stream.update({ where: { id: streamId }, data: { viewersCount } });
  }
};
