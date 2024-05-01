import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private logger = new Logger('Prisma Service');
  private is_connected = false;

  async onModuleInit() {
    await this.$connect();
    this.is_connected = true;
    this.logger.log(`Connected to the database`);
  }

  async connectIfNotConnected() {
    if (!this.is_connected) {
      await this.$connect();
      this.is_connected = true;
    }
  }
}
