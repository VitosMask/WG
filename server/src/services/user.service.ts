import { prisma } from '../config/prisma.js';

export const userService = {
  getProfile(userId: string) {
    return prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        username: true,
        bio: true,
        avatarUrl: true,
        isPremium: true,
        posts: { orderBy: { createdAt: 'desc' }, take: 20 },
        _count: { select: { followers: true, following: true } }
      }
    });
  },

  updateProfile(userId: string, data: { username?: string; bio?: string; avatarUrl?: string }) {
    return prisma.user.update({ where: { id: userId }, data });
  },

  async toggleFollow(followerId: string, followingId: string) {
    const relation = await prisma.follow.findUnique({ where: { followerId_followingId: { followerId, followingId } } });
    if (relation) {
      await prisma.follow.delete({ where: { id: relation.id } });
      return { following: false };
    }
    await prisma.follow.create({ data: { followerId, followingId } });
    return { following: true };
  }
};
