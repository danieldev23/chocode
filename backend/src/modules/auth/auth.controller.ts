import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginRequest } from './request/login.request';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { AuthLoginResponse } from './response/auth.login-response';
import { AuthRegisterRequest } from './request/create.request';
import { AuthRegisterResponse } from './response/auth.register-response';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  @ApiOkResponse({ type: AuthLoginResponse })
  login(@Body() { email, password }: AuthLoginRequest) {
    return this.authService.login(email, password);
  }

  @Post('register')
  @ApiOkResponse({ type: AuthRegisterResponse })
  register(@Body() createUser: AuthRegisterRequest) {
    return this.authService.create(createUser);
  }

  @Get('me')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: AuthLoginResponse })
  async getSession(@Req() req: any) {
    const user = req.user;
    return this.authService.getSession(user);
  }
}
