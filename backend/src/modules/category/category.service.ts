import { Injectable } from '@nestjs/common';
import { CategoryCreateRequest } from './request/category-create.request';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}
  create(categoryCreateRequest: CategoryCreateRequest) {
    return this.prisma.category.create({
      data: categoryCreateRequest,
    });
  }

  findAll() {
    return this.prisma.category.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
