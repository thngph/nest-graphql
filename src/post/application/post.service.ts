import { Inject, Injectable } from '@nestjs/common';
import { Post } from '../domain/post.entity';
import { PostRepository } from '../domain/post.repository';

@Injectable()
export class PostService {
  constructor(
    @Inject('PostRepository') private readonly postRepository: PostRepository,
  ) {}

  async createPost(data: {
    title: string;
    content: string;
    authorId: number;
  }): Promise<Post> {
    return await this.postRepository.save(
      new Post(0, data.title, data.content, data.authorId),
    );
  }

  async getPostById(id: number): Promise<Post | null> {
    return await this.postRepository.findById(id);
  }

  async getPostsByAuthorId(authorId: number): Promise<Post[]> {
    return await this.postRepository.findByAuthorId(authorId);
  }

  async updatePost(
    id: number,
    data: { title?: string; content?: string },
  ): Promise<Post> {
    return await this.postRepository.update(id, data);
  }

  async deletePost(id: number): Promise<void> {
    return await this.postRepository.delete(id);
  }
}
