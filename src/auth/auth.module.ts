// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { SharedModule } from '../shared.module';
import { UserModule } from '../user/user.module';
import { AuthService } from './application/auth.service';
import { AuthResolver } from './presentation/auth.resolver';

@Module({
  imports: [SharedModule, UserModule],
  providers: [AuthService, AuthResolver],
  exports: [AuthService],
})
export class AuthModule {}
