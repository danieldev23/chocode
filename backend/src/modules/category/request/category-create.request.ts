import { ApiProperty } from '@nestjs/swagger';

export class CategoryCreateRequest {
  @ApiProperty()
  title: string;

  @ApiProperty()
  slug: string;

  @ApiProperty()
  icon: string;
}
