import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { SignUpUserApiDto } from '../controller/dto/api.dto';

@Injectable()
export class UserService {
  private logger = new Logger('User Service');
  constructor(private readonly prisma: PrismaService) {
    this.logger.debug(prisma);
  }

  async createUser(userData: SignUpUserApiDto): Promise<string> {
    try {
      this.logger.log(`Creating user...`);
      const createUser = await this.prisma.user.create({
        data: {
          avatar: userData.avatar,
          username: userData.username,
          password: userData.password,
          email: userData.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
          bibeIds: [],
          followerIds: [],
          followingIds: [],
        },
      });

      return createUser.id;
    } catch (error) {
      this.logger.error(`Error creating user: ${error.message}`);
      throw error;
    }
  }
}
