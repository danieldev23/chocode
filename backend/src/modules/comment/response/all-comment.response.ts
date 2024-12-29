import { ApiProperty } from '@nestjs/swagger';
export class User {
  @ApiProperty()
  id: number;
  @ApiProperty()
  fullName: string;
  @ApiProperty()
  avatar: string;
}
export class CommentAllResponse {
  @ApiProperty()
  id: number;

  @ApiProperty()
  comment: string;

  @ApiProperty()
  user: User;
}
