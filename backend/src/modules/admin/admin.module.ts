import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { NotificationGateway } from 'src/gateways/notification.gateway';

@Module({
  imports: [PrismaModule],
  controllers: [AdminController],
  providers: [AdminService, NotificationGateway],
})
export class AdminModule {}
