import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Injectable, Logger } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { AllUsersResponse } from './response/get-users.response';
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule';
import fs from 'fs';
import axios from 'axios';

const JWT_SECRET = process.env.JWT_SECRET;

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  private startTime = Date.now();
  constructor(
    private readonly prisma: PrismaService,
    private schedulerRegistry: SchedulerRegistry,
  ) {}

  @Cron('* * * * *')
  async handleCron() {
    // this.checkTransactionHistory();
  }
  async create(createUserDto: CreateUserDto) {
    const username = Math.floor(
      Math.random() * 1_000_000_000_000_000,
    ).toString();
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const createUserDtoUpdated = {
      ...createUserDto,
      password: hashedPassword,
      username,
    };
    const rememberToken = jwt.sign({ email: createUserDto.email }, JWT_SECRET, {
      expiresIn: '7d',
    });
    const user = await this.prisma.user.create({ data: createUserDtoUpdated });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user;
    const data = { ...userWithoutPassword, rememberToken };
    return data;
  }

  async findAll(): Promise<AllUsersResponse[]> {
    return this.prisma.user.findMany({
      select: {
        id: true,
        username: true,
        fullName: true,
        active: true,
        score: true,
        level: true,
        avatar: true,
        bio: true,
        created_at: true,
        updated_at: true,
      },
    });
  }
  async findOne(username: string) {
    try {
      const data = await this.prisma.user.findFirst({
        where: {
          username: username,
        },
        select: {
          id: true,
          username: true,
          fullName: true,
          active: true,
          bio: true,
          avatar: true,
          address: true,
          job: true,
          level: true,
          score: true,
          roleId: true,
          created_at: true,
          jobPostings: true,
          posts: true,
          comments: true,
          feelings: true,
        },
      });
      return data !== null ? data : `username ${username} not found`;
    } catch (error) {
      return error;
    }
  }

  async remove(username: string) {
    try {
      const data = await this.prisma.user.delete({
        where: { username: username },
      });

      return data;
    } catch (error) {
      return error;
    }
  }

  async banUser(username: string) {
    try {
      const data = await this.prisma.user.update({
        where: {
          username: username,
        },
        data: {
          active: false,
        },
      });
      return data;
    } catch (error) {
      return error;
    }
  }

  async blockUser(username: string) {
    try {
      const blockUser = await this.prisma.user.update({
        where: { username: username },
        data: {
          block: true,
        },
      });
      return blockUser.active === true
        ? `Block người dùng ${blockUser.fullName} thành công!`
        : `Block người dùng ${blockUser.fullName} thất bại`;
    } catch (error) {
      return error;
    }
  }

  async unBlockUser(username: string) {
    try {
      const blockUser = await this.prisma.user.update({
        where: { username: username },
        data: {
          block: false,
        },
      });
      return blockUser.active === true
        ? `Mở block người dùng ${blockUser.fullName} thành công!`
        : `Mở block người dùng ${blockUser.fullName} thất bại`;
    } catch (error) {
      return error;
    }
  }
  async getRoleNameByUsername(username: string) {
    try {
      const userWithRole = await this.prisma.user.findUnique({
        where: {
          username: username,
        },
        include: {
          role: true,
        },
      });
      if (userWithRole) {
        return userWithRole.role.roleName;
      } else {
        return `User with username ${username} not found`;
      }
    } catch (error) {
      return error;
    }
  }

  async getBallance(username: string): Promise<{ balance: number }> {
    const user = await this.prisma.user.findFirst({
      where: {
        username: username,
      },
    });
    return {
      balance: user.ballance,
    };
  }

  async checkTransactionHistory() {
    const data = await axios.get(
      'http://localhost:4000/api/bank/transaction-history',
    );
    return data.data;
  }

  getUserFromAddDescription(des: string): string {
    return des.match(/\d+$/)[0];
  }
}
