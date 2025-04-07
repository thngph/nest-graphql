import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import CustomGraphQLModule from './graphql.module';
import { PostModule } from './post/post.module';
import { SharedModule } from './shared.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CustomGraphQLModule,
    DatabaseModule,
    SharedModule,

    UserModule,
    AuthModule,

    PostModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
