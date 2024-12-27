import { ApiProperty } from '@nestjs/swagger';

export class PostCreateRequest {
  @ApiProperty()
  title: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  userId: number;
}
