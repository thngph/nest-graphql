import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { GqlAuthGuard } from './auth/presentation/auth.guard';
import { getEnv } from './utils/get-env';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: getEnv('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
    }),
  ],
  providers: [GqlAuthGuard],
  exports: [JwtModule, GqlAuthGuard],
})
export class SharedModule {}
