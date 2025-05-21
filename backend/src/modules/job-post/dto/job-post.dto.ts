// DTOs (Data Transfer Objects)
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsOptional,
  IsArray,
  IsDateString,
  Min,
  Max,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';

// Enums
export enum JobPostingStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
}

export class CreateTagDto {
  @ApiProperty({ description: 'Tag name' })
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class CreateTechnologyDto {
  @ApiProperty({ description: 'Technology name' })
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class SalaryRangeDto {
  @ApiProperty({ description: 'Minimum salary (in VND million)', example: 40 })
  @IsNumber()
  @Min(0)
  min: number;

  @ApiProperty({ description: 'Maximum salary (in VND million)', example: 60 })
  @IsNumber()
  @Min(0)
  max: number;
}

export class UpdateSalaryRangeDto {
  @ApiPropertyOptional({
    description: 'Minimum salary (in VND million)',
    example: 40,
  })
  @IsNumber()
  @Min(0)
  @IsOptional()
  min?: number;

  @ApiPropertyOptional({
    description: 'Maximum salary (in VND million)',
    example: 60,
  })
  @IsNumber()
  @Min(0)
  @IsOptional()
  max?: number;
}

export class CreateJobPostingDto {
  @ApiProperty({
    description: 'Job title',
    example: 'Viết phần mềm quản lý khách sạn',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ type: SalaryRangeDto })
  @Type(() => SalaryRangeDto)
  salary: SalaryRangeDto;

  @ApiProperty({ description: 'Job location', example: 'Hồ Chí Minh' })
  @IsString()
  @IsNotEmpty()
  location: string;

  @ApiProperty({ description: 'Application deadline', example: '2025-03-29' })
  @IsDateString()
  deadline: string;

  @ApiProperty({
    description: 'Job description',
    example:
      '- Đánh giá và phân tích nhu cầu của khách hàng\n- Tư vấn sản phẩm',
  })
  @IsString()
  @IsNotEmpty()
  jobDescription: string;

  @ApiProperty({
    description: 'Tags/Expertise areas',
    type: [String],
    example: ['B2B', 'Xây dựng'],
  })
  @IsArray()
  @IsString({ each: true })
  tags: string[];

  @ApiProperty({
    description: 'Required technologies',
    type: [String],
    example: ['Nuxt3', 'Vue.js'],
  })
  @IsArray()
  @IsString({ each: true })
  technologies: string[];

  @ApiPropertyOptional({
    description: 'Image URL',
    example: 'https://example.com/image.jpg',
  })
  @IsString()
  @IsOptional()
  image?: string;

  @ApiPropertyOptional({
    description: 'Job posting status',
    enum: JobPostingStatus,
    default: JobPostingStatus.DRAFT,
  })
  @IsEnum(JobPostingStatus)
  @IsOptional()
  status?: JobPostingStatus = JobPostingStatus.DRAFT;
}

// Properly defined UpdateJobPostingDto (not extending CreateJobPostingDto)
export class UpdateJobPostingDto {
  @ApiPropertyOptional({
    description: 'Job title',
    example: 'Viết phần mềm quản lý khách sạn',
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({ type: UpdateSalaryRangeDto })
  @Type(() => UpdateSalaryRangeDto)
  @IsOptional()
  salary?: UpdateSalaryRangeDto;

  @ApiPropertyOptional({ description: 'Job location', example: 'Hồ Chí Minh' })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  location?: string;

  @ApiPropertyOptional({
    description: 'Application deadline',
    example: '2025-03-29',
  })
  @IsDateString()
  @IsOptional()
  deadline?: string;

  @ApiPropertyOptional({
    description: 'Job description',
    example:
      '- Đánh giá và phân tích nhu cầu của khách hàng\n- Tư vấn sản phẩm',
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  jobDescription?: string;

  @ApiPropertyOptional({
    description: 'Tags/Expertise areas',
    type: [String],
    example: ['B2B', 'Xây dựng'],
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];

  @ApiPropertyOptional({
    description: 'Required technologies',
    type: [String],
    example: ['Nuxt3', 'Vue.js'],
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  technologies?: string[];

  @ApiPropertyOptional({
    description: 'Image URL',
    example: 'https://example.com/image.jpg',
  })
  @IsString()
  @IsOptional()
  image?: string;

  @ApiPropertyOptional({
    description: 'Job posting status',
    enum: JobPostingStatus,
  })
  @IsEnum(JobPostingStatus)
  @IsOptional()
  status?: JobPostingStatus;
}

export class JobPostingResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  slug: string;

  @ApiProperty()
  salaryMin: number;

  @ApiProperty()
  salaryMax: number;

  @ApiProperty()
  location: string;

  @ApiProperty()
  deadline: Date;

  @ApiProperty()
  jobDescription: string;

  @ApiProperty()
  image?: string | null;

  @ApiProperty({ enum: JobPostingStatus })
  status: JobPostingStatus;

  @ApiProperty({ type: [String] })
  tags: string[];

  @ApiProperty({ type: [String] })
  technologies: string[];

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  userId: number | null;
}

export class PaginationQueryDto {
  @ApiPropertyOptional({ description: 'Page number (zero-based)', default: 0 })
  @IsNumber()
  @Min(0)
  @IsOptional()
  @Type(() => Number)
  page?: number = 0;

  @ApiPropertyOptional({ description: 'Items per page', default: 10 })
  @IsNumber()
  @Min(1)
  @Max(100)
  @IsOptional()
  @Type(() => Number)
  limit?: number = 10;
}
