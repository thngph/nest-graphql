// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function seed() {
  try {
    await prisma.post.deleteMany();
    await prisma.user.deleteMany();

    const users = [
      {
        name: 'Alice Smith',
        email: 'alice@example.com',
        password: await bcrypt.hash('password123', 10),
      },
      {
        name: 'Bob Johnson',
        email: 'bob@example.com',
        password: await bcrypt.hash('password456', 10),
      },
    ];

    for (const user of users) {
      await prisma.user.create({ data: user });
    }

    const alice = await prisma.user.findUnique({
      where: { email: 'alice@example.com' },
    });
    const bob = await prisma.user.findUnique({
      where: { email: 'bob@example.com' },
    });

    if (!alice || !bob) throw new Error('Users not found');

    const posts = [
      {
        title: 'First Post by Alice',
        content: 'This is my first post!',
        authorId: alice.id,
      },
      {
        title: 'Second Post by Alice',
        content: 'Another post by me.',
        authorId: alice.id,
      },
      {
        title: 'Bob’s Thoughts',
        content: 'Hello world from Bob!',
        authorId: bob.id,
      },
    ];

    for (const post of posts) {
      await prisma.post.create({ data: post });
    }

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

seed()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
