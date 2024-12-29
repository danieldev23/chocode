import { ApiProperty } from '@nestjs/swagger';
export class PostCommentRequest {
  @ApiProperty()
  userId: number;

  @ApiProperty()
  postId: number;
  @ApiProperty()
  comment: string;
}
