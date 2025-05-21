import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Request,
  Patch,
  Query,
} from '@nestjs/common';
import { PostService } from './post.service';
import { PostCreateRequest } from './request/create-post.request';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { PostCreateResponseDto } from './response/post-create.response';
import { PostDeleteRequest } from './request/remove-post.request';
import { PostUpdateRequest } from './request/update-post.request copy';
import { PostDeleteResponse } from './response/post-delete.response';
import { PostUpdateResponse } from './response/post-update.response';
import { PostCommentRequest } from './request/comment-post.request';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('create')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'The  post has been successfully created.',
    type: PostCreateResponseDto,
  })
  @ApiUnauthorizedResponse({ description: '401 Unauthorized' })
  create(@Body() postCreateRequest: PostCreateRequest, @Request() req: any) {
    return postCreateRequest.userId === req.user.id
      ? this.postService.create(postCreateRequest, req.user.id)
      : {
          success: false,
          message: 'You do not have permission to create a post',
        };
  }

  @Get('all')
  @ApiOkResponse({ type: [PostCreateResponseDto] })
  findAll(@Query('limit') limit: number, @Query('skip') skip: number) {
    const parsedLimit = parseInt(limit.toString() || '10', 10);
    const parsedSkip = parseInt(skip.toString() || '0', 10);
    return this.postService.findAll(parsedLimit, parsedSkip);
  }
  @Get('count')
  count() {
    return this.postService.countPost();
  }

  @Get(':slug')
  @ApiOkResponse({ type: PostCreateResponseDto })
  getPostDetail(@Param('slug') slug: string) {
    return this.postService.getPostDetail(slug);
  }

  @Get(':category')
  @ApiOkResponse({ type: [PostCreateResponseDto] })
  findWithCategory(@Param('category') category: string) {
    return this.postService.findWithCategory(category);
  }
  @Patch('update')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: PostUpdateResponse })
  @ApiBearerAuth()
  update(@Body() PostUpdateRequest: PostUpdateRequest, @Request() req: any) {
    return PostUpdateRequest.userId === req.user.id
      ? this.postService.update(PostUpdateRequest)
      : {
          success: false,
          message: 'You do not have permission to update this post',
        };
  }

  @Post('comment')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  comment(@Body() postCommentRequest: PostCommentRequest) {
    return this.postService.commentPost(postCommentRequest);
  }
  @Delete('delete')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: PostDeleteResponse })
  @ApiBearerAuth()
  remove(@Body() PostDeleteRequest: PostDeleteRequest, @Request() req: any) {
    return PostDeleteRequest.userId === req.user.id
      ? this.postService.remove(PostDeleteRequest)
      : {
          success: false,
          message: 'You do not have permission to delete this post',
        };
  }
}
