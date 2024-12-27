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
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PostCreateResponse } from './response/post-create.response';
import { RemovePostRequest } from './request/remove-post.request';
import { UpdatePostRequest } from './request/update-post.request copy';
import { PostDeleteResponse } from './response/post-delete.response';

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

  @Get()
  findAll() {
    return this.postService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(+id);
  }

  @Patch('update')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: PostCreateResponse })
  @ApiBearerAuth()
  update(@Body() updatePostRequest: UpdatePostRequest, @Request() req: any) {
    return updatePostRequest.userId === req.user.id
      ? this.postService.update(updatePostRequest)
      : {
          success: false,
          message: 'You do not have permission to update this post',
        };
  }

  @Delete('delete')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: PostDeleteResponse })
  @ApiBearerAuth()
  remove(@Body() removePostRequest: RemovePostRequest, @Request() req: any) {
    return removePostRequest.userId === req.user.id
      ? this.postService.remove(removePostRequest)
      : {
          success: false,
          message: 'You do not have permission to delete this post',
        };
  }
}

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiaHV5QGdtYWlsLmNvbSIsImlhdCI6MTczNTMyMDMyOSwiZXhwIjoxNzM3OTEyMzI5fQ.VGb_P0QqFRQo2EWTd7s1Tp_qi2XRScmC_fi6vYdl-sU

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImVtYWlsIjoiaHV5ZGV2QGdtYWlsLmNvbSIsImlhdCI6MTczNTMyMDM2NiwiZXhwIjoxNzM3OTEyMzY2fQ.QrzxB03aGCmS8cZ04eElOvf5p12S3qZ05GIEr3sesJ4
