import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Post } from '../domain/post.entity';
import { PostRepository } from '../domain/post.repository';

@Injectable()
export class PrismaPostRepository implements PostRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(data: Post): Promise<Post> {
    return await this.prisma.post.create({
      data,
    });
  }
  async findById(id: number): Promise<Post | null> {
    const post = await this.prisma.post.findUnique({
      where: { id },
    });
    if (!post) return null;
    return new Post(post.id, post.title, post.content, post.authorId);
  }

  async findByAuthorId(authorId: number): Promise<Post[]> {
    const posts = await this.prisma.post.findMany({
      where: { authorId },
    });
    return posts.map(
      (post) => new Post(post.id, post.title, post.content, post.authorId),
    );
  }

  async update(id: number, data: Partial<Post>): Promise<Post> {
    const updated = await this.prisma.post.update({
      where: { id },
      data,
    });
    return new Post(
      updated.id,
      updated.title,
      updated.content,
      updated.authorId,
    );
  }

  async delete(id: number): Promise<void> {
    await this.prisma.post.delete({ where: { id } });
  }
}
