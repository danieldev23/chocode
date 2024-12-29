import { ApiProperty } from '@nestjs/swagger';

export class GetPostRequest {
  @ApiProperty()
  id: number;
}
