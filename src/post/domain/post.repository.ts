import { Post } from './post.entity';

export interface PostRepository {
  save(post: Post): Promise<Post>;
  findById(id: number): Promise<Post | null>;
  findByAuthorId(authorId: number): Promise<Post[]>;
  update(id: number, data: Partial<Post>): Promise<Post>;
  delete(id: number): Promise<void>;
}
