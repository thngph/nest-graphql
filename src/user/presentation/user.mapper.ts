import { User } from '../domain/user.entity';
import { UserOutput } from './dto/user.output';

export function toUserOutput(user: User): UserOutput {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
}
