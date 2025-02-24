import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { CloudinaryConfig } from 'src/configs/cloudinary.configs';

@Module({
  providers: [UploadService, CloudinaryConfig],
  controllers: [UploadController],
  exports: [UploadService],
})
export class UploadModule {}
