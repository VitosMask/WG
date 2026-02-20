import { prisma } from '../config/prisma.js';

export const messageService = {
  async send(senderId: string, recipientId: string, content: string) {
    const [a, b] = [senderId, recipientId].sort();
    const conversation = await prisma.conversation.upsert({
      where: { userAId_userBId: { userAId: a, userBId: b } },
      create: { userAId: a, userBId: b },
      update: {}
    });

    return prisma.message.create({
      data: { conversationId: conversation.id, senderId, content },
      include: { sender: { select: { username: true } } }
    });
  },

  getConversation(userId: string, conversationId: string) {
    return prisma.message.findMany({
      where: {
        conversationId,
        conversation: { OR: [{ userAId: userId }, { userBId: userId }] }
      },
      orderBy: { createdAt: 'asc' }
    });
  }
};
