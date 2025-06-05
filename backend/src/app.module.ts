import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { PostModule } from './modules/post/post.module';
import { CommentModule } from './modules/comment/comment.module';
import { CategoryService } from './modules/category/category.service';
import { CategoryModule } from './modules/category/category.module';
import { UploadModule } from './modules/upload/upload.module';
import { JobPostModule } from './modules/job-post/job-post.module';
import { MailModule } from './modules/mail/mail.module';
import { ScheduleModule } from '@nestjs/schedule';
import { UserService } from './modules/user/user.service';
import { AdminModule } from './modules/admin/admin.module';
import { NotificationGateway } from './gateways/notification.gateway';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local', '.env.development', '.env'],
      ignoreEnvFile: true,
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    UserModule,
    PrismaModule,
    AuthModule,
    PostModule,
    CommentModule,
    CategoryModule,
    UploadModule,
    JobPostModule,
    MailModule,
    AdminModule,
  ],
  controllers: [AppController],
  providers: [AppService, CategoryService, UserService, NotificationGateway],
})
export class AppModule {}
