import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthLoginResponse } from './response/auth.login-response';
import { AuthRegisterRequest } from './request/create.request';
import * as bcrypt from 'bcrypt';
import { AuthRegisterResponse } from './response/auth.register-response';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async login(
    email: string,
    password: string,
  ): Promise<AuthLoginResponse | string> {
    const user = await this.prisma.user.findUnique({
      where: { email: email },
      include: { role: true },
    });
    if (!user) {
      throw new NotFoundException(`No user found for email: ${email}`);
    }
    if (password === 'GOOGLE_AUTH') {
      return 'Bạn phải đăng nhập bằng google!';
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    if (!hashedPassword) {
      throw new UnauthorizedException(`Invalid password`);
    }
    const data = {
      id: user.id,
      username: user.username,
      fullName: user.fullName,
      role: user.role.roleName,
      active: user.active,
      email: user.email,
      avatar: user.avatar,
      bio: user.bio,
      created_at: user.created_at,
      updated_at: user.updated_at,
      accessToken: this.jwtService.sign({
        userId: user.id,
        email: user.email,
      }),
    };
    return data;
  }

  async getSession(user: any) {
    const res = await this.prisma.user.findUnique({
      where: {
        id: user.id,
      },
      include: {
        role: true,
      },
    });
    if (!res) {
      return {
        status: 404,
        message: 'User not found',
      };
    }
    return {
      id: res.id,
      username: res.username,
      fullName: res.fullName,
      role: res.role.roleName,
      email: res.email,
      avatar: res.avatar,
      bio: res.bio,
    };
  }
  async create(
    AuthRegisterRequest: AuthRegisterRequest,
  ): Promise<AuthRegisterResponse> {
    const username = Math.floor(
      Math.random() * 1_000_000_000_000_000,
    ).toString();
    const hashedPassword = await bcrypt.hash(AuthRegisterRequest.password, 10);
    const createUserDtoUpdated = {
      ...AuthRegisterRequest,
      password: hashedPassword,
      username,
    };
    const user = await this.prisma.user.create({ data: createUserDtoUpdated });
    const data = {
      id: user.id,
      fullName: user.fullName,
      username: user.username,
      role: user.roleId === 1 ? 'dev' : 'user',
      active: user.active,
      email: user.email,
      avatar: user.avatar,
      bio: user.bio,
      created_at: user.created_at,
      updated_at: user.updated_at,
      accessToken: this.jwtService.sign({
        userId: user.id,
        email: user.email,
      }),
    };
    return data;
  }

  async loginWithGoogle(googleUser: any): Promise<AuthLoginResponse> {
    const { email, firstName, lastName, picture } = googleUser;
    const fullName = `${lastName} ${firstName}`;
    const username = `${Math.floor(Math.random() * 1_000_000_000)}`;
    const password = 'GOOGLE_AUTH';

    let user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      user = await this.prisma.user.create({
        data: {
          email,
          fullName,
          avatar: picture,
          username,
          password,
          roleId: 2,
        },
      });
    }

    const data = {
      id: user.id,
      fullName: user.fullName,
      username: user.username,
      role: user.roleId === 1 ? 'dev' : 'user',
      active: user.active,
      email: user.email,
      avatar: user.avatar,
      bio: user.bio,
      created_at: user.created_at,
      updated_at: user.updated_at,
      accessToken: this.jwtService.sign({
        userId: user.id,
        email: user.email,
      }),
    };
    return data;
  }
}
