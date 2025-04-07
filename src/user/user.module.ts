import { forwardRef, Module } from '@nestjs/common';
import { PostModule } from 'src/post/post.module';
import { SharedModule } from 'src/shared.module';
import { DatabaseModule } from '../database/database.module';
import { UserService } from './application/user.service';
import { PrismaUserRepository } from './infrastructure/prisma-user.repository';
import { UserResolver } from './presentation/user.resolver';

@Module({
  imports: [DatabaseModule, forwardRef(() => PostModule), SharedModule],
  providers: [
    UserResolver,
    UserService,
    {
      provide: 'UserRepository',
      useClass: PrismaUserRepository,
    },
  ],
  exports: [UserService],
})
export class UserModule {}
