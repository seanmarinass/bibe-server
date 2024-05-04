/* eslint-disable @typescript-eslint/ban-types */
import { PassportSerializer } from '@nestjs/passport';
import { AuthService } from '../services/auth.service';
import { User } from '@prisma/client';
import { userInfo } from 'os';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly authService: AuthService) {
    super();
  }

  private logger = new Logger(`Session Serializer`);

  serializeUser(user: User, done: Function) {
    this.logger.debug(`Serialize user: ${JSON.stringify(user, null, 2)}`);
    done(null, user);
  }

  deserializeUser(payload: User, done: Function) {
    const user = this.authService.findUser(payload.id);

    this.logger.debug(`Deserialize user: ${JSON.stringify(user, null, 2)}`);
    userInfo ? done(null, user) : done(null, null);
  }
}
