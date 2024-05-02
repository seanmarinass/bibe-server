import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth.controller';
import { GoogleStrategy } from './strategies/google.strategy';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthService } from './services/auth.service';

@Module({
  imports: [PrismaModule],
  controllers: [AuthController],
  providers: [GoogleStrategy, AuthService],
})
export class AuthModule {}
