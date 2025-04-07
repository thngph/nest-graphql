import { User } from './user.entity';

export interface UserRepository {
  save(user: User): Promise<User>;
  findById(id: number): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  update(id: number, data: Partial<Omit<User, 'password'>>): Promise<User>;
  delete(id: number): Promise<void>;
}
