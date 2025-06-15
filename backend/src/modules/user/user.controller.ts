import {
  Controller,
  Get,
  Patch,
  Param,
  UseGuards,
  Request,
  Body,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { ApiBearerAuth, ApiBody, ApiOkResponse } from '@nestjs/swagger';
import { AllUsersResponse } from './response/get-users.response';
import { CreateTransactionDto, UpdateUserInfoDto } from './dto/create-user.dto';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('all')
  @ApiOkResponse({ type: [AllUsersResponse] })
  findAll(): Promise<AllUsersResponse[]> {
    return this.userService.findAll();
  }
  @Get('transaction-history')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  getTransactionHistory(@Request() req: any) {
    const username = req.user?.username;
    if (!username) throw new UnauthorizedException('User not authenticated');

    return this.userService.getTransactionHistory(username);
  }
  @Post('add-balance')
  addBalance(@Body() transactionDto: CreateTransactionDto) {
    return this.userService.checkTransactionHistoryAndAddBalanceUser(
      transactionDto,
    );
  }

  @Patch('update/info')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiBody({ type: UpdateUserInfoDto })
  updateUserInfo(@Request() req, @Body() updateUserInfoDto: UpdateUserInfoDto) {
    const username = req.user?.username;
    if (!username) throw new UnauthorizedException('User not authenticated');
    return this.userService.updateUserInfo(username, updateUserInfoDto);
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
