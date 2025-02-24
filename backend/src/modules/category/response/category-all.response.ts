import { ApiProperty } from '@nestjs/swagger';

export class CategoryAllResponse {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  slug: string;

  @ApiProperty()
  icon: string;
}
