import { Body, Controller, Get, Post } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateNotificationDto } from './dto/create.dto';
import { ApiBody } from '@nestjs/swagger';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('create-notification')
  @ApiBody({ type: CreateNotificationDto })
  async createNotification(
    @Body() createNotificationDto: CreateNotificationDto,
  ) {
    return await this.adminService.createNotification(createNotificationDto);
  }
}
