import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { GoogleStrategy } from './google/google.strategy';

export const jwtSecret = process.env.JWT_SECRET;
@Module({
  imports: [
    PrismaModule,
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: jwtSecret,
      signOptions: { expiresIn: 30 * 24 * 60 * 60 },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, JwtStrategy, GoogleStrategy],
})
export class AuthModule {}
