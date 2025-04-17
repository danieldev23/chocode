import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional } from 'class-validator';

export class PostCreateRequest {
  @ApiProperty()
  title: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  topic: string;

  @ApiProperty()
  level: string;

  @ApiProperty()
  image?: string;

  @ApiProperty()
  @IsArray()
  @IsOptional()
  category?: string[];
}
