import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, MaxLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @MaxLength(255)
  fullName: string;

  @IsEmail()
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  roleId: number;
}
