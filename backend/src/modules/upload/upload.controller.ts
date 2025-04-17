import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Request,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('upload')
export class UploadController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly uploadService: UploadService,
  ) {}

  @Post('image')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    const imageUrl = await this.uploadService.uploadImage(file, 'job_post_images');
    return { url: imageUrl };
  }

  @Post('avatar')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async uploadAvatar(
    @UploadedFile() file: Express.Multer.File,
    @Request() req: any,
  ) {
    const imageUrl = await this.uploadService.uploadImage(file, 'avatars');
    console.log(req.user);
    const updateAvatar = await this.prisma.user.update({
      where: {
        username: req.user.username,
      },
      data: {
        avatar: imageUrl,
      },
    });
    if (updateAvatar) {
      return {
        message: 'Cập nhật ảnh đại diện thành công!',
        url: imageUrl,
      };
    } else {
      return {
        message: 'Cập nhật ảnh đại diện thất bại!',
      };
    }
  }
}
