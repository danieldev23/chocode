import { PartialType } from '@nestjs/swagger';
import { PostCreateRequest } from './create-post.dto';

export class UpdatePostDto extends PartialType(PostCreateRequest) {}
