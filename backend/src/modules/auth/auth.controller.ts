import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginRequest } from './request/login.request';
import { ApiOkResponse } from '@nestjs/swagger';
import { AuthLoginResponse } from './response/auth.login-response';
import { AuthRegisterRequest } from './request/create.request';
import { AuthRegisterResponse } from './response/auth.register-response';

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
}
