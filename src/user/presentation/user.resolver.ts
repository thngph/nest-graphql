import { UseGuards } from '@nestjs/common';
import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/presentation/auth.guard';
import { PostService } from 'src/post/application/post.service';
import { PostOutput } from 'src/post/presentation/dto/post.output';
import { toPostOutput } from 'src/post/presentation/post.mapper';
import { UserService } from '../application/user.service';
import { UserOutput } from './dto/user.output';
import { toUserOutput } from './user.mapper';

@Resolver(() => UserOutput)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly postService: PostService,
  ) {}

  @Query(() => UserOutput, { nullable: true })
  @UseGuards(GqlAuthGuard)
  async user(@Args('id') id: number): Promise<UserOutput | null> {
    return this.userService
      .getById(id)
      .then((user) => user && toUserOutput(user));
  }

  @ResolveField(() => [PostOutput], { nullable: true })
  async posts(@Parent() user: UserOutput): Promise<PostOutput[]> {
    return this.postService
      .getAllByAuthorId(user.id)
      .then((posts) => posts.map(toPostOutput));
  }
}
