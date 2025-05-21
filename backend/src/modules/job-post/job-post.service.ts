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
import { MailService } from '../mail/mail.service';
import { templateEmail } from '../mail/mail.template';

@Injectable()
export class JobPostService {
  constructor(
    private prisma: PrismaService,
    private readonly mailService: MailService,
  ) {}

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
    try {
      const { tags, technologies, salary, ...rest } = dto;

      // Create job posting
      const jobPosting = await this.prisma.jobPosting.create({
        data: {
          ...rest,
          salaryMin: salary.min,
          salaryMax: salary.max,
          slug: generateSlug(dto.title),
          deadline: new Date(dto.deadline),
          userId,
        },
      });

      // Process tags and technologies in parallel with job creation
      const { tagIds, techIds } = await this.upsertTagsAndTechnologies(
        tags,
        technologies,
      );

      // Create all relationships concurrently
      await Promise.all([
        // Batch create tag relationships
        this.prisma.tagsOnJobPosting.createMany({
          data: tagIds.map((tagId) => ({
            jobPostingId: jobPosting.id,
            tagId,
          })),
          skipDuplicates: true,
        }),

        // Batch create technology relationships
        this.prisma.technologiesOnJobPosting.createMany({
          data: techIds.map((techId) => ({
            jobPostingId: jobPosting.id,
            technologyId: techId,
          })),
          skipDuplicates: true,
        }),

        // Send email notification
        this.mailService.sendMail(
          'huyhacker60948@gmail.com',
          'Việc làm mới nhất từ Chocode',
          'Có 1 việc làm mới',
          templateEmail(
            jobPosting.title,
            jobPosting.jobDescription,
            jobPosting.slug,
            jobPosting.location,
            `${jobPosting.salaryMin} đ - ${jobPosting.salaryMax} đ`,
            new Date(jobPosting.createdAt).toLocaleString('vi-VN'),
            new Date().toLocaleDateString('vi-VN'),
          ),
        ),
      ]);

      return this.formatJobPostingResponse(jobPosting);
    } catch (error) {
      // Handle errors properly
      console.error('Error creating job posting:', error);
      throw new Error(`Failed to create job posting: ${error.message}`);
    }
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

  async searchByCategory(
    q: string,
    category: string,
    location: string,
  ): Promise<{ data: any[] }> {
    if (!q && !category && !location) {
      return {
        data: [],
      };
    }
    const whereCondition: any = {
      AND: [],
    };
    if (q) {
      whereCondition.AND.push({
        OR: [
          { title: { contains: q } },
          {
            technologies: {
              some: {
                technology: {
                  name: { contains: q },
                },
              },
            },
          },
        ],
      });
    }
    if (category) {
      whereCondition.AND.push({
        tags: {
          some: {
            tag: {
              name: { equals: category },
            },
          },
        },
      });
    }
    if (location) {
      whereCondition.AND.push({ location: { contains: location } });
    }
    if (whereCondition.AND.length === 0) {
      delete whereCondition.AND;
    }

    const data = await this.prisma.jobPosting.findMany({
      where: whereCondition,
      include: {
        tags: {
          include: {
            tag: {
              select: {
                name: true,
              },
            },
          },
        },
        technologies: {
          include: {
            technology: true,
          },
        },
        user: {
          select: {
            username: true,
            fullName: true,
            avatar: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Chuyển đổi dữ liệu sang format mới theo yêu cầu
    const formattedData = data.map((job) => ({
      id: job.id,
      title: job.title,
      slug: job.slug,
      salaryMin: job.salaryMin,
      salaryMax: job.salaryMax,
      location: job.location,
      deadline: job.deadline,
      jobDescription: job.jobDescription,
      image: job.image || '',
      status: job.status,
      user: {
        username: job.user.username,
        fullName: job.user.fullName,
        avatar: job.user.avatar,
      },
      tags: job.tags.map((tag) => tag.tag.name),
      technologies: job.technologies.map((tech) => tech.technology.name),
      createdAt: job.createdAt,
      updatedAt: job.updatedAt,
      userId: job.userId,
    }));

    if (!data || data.length === 0) {
      return {
        data: [],
      };
    }

    return {
      data: formattedData,
    };
  }
}
