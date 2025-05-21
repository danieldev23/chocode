import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Patch,
  Request,
  UseGuards,
  HttpStatus,
  HttpCode,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
  ApiBody,
  ApiQuery,
  ApiOkResponse,
} from '@nestjs/swagger';
import {
  CreateJobPostingDto,
  UpdateJobPostingDto,
  JobPostingResponseDto,
  JobPostingStatus,
  PaginationQueryDto,
} from './dto/job-post.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { JobPostService } from './job-post.service';

@ApiTags('Job Posting')
@Controller('job-postings')
export class JobPostController {
  constructor(private readonly jobPostingService: JobPostService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new job posting' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The job posting has been successfully created.',
    type: JobPostingResponseDto,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid input' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  async create(
    @Body() createJobPostingDto: CreateJobPostingDto,
    @Request() req: any,
  ): Promise<JobPostingResponseDto> {
    return this.jobPostingService.create(createJobPostingDto, req.user.id);
  }

  @Get('search')
  @ApiOperation({ summary: 'Search the job by query' })
  @ApiQuery({ name: 'q', required: false, type: String })
  @ApiQuery({ name: 'category', required: false, type: String })
  @ApiQuery({ name: 'location', required: false, type: String })
  @ApiOkResponse({ type: [JobPostingResponseDto] })
  async seacrhByCategory(
    @Query('q') q: string,
    @Query('category') category: string,
    @Query('location') location: string,
  ): Promise<{ data: JobPostingResponseDto[] }> {
    return this.jobPostingService.searchByCategory(q, category, location);
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Get a job posting by Slug' })
  @ApiParam({ name: 'slug', description: 'Job posting Slug' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns the job posting',
    type: JobPostingResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Job posting not found',
  })
  async findOne(@Param('slug') slug: string): Promise<JobPostingResponseDto> {
    return this.jobPostingService.getJobDetail(slug);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a job posting' })
  @ApiParam({ name: 'id', description: 'Job posting ID' })
  @ApiBody({ type: UpdateJobPostingDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The job posting has been successfully updated.',
    type: JobPostingResponseDto,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid input' })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Job posting not found',
  })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  async update(
    @Param('id') id: string,
    @Body() updateJobPostingDto: UpdateJobPostingDto,
    @Request() req: any,
  ): Promise<JobPostingResponseDto> {
    return this.jobPostingService.update(+id, updateJobPostingDto, req.user.id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a job posting' })
  @ApiParam({ name: 'id', description: 'Job posting ID' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'The job posting has been successfully deleted',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Job posting not found',
  })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  async remove(@Param('id') id: string, @Request() req: any): Promise<void> {
    return this.jobPostingService.remove(+id, req.user.id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all job postings' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns all job postings',
    type: [JobPostingResponseDto],
  })
  async findAll(
    @Query() query: PaginationQueryDto,
  ): Promise<{ data: JobPostingResponseDto[] }> {
    return this.jobPostingService.findAll(query);
  }
  @Patch(':id/status')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update job posting status' })
  @ApiParam({ name: 'id', description: 'Job posting ID' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        status: {
          type: 'string',
          enum: Object.values(JobPostingStatus),
          example: JobPostingStatus.PUBLISHED,
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The job posting status has been successfully updated.',
    type: JobPostingResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid status',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Job posting not found',
  })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  async updateStatus(
    @Param('id') id: string,
    @Body('status') status: JobPostingStatus,
    @Request() req: any,
  ): Promise<JobPostingResponseDto> {
    return this.jobPostingService.updateStatus(+id, status, req.user.id);
  }
}
