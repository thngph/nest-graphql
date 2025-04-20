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
    return this.postService.getById(id).then((post) => toPostOutput(post));
  }

  @Query(() => [PostOutput], { nullable: true })
  @UseGuards(GqlAuthGuard)
  async posts(@Args('authorId') authorId: number): Promise<PostOutput[]> {
    return this.postService
      .getAllByAuthorId(authorId)
      .then((posts) => posts.map(toPostOutput));
  }

  @ResolveField(() => UserOutput)
  async author(@Parent() post: PostOutput): Promise<UserOutput | null> {
    return this.userService.getById(post.authorId);
  }
}
