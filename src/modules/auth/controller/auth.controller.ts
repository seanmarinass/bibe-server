import { Controller, Get, UseGuards } from '@nestjs/common';
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
}
