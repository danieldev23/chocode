import { ApiProperty } from '@nestjs/swagger';

export class PostDeleteResponse {
  @ApiProperty()
  success: boolean;
  @ApiProperty()
  message: string;
}
