import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from '../application/auth.service';
import { AuthOutput } from './dto/auth.output';
import { LoginInput } from './dto/login.input';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthOutput)
  async login(@Args('input') input: LoginInput): Promise<AuthOutput> {
    return this.authService
      .validateUser(input.email, input.password)
      .then((user) => this.authService.login(user));
  }
}
