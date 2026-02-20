import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('Password123!', 10);

  const [admin, userA, userB] = await Promise.all([
    prisma.user.upsert({
      where: { email: 'admin@wg.local' },
      update: {},
      create: {
        email: 'admin@wg.local',
        username: 'casino_admin',
        passwordHash,
        role: 'ADMIN',
        isPremium: true,
        bio: 'Platform administrator'
      }
    }),
    prisma.user.upsert({
      where: { email: 'alice@wg.local' },
      update: {},
      create: {
        email: 'alice@wg.local',
        username: 'alice_slots',
        passwordHash,
        isPremium: true
      }
    }),
    prisma.user.upsert({
      where: { email: 'bob@wg.local' },
      update: {},
      create: {
        email: 'bob@wg.local',
        username: 'bob_poker',
        passwordHash
      }
    })
  ]);

  const post = await prisma.post.create({
    data: {
      authorId: userA.id,
      content: 'Big win session tonight 🎰',
      imageUrl: 'https://picsum.photos/seed/win/600/300'
    }
  });

  await prisma.comment.create({ data: { postId: post.id, authorId: userB.id, content: 'Congrats, waiting for next stream!' } });
  await prisma.like.create({ data: { postId: post.id, userId: userB.id } });
  await prisma.follow.upsert({
    where: { followerId_followingId: { followerId: userB.id, followingId: userA.id } },
    create: { followerId: userB.id, followingId: userA.id },
    update: {}
  });

  await prisma.bonus.create({
    data: {
      title: 'Welcome Free Spins',
      description: 'No deposit free spins for new users',
      offerUrl: 'https://casino.example/offer/free-spins',
      type: 'FREE',
      expiresAt: new Date(Date.now() + 7 * 24 * 3600 * 1000),
      createdById: admin.id
    }
  });

  await prisma.stream.create({
    data: {
      userId: userA.id,
      title: 'Slots Marathon Live',
      platformUrl: 'https://twitch.tv/alice_slots',
      viewersCount: 240
    }
  });
}

main().finally(async () => prisma.$disconnect());
