import { Module } from '@nestjs/common';
import { JobPostService } from './job-post.service';
import { JobPostController } from './job-post.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [JobPostController],
  providers: [JobPostService],
})
export class JobPostModule {}
