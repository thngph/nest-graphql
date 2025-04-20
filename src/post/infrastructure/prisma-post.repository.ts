import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Post } from '../domain/post.entity';
import { PostRepository } from '../domain/post.repository';

@Injectable()
export class PrismaPostRepository implements PostRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(data: Post): Promise<Post> {
    return this.prisma.post.create({
      data,
    });
  }
  async findById(id: number): Promise<Post | null> {
    return this.prisma.post.findUnique({
      where: { id },
    });
  }

  async findByAuthorId(authorId: number): Promise<Post[]> {
    return this.prisma.post.findMany({
      where: { authorId },
    });
  }

  async update(id: number, data: Partial<Post>): Promise<Post> {
    return this.prisma.post.update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.post.delete({ where: { id } });
  }
}
