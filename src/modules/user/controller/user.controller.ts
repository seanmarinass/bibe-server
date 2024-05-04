import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Logger,
  Post,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { SignUpUserApiDto } from './dto/api.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiTags('user')
export class UserController {
  private logger = new Logger('User Controller');
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  @ApiBody({ type: SignUpUserApiDto })
  @HttpCode(HttpStatus.CREATED)
  async signUp(@Body() userData: SignUpUserApiDto): Promise<string> {
    try {
      this.logger.log(`Signing up...`);
      return await this.userService.createUser(userData);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
