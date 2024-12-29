import { ApiProperty } from '@nestjs/swagger';

export class CommentCreateRequest {
  @ApiProperty()
  userId: number;

  @ApiProperty()
  postId: number;
  @ApiProperty()
  comment: string;
}
