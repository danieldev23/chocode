import { ApiProperty } from '@nestjs/swagger';

export class CategoryDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  slug: string;

  @ApiProperty()
  icon: string;
}

export class UserDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  fullName: string;

  @ApiProperty()
  avatar: string;

  @ApiProperty()
  username: string;
}

export class PostCreateResponseDto {
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
  topic: string;

  @ApiProperty()
  level: string;

  @ApiProperty()
  image: string;

  @ApiProperty()
  categoryId: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty({ type: CategoryDto })
  category: CategoryDto;

  @ApiProperty({ type: UserDto })
  user: UserDto;
}
