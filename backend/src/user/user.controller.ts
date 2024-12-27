import { Controller, Get, Patch, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { AllUsersResponse } from './response/get-users.response';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('all')
  @ApiOkResponse({ type: AllUsersResponse })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  findAll() {
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
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }
}
