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
} from '@nestjs/common';
import { PostService } from './post.service';
import { PostCreateRequest } from './request/create-post.request';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { PostCreateResponse } from './response/post-create.response';
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
  @ApiOkResponse({ type: PostCreateResponse })
  @ApiBearerAuth()
  create(@Body() postCreateRequest: PostCreateRequest, @Request() req: any) {
    return postCreateRequest.userId === req.user.id
      ? this.postService.create(postCreateRequest)
      : {
          success: false,
          message: 'You do not have permission to create a post',
        };
  }

  @Get('all')
  findAll() {
    return this.postService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(+id);
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

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiaHV5QGdtYWlsLmNvbSIsImlhdCI6MTczNTMyMDMyOSwiZXhwIjoxNzM3OTEyMzI5fQ.VGb_P0QqFRQo2EWTd7s1Tp_qi2XRScmC_fi6vYdl-sU

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImVtYWlsIjoiaHV5ZGV2QGdtYWlsLmNvbSIsImlhdCI6MTczNTMyMDM2NiwiZXhwIjoxNzM3OTEyMzY2fQ.QrzxB03aGCmS8cZ04eElOvf5p12S3qZ05GIEr3sesJ4
