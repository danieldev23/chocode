import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import {
  CreateJobPostingDto,
  UpdateJobPostingDto,
  JobPostingResponseDto,
  PaginationQueryDto,
} from './dto/job-post.dto';
import { JobPostingStatus } from './dto/job-post.dto';
import { generateSlug } from 'src/utils/gen-slug.utils';

@Injectable()
export class JobPostService {
  constructor(private prisma: PrismaService) {}

  private async upsertTagsAndTechnologies(
    tags: string[],
    technologies: string[],
  ) {
    // Process tags
    const tagEntities = await Promise.all(
      tags.map((tagName) =>
        this.prisma.tag.upsert({
          where: { name: tagName },
          update: {},
          create: { name: tagName },
        }),
      ),
    );

    // Process technologies
    const techEntities = await Promise.all(
      technologies.map((techName) =>
        this.prisma.technology.upsert({
          where: { name: techName },
          update: {},
          create: { name: techName },
        }),
      ),
    );

    return {
      tagIds: tagEntities.map((tag) => tag.id),
      techIds: techEntities.map((tech) => tech.id),
    };
  }

  private async formatJobPostingResponse(
    jobPosting: any,
    includeTags = true,
    includeTechnologies = true,
  ): Promise<JobPostingResponseDto> {
    let tags = [];
    let technologies = [];

    if (includeTags) {
      const tagRelations = await this.prisma.tagsOnJobPosting.findMany({
        where: { jobPostingId: jobPosting.id },
        include: { tag: true },
      });
      tags = tagRelations.map((rel) => rel.tag.name);
    }

    if (includeTechnologies) {
      const techRelations = await this.prisma.technologiesOnJobPosting.findMany(
        {
          where: { jobPostingId: jobPosting.id },
          include: { technology: true },
        },
      );
      technologies = techRelations.map((rel) => rel.technology.name);
    }

    return {
      ...jobPosting,
      tags,
      technologies,
    };
  }

  async create(
    dto: CreateJobPostingDto,
    userId: number,
  ): Promise<JobPostingResponseDto> {
    const { tags, technologies, salary, ...rest } = dto;

    // Create job posting
    const jobPosting = await this.prisma.jobPosting.create({
      data: {
        ...rest,
        salaryMin: salary.min,
        salaryMax: salary.max,
        slug: `${generateSlug(dto.title)}`,
        deadline: new Date(dto.deadline),
        userId,
      },
    });

    // Process tags and technologies
    const { tagIds, techIds } = await this.upsertTagsAndTechnologies(
      tags,
      technologies,
    );

    // Create relationships
    await Promise.all([
      // Create tag relationships
      ...tagIds.map((tagId) =>
        this.prisma.tagsOnJobPosting.create({
          data: {
            jobPostingId: jobPosting.id,
            tagId,
          },
        }),
      ),
      // Create technology relationships
      ...techIds.map((techId) =>
        this.prisma.technologiesOnJobPosting.create({
          data: {
            jobPostingId: jobPosting.id,
            technologyId: techId,
          },
        }),
      ),
    ]);

    return this.formatJobPostingResponse(jobPosting);
  }

  async findAll(
    query: PaginationQueryDto,
  ): Promise<{ data: JobPostingResponseDto[] }> {
    const limit = Math.max(1, Number(query.limit) || 10);
    const page = Math.max(1, Number(query.page) || 1);
    const skip = (page - 1) * limit;

    const [jobPostings] = await Promise.all([
      this.prisma.jobPosting.findMany({
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          user: {
            select: {
              username: true,
              fullName: true,
              avatar: true,
            },
          },
        },
      }),
    ]);

    const formattedPostings = await Promise.all(
      jobPostings.map((posting) => this.formatJobPostingResponse(posting)),
    );

    return {
      data: formattedPostings,
    };
  }

  async findOne(id: number): Promise<JobPostingResponseDto> {
    const jobPosting = await this.prisma.jobPosting.findUnique({
      where: { id },
    });

    if (!jobPosting) {
      throw new NotFoundException(`Job posting with ID ${id} not found`);
    }

    return this.formatJobPostingResponse(jobPosting);
  }

  async getJobDetail(slug: string): Promise<JobPostingResponseDto> {
    const jobPosting = await this.prisma.jobPosting.findFirst({
      where: { slug },
      include: {
        user: {
          select: {
            fullName: true,
            username: true,
            avatar: true,
          },
        },
      },
    });

    if (!jobPosting) {
      throw new NotFoundException(`Job posting with ID ${slug} not found`);
    }

    return this.formatJobPostingResponse(jobPosting);
  }
  async update(
    id: number,
    dto: UpdateJobPostingDto,
    userId: number,
  ): Promise<JobPostingResponseDto> {
    // Check if job posting exists and belongs to the user
    const existingPosting = await this.prisma.jobPosting.findFirst({
      where: { id, userId },
    });

    if (!existingPosting) {
      throw new NotFoundException(
        `Job posting with ID ${id} not found or you don't have permission to edit it`,
      );
    }

    const { tags, technologies, salary, ...rest } = dto;

    // Prepare update data
    const updateData: any = { ...rest };

    // Handle salary if provided
    if (salary) {
      updateData.salaryMin = salary.min;
      updateData.salaryMax = salary.max;
    }

    // Handle deadline if provided
    if (dto.deadline) {
      updateData.deadline = new Date(dto.deadline);
    }

    // Update job posting
    const updatedPosting = await this.prisma.jobPosting.update({
      where: { id },
      data: updateData,
    });

    // Handle tags and technologies if provided
    if (tags || technologies) {
      const { tagIds, techIds } = await this.upsertTagsAndTechnologies(
        tags || [],
        technologies || [],
      );

      // Update tags if provided
      if (tags) {
        // Delete existing tag relationships
        await this.prisma.tagsOnJobPosting.deleteMany({
          where: { jobPostingId: id },
        });

        // Create new tag relationships
        await Promise.all(
          tagIds.map((tagId) =>
            this.prisma.tagsOnJobPosting.create({
              data: {
                jobPostingId: id,
                tagId,
              },
            }),
          ),
        );
      }

      // Update technologies if provided
      if (technologies) {
        // Delete existing technology relationships
        await this.prisma.technologiesOnJobPosting.deleteMany({
          where: { jobPostingId: id },
        });

        // Create new technology relationships
        await Promise.all(
          techIds.map((techId) =>
            this.prisma.technologiesOnJobPosting.create({
              data: {
                jobPostingId: id,
                technologyId: techId,
              },
            }),
          ),
        );
      }
    }

    return this.formatJobPostingResponse(updatedPosting);
  }

  async remove(id: number, userId: number): Promise<void> {
    // Check if job posting exists and belongs to the user
    const existingPosting = await this.prisma.jobPosting.findFirst({
      where: { id, userId },
    });

    if (!existingPosting) {
      throw new NotFoundException(
        `Job posting with ID ${id} not found or you don't have permission to delete it`,
      );
    }

    // Prisma will cascade delete the related records thanks to the onDelete: Cascade config
    await this.prisma.jobPosting.delete({
      where: { id },
    });
  }

  async updateStatus(
    id: number,
    status: JobPostingStatus,
    userId: number,
  ): Promise<JobPostingResponseDto> {
    // Check if job posting exists and belongs to the user
    const existingPosting = await this.prisma.jobPosting.findFirst({
      where: { id, userId },
    });

    if (!existingPosting) {
      throw new NotFoundException(
        `Job posting with ID ${id} not found or you don't have permission to update it`,
      );
    }

    const updatedPosting = await this.prisma.jobPosting.update({
      where: { id },
      data: { status },
    });

    return this.formatJobPostingResponse(updatedPosting);
  }

  async findByUser(
    userId: number,
    query: PaginationQueryDto,
  ): Promise<{ data: JobPostingResponseDto[]; total: number }> {
    const { page = 0, limit = 10 } = query;
    const skip = page * limit;

    const [total, jobPostings] = await Promise.all([
      this.prisma.jobPosting.count({
        where: { userId },
      }),
      this.prisma.jobPosting.findMany({
        where: { userId },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    const formattedPostings = await Promise.all(
      jobPostings.map((posting) => this.formatJobPostingResponse(posting)),
    );

    return {
      data: formattedPostings,
      total,
    };
  }
}
