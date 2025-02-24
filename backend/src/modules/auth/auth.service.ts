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

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string): Promise<AuthLoginResponse> {
    const user = await this.prisma.user.findUnique({
      where: { email: email },
      include: { role: true },
    });
    if (!user) {
      throw new NotFoundException(`No user found for email: ${email}`);
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
    return {
      id: user.id,
      username: user.username,
      fullName: user.fullName,
      role: user.role,
      email: user.email,
      avatar: user.avatar,
      bio: user.bio,
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
}
