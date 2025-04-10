import { Field, HideField, ObjectType } from '@nestjs/graphql';
import { UserOutput } from 'src/user/presentation/dto/user.output';

@ObjectType()
export class PostOutput {
  @Field()
  id: number;

  @Field()
  title: string;

  @Field()
  content: string;

  @HideField()
  authorId: number;

  @Field(() => UserOutput, { nullable: true })
  author?: typeof UserOutput | null;
}
