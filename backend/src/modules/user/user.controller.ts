import {
  Controller,
  Get,
  Patch,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { AllUsersResponse } from './response/get-users.response';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('all')
  @ApiOkResponse({ type: [AllUsersResponse] })
  findAll(): Promise<AllUsersResponse[]> {
    return this.userService.findAll();
  }
  @Patch('/ban/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  update(@Param('id') id: string) {
    return this.userService.banUser(id);
  }

  @Patch('/block/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  block(@Param('id') id: string) {
    return this.userService.blockUser(id);
  }

  @Patch('/unblock/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  unBlock(@Param('id') id: string) {
    return this.userService.unBlockUser(id);
  }
  @Get(':username')
  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth()
  findOne(@Param('username') username: string) {
    return this.userService.findOne(username);
  }

  @Get('ballance/:username')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  getBallance(@Param('username') username: string, @Request() req: any) {
    if (username === req.user.username) {
      return this.userService.getBallance(username);
    } else {
      return `Bạn không có quyền xem số dư của user: ${username}`;
    }
  }
}
