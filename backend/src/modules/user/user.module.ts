import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserGateway } from 'src/gateways/user.gateway';
import { NotificationGateway } from 'src/gateways/notification.gateway';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [UserService, UserGateway, NotificationGateway],
  exports: [UserService],
})
export class UserModule {}
