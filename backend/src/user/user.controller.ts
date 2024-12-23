import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/huy')
  getUsers() {
    return this.userService.findOne();
  }
}
