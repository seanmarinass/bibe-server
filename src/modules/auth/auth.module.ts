import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth.controller';
import { GoogleStrategy } from './strategies/google.strategy';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthService } from './services/auth.service';
import { SessionSerializer } from './utils/session-serializer';

@Module({
  imports: [PrismaModule],
  controllers: [AuthController],
  providers: [GoogleStrategy, AuthService, SessionSerializer],
})
export class AuthModule {}
