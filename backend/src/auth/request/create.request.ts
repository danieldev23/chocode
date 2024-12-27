import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  MaxLength,
  IsNotEmpty,
  MinLength,
  IsNumber,
} from 'class-validator';

export class AuthRegisterRequest {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  fullName: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty()
  password: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  roleId: number;
}
