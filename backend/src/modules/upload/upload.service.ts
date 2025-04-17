import { Injectable } from '@nestjs/common';
import { CloudinaryConfig } from 'src/configs/cloudinary.configs';

@Injectable()
export class UploadService {
  constructor(private readonly cloudinaryConfig: CloudinaryConfig) {}

  async uploadImage(file: Express.Multer.File, folder: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.cloudinaryConfig.instance.uploader
        .upload_stream(
          { folder, resource_type: 'auto' },
          (error, result) => {
            if (error) reject(error);
            else resolve(result.secure_url);
          },
        )
        .end(file.buffer);
    });
  }
}
