import { forwardRef, Module } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/presentation/auth.guard';
import { DatabaseModule } from '../database/database.module';
import { SharedModule } from '../shared.module';
import { UserModule } from '../user/user.module';
import { PostService } from './application/post.service';
import { PrismaPostRepository } from './infrastructure/prisma-post.repository';
import { PostResolver } from './presentation/post.resolver';

@Module({
  imports: [DatabaseModule, forwardRef(() => UserModule), SharedModule],
  providers: [
    PostResolver,
    PostService,
    {
      provide: 'PostRepository',
      useClass: PrismaPostRepository,
    },
    GqlAuthGuard,
  ],
  exports: [PostService],
})
export class PostModule {}
