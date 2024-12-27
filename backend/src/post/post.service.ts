import { Injectable } from '@nestjs/common';
import { PostCreateRequest } from './dto/create-post.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}
  async create(postCreateRequest: PostCreateRequest) {
    const { title, content, userId } = postCreateRequest;
    const generatedSlug = title
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-zA-Z0-9-]/g, '');

    const data = await this.prisma.post.create({
      data: {
        title,
        content,
        slug: generatedSlug,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    return data;
  }

  findAll() {
    return `This action returns all post`;
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  // update(id: number, updatePostDto: UpdatePostDto) {
  //   return `This action updates a #${id} post`;
  // }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
