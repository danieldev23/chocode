import { ApiProperty } from '@nestjs/swagger';
import { PostDeleteResponse } from './post-delete.response';

export class PostUpdateResponse extends PostDeleteResponse {
  @ApiProperty()
  id: number;

  @ApiProperty()
  slug: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  data: any;
}
