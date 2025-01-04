import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentCreateRequest } from './request/create-comment.request';
import { CommentUpdateRequest } from './request/update-comment.request';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { CommentCreateResponse } from './response/create-comment.response';
import { CommentUpdateResponse } from './response/update-comment.response';
import { CommentAllResponse } from './response/all-comment.response';
import { CommentDeleteRequest } from './request/delete-comment.request';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  @ApiOkResponse({ type: CommentCreateResponse })
  create(@Body() commentCreateRequest: CommentCreateRequest) {
    return this.commentService.create(commentCreateRequest);
  }
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get()
  findAll() {
    return this.commentService.findAll();
  }
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: CommentAllResponse })
  @Get('post/:id')
  findOne(@Param('id') id: string) {
    return this.commentService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: CommentUpdateResponse })
  @Patch('update')
  update(@Body() CommentUpdateRequest: CommentUpdateRequest) {
    return this.commentService.update(CommentUpdateRequest);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete('delete')
  delete(@Body() commentDeleteRequest: CommentDeleteRequest) {
    return this.commentService.delete(commentDeleteRequest);
  }
}

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiaHV5QGdtYWlsLmNvbSIsImlhdCI6MTczNTMyMDMyOSwiZXhwIjoxNzM3OTEyMzI5fQ.VGb_P0QqFRQo2EWTd7s1Tp_qi2XRScmC_fi6vYdl-sU

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImVtYWlsIjoiaHV5ZGV2QGdtYWlsLmNvbSIsImlhdCI6MTczNTMyMDM2NiwiZXhwIjoxNzM3OTEyMzY2fQ.QrzxB03aGCmS8cZ04eElOvf5p12S3qZ05GIEr3sesJ4
