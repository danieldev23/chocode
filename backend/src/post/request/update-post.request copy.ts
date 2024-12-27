import { ApiProperty, PartialType } from '@nestjs/swagger';
import { PostCreateRequest } from './create-post.request';

export class UpdatePostRequest extends PartialType(PostCreateRequest) {
  @ApiProperty()
  id: number;
}
