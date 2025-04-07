import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AuthOutput {
  @Field()
  access_token: string;
}
