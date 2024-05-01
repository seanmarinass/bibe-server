import { ApiProperty } from '@nestjs/swagger';

export class SignUpUserApiDto {
  @ApiProperty()
  avatar: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;
}
