import { ApiProperty } from '@nestjs/swagger';

export class PostDeleteRequest {
  @ApiProperty()
  id: number;

  @ApiProperty()
  userId: number;
}
