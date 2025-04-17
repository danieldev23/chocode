import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { AuthLoginRequest } from './request/login.request';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { AuthLoginResponse } from './response/auth.login-response';
import { AuthRegisterRequest } from './request/create.request';
import { AuthRegisterResponse } from './response/auth.register-response';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';

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

  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleAuth() {}

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res: Response) {
    const result = await this.authService.loginWithGoogle(req.user);
    res.cookie('access_token', result.accessToken, {
      httpOnly: false,
      secure: false,
      sameSite: 'lax',
    });
    return res.redirect(`${process.env.FRONTEND_REDIRECT_URL}/auth/callback`);
  }

  @Get('token')
  getToken(@Req() req) {
    const token = req.cookies['access_token'];
    return { accessToken: token };
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
