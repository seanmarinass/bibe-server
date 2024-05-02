import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private logger = new Logger('Prisma Service');

  async onModuleInit() {
    await this.$connect();
    this.logger.log(`Connected to the database`);
  }
}
