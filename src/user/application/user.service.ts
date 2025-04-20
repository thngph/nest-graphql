import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from '../domain/user.entity';
import { UserRepository } from '../domain/user.repository';

@Injectable()
export class UserService {
  constructor(
    @Inject('UserRepository') private readonly userRepository: UserRepository,
  ) {}

  async create(data: {
    name: string;
    email: string;
    password: string;
  }): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(data.email);
    if (existingUser) throw new BadRequestException('Email already exists');

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = new User(0, data.name, data.email, hashedPassword);
    return this.userRepository.save(user);
  }

  async findById(id: number): Promise<User | null> {
    return this.userRepository.findById(id);
  }

  async getById(id: number): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) throw new BadRequestException('User not found');
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email);
  }

  async update(id: number, data: { name?: string }): Promise<User> {
    const user = await this.getById(id);
    const newUser: Partial<Omit<User, 'password'>> = { ...user, ...data };

    return this.userRepository.update(id, newUser);
  }

  async deleteUser(id: number): Promise<void> {
    return this.getById(id).then(() => this.userRepository.delete(id));
  }
}
