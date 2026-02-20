import { prisma } from '../config/prisma.js';

export const bonusService = {
  create(adminId: string, data: { title: string; description: string; offerUrl: string; type: 'FREE' | 'PREMIUM'; expiresAt: Date }) {
    return prisma.bonus.create({ data: { ...data, createdById: adminId } });
  },

  listActive(userIsPremium = false) {
    return prisma.bonus.findMany({
      where: {
        expiresAt: { gt: new Date() },
        ...(userIsPremium ? {} : { type: 'FREE' })
      },
      orderBy: { expiresAt: 'asc' }
    });
  }
};
