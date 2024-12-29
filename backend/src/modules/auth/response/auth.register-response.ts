import { ApiProperty } from '@nestjs/swagger';

export class AuthRegisterResponse {
  @ApiProperty({ description: 'Unique identifier of the user' })
  id: number; // Assuming id is a number type

  @ApiProperty({ description: 'Username of the user' })
  username: string;

  @ApiProperty({ description: 'Full name of the user' })
  fullName?: string; // Optional property

  @ApiProperty({ description: 'User role name' })
  role: string; // Assuming role is a string representing the role name

  @ApiProperty({ description: 'User activation status' })
  active: boolean; // Using isActive for clarity

  @ApiProperty({ description: 'User email address' })
  email: string;

  @ApiProperty({ description: 'User avatar URL (optional)' })
  avatar?: string; // Optional property

  @ApiProperty({ description: 'User bio (optional)' })
  bio?: string; // Optional property

  @ApiProperty({ description: 'Access token for authenticated user' })
  accessToken: string;

  @ApiProperty({ description: 'User creation date' })
  created_at: Date; // Assuming createdAt is a Date type

  @ApiProperty({ description: 'User update date (optional)' })
  updated_at: Date; // Optional property
}
