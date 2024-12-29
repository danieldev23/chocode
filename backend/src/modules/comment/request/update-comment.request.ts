import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CommentCreateRequest } from './create-comment.request';

export class CommentUpdateRequest extends PartialType(CommentCreateRequest) {
  @ApiProperty()
  id: number;
}
