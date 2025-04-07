import { Field, ObjectType } from '@nestjs/graphql';
import { PostOutput } from 'src/post/presentation/dto/post.output';

@ObjectType()
export class UserOutput {
  @Field()
  id: number;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field(() => [PostOutput], { nullable: true })
  posts?: PostOutput[];
}
