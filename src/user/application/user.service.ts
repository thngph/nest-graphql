import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from '../domain/user.entity';
import { UserRepository } from '../domain/user.repository';

@Injectable()
export class UserService {
  constructor(
    @Inject('UserRepository') private readonly userRepository: UserRepository,
  ) {}

  async createUser(data: {
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

  async getUserById(id: number): Promise<User | null> {
    return this.userRepository.findById(id);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email);
  }

  async updateUser(
    id: number,
    data: { name?: string; email?: string },
  ): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) throw new BadRequestException('User not found');

    const updatedData: Partial<Omit<User, 'password'>> = { ...user };

    return this.userRepository.update(id, updatedData);
  }

  async deleteUser(id: number): Promise<void> {
    const user = await this.userRepository.findById(id);
    if (!user) throw new BadRequestException('User not found');
    return this.userRepository.delete(id);
  }
}
