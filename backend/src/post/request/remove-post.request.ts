import { ApiProperty } from '@nestjs/swagger';

export class RemovePostRequest {
  @ApiProperty()
  id: number;

  @ApiProperty()
  userId: number;
}
