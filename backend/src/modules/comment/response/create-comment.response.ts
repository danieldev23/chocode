import { ApiProperty } from '@nestjs/swagger';

export class CommentCreateResponse {
  @ApiProperty()
  success: boolean;
  @ApiProperty()
  message: string;

  @ApiProperty()
  data?: any;
}
