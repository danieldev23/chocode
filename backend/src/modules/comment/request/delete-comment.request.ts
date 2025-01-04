import { ApiProperty } from '@nestjs/swagger';

export class CommentDeleteRequest {
  @ApiProperty()
  id: number;
  @ApiProperty()
  userId: number;
}
