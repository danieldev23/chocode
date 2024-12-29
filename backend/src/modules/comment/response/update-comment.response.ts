import { ApiProperty } from '@nestjs/swagger';

export class CommentUpdateResponse {
  @ApiProperty()
  success: boolean;
  @ApiProperty()
  message: string;

  @ApiProperty()
  data?: any;
}
