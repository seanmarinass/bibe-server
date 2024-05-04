import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { AuthService } from '../services/auth.service';
import { ValidateUserDto } from '../dtos/validate-user.dto';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly authService: AuthService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/api/auth/google/redirect',
      scope: ['email', 'profile'],
    });
  }

  private logger = new Logger('Google Strategy');

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    console.log(JSON.stringify(profile, null, 2));

    const data: ValidateUserDto = {
      avatar: profile.photos[0].value,
      email: profile.emails[0].value,
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      displayName: profile.displayName,
    };

    this.logger.debug('Validating user');
    const user = await this.authService.validateUser(data);
    this.logger.debug(`User data: ${JSON.stringify(user, null, 2)}`);

    return user || null;
  }
}
