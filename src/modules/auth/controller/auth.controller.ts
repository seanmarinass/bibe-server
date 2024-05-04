import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { GoogleOauthGuard } from '../guards/google-oauth.guard';

@Controller('auth')
export class AuthController {
  constructor() {}

  @Get('google/login')
  @UseGuards(GoogleOauthGuard)
  googleLogin() {
    return { msg: 'Google Authentication' };
  }

  @Get('google/redirect')
  @UseGuards(GoogleOauthGuard)
  googleRedirect() {
    return { message: 'Redirect' };
  }

  @Get('status')
  user(@Req() request: Request) {
    if (request.user) {
      return { msg: 'Authenticated' };
    } else {
      return { msg: 'Not Authenticate' };
    }
  }
}
