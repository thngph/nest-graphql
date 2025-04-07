import { Post } from '../domain/post.entity';
import { PostOutput } from './dto/post.output';

export function toPostOutput(post: Post): PostOutput {
  return {
    id: post.id,
    title: post.title,
    content: post.content,
    authorId: post.authorId,
  };
}
