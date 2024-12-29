import { ApiProperty } from '@nestjs/swagger';

export class AllUsersResponse {
  @ApiProperty()
  id: number;

  @ApiProperty()
  username: string;

  @ApiProperty()
  fullName: string;

  @ApiProperty()
  active: boolean;

  @ApiProperty()
  email: string;

  @ApiProperty()
  avatar?: string;
  @ApiProperty()
  bio?: string;
  @ApiProperty()
  created_at: Date;
  @ApiProperty()
  updated_at: Date;
}
