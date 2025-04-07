import { UseGuards } from '@nestjs/common';
import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/presentation/auth.guard';
import { UserService } from 'src/user/application/user.service';
import { UserOutput } from 'src/user/presentation/dto/user.output';
import { PostService } from '../application/post.service';
import { PostOutput } from './dto/post.output';
import { toPostOutput } from './post.mapper';

@Resolver(() => PostOutput)
export class PostResolver {
  constructor(
    private readonly postService: PostService,
    private readonly userService: UserService,
  ) {}

  @Query(() => PostOutput, { nullable: true })
  @UseGuards(GqlAuthGuard)
  async post(@Args('id') id: number): Promise<PostOutput | null> {
    const post = await this.postService.getPostById(id);
    if (!post) return null;
    return toPostOutput(post);
  }

  @Query(() => [PostOutput], { nullable: true })
  @UseGuards(GqlAuthGuard)
  async posts(@Args('authorId') authorId: number): Promise<PostOutput[]> {
    const posts = await this.postService.getPostsByAuthorId(authorId);
    return posts.map(toPostOutput);
  }

  @ResolveField(() => UserOutput)
  async author(@Parent() post: PostOutput): Promise<UserOutput | null> {
    const author = await this.userService.getUserById(post.authorId);
    if (!author) return null;
    return {
      id: author.id,
      name: author.name,
      email: author.email,
    };
  }
}
