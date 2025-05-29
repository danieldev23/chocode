import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateNotificationDto } from './dto/create.dto';
import { Prisma } from '@prisma/client';
import { NotificationGateway } from 'src/gateways/notification.gateway';

@Injectable()
export class AdminService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly notificationGateway: NotificationGateway,
  ) {}

  async createNotification(createNotificationDto: CreateNotificationDto) {
    const notification =  this.prismaService.notification.create({
      data: createNotificationDto,
    });
    if (notification) {
      console.log(notification);
      this.notificationGateway.emitNotification(notification);
      return 'Tạo thông báo thành công!';
    }
    return 'Tạo thông báo không thành công!';
  }
}
