import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryCreateRequest } from './request/category-create.request';
import { ApiOkResponse } from '@nestjs/swagger';
import { CategoryAllResponse } from './response/category-all.response';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  create(@Body() categoryCreateRequest: CategoryCreateRequest) {
    return this.categoryService.create(categoryCreateRequest);
  }

  @Get('/all')
  @ApiOkResponse({ type: CategoryAllResponse })
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
