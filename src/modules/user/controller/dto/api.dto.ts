import { ApiProperty } from '@nestjs/swagger';

export class SignUpUserApiDto {
  @ApiProperty()
  avatarUrl: string;

  @ApiProperty()
  displayName: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;
}
