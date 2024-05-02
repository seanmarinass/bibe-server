import { Injectable } from '@nestjs/common';
import { ValidateUserDto } from '../dtos/validate-user.dto';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {}

  async validateUser(data: ValidateUserDto): Promise<User> {
    const { email } = data;
    const user = await this.prismaService.user.findUnique({
      where: { email: email },
    });

    // TODO: update user before returning
    if (user) return user;

    const newUser = await this.prismaService.user.create({
      data: {
        email: data.email,
        avatarUrl: data.avatar,
        firstName: data.firstName,
        lastName: data.lastName,
        displayName: data.displayName,
        bibeIds: [],
        followerIds: [],
        followingIds: [],
      },
    });

    return newUser;
  }
}
