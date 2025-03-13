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
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local', '.env.development'],
      ignoreEnvFile: true,
      isGlobal: true,
    }),
    UserModule,
    PrismaModule,
    AuthModule,
    PostModule,
    CommentModule,
    CategoryModule,
    UploadModule,
  ],
  controllers: [AppController],
  providers: [AppService, CategoryService],
})
export class AppModule {}
