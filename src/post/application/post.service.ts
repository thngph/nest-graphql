import { Inject, Injectable } from '@nestjs/common';
import { Post } from '../domain/post.entity';
import { PostRepository } from '../domain/post.repository';

@Injectable()
export class PostService {
  constructor(
    @Inject('PostRepository') private readonly postRepository: PostRepository,
  ) {}

  async create(data: {
    title: string;
    content: string;
    authorId: number;
  }): Promise<Post> {
    return this.postRepository.save(
      new Post(0, data.title, data.content, data.authorId),
    );
  }

  async findById(id: number): Promise<Post | null> {
    return this.postRepository.findById(id);
  }

  async getById(id: number): Promise<Post> {
    const post = await this.postRepository.findById(id);
    if (!post) throw new Error('Post not found');

    return post;
  }

  async getAllByAuthorId(authorId: number): Promise<Post[]> {
    return this.postRepository.findByAuthorId(authorId) || [];
  }

  async update(
    id: number,
    data: { title?: string; content?: string },
  ): Promise<Post> {
    return this.getById(id).then(() => this.postRepository.update(id, data));
  }

  async delete(id: number): Promise<void> {
    return this.getById(id).then(() => this.postRepository.delete(id));
  }
}
