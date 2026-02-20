import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { prisma } from '../config/prisma.js';
import { env } from '../config/env.js';

export const authService = {
  async register(data: { email: string; username: string; password: string }) {
    const passwordHash = await bcrypt.hash(data.password, 10);
    const user = await prisma.user.create({
      data: { email: data.email, username: data.username, passwordHash }
    });
    return this.issueToken(user.id, user.role, user.isPremium);
  },

  async login(data: { email: string; password: string }) {
    const user = await prisma.user.findUnique({ where: { email: data.email } });
    if (!user || !(await bcrypt.compare(data.password, user.passwordHash))) {
      throw new Error('Invalid credentials');
    }
    return this.issueToken(user.id, user.role, user.isPremium);
  },

  issueToken(userId: string, role: 'USER' | 'ADMIN', isPremium: boolean) {
    return jwt.sign({ userId, role, isPremium }, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN });
  }
};
