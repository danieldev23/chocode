import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  MaxLength,
  IsDateString,
  IsNumber,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @MaxLength(255)
  fullName: string;

  @IsEmail()
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  roleId: number;
}

export class UpdateUserInfoDto {
  @ApiProperty({ maxLength: 100, description: 'Họ tên người dùng' })
  @IsString()
  @MaxLength(100)
  fullName: string;

  @ApiProperty({ maxLength: 500, description: 'Giới thiệu ngắn (bio)' })
  @IsString()
  @MaxLength(500)
  bio: string;

  @ApiProperty({ maxLength: 255, description: 'Địa chỉ người dùng' })
  @IsString()
  @MaxLength(255)
  address: string;

  @ApiProperty({
    maxLength: 100,
    description: 'Nghề nghiệp hoặc vị trí công việc',
  })
  @IsString()
  @MaxLength(100)
  job: string;
}

export class CreateTransactionDto {
  @ApiProperty({ example: 'dangquochuy', description: 'Tên người dùng' })
  @IsString()
  username: string;

  @ApiProperty({ example: '2025-05-26T00:01:00Z', description: 'Ngày ghi sổ' })
  @IsDateString()
  posting_date: string;

  @ApiProperty({
    example: '2025-05-25T03:39:22Z',
    description: 'Ngày giao dịch',
  })
  @IsDateString()
  transaction_date: string;

  @ApiProperty({ example: '2000', description: 'Số tiền vào' })
  @IsNumber()
  credit_amount: string;

  @ApiProperty({ example: 0, description: 'Số tiền ra' })
  @IsNumber()
  debit_amount: string;

  @ApiProperty({ example: 'VND', description: 'Loại tiền tệ' })
  @IsString()
  currency: string;

  @ApiProperty({
    example: 'Mô tả giao dịch',
    description: 'Nội dung giao dịch',
  })
  @IsString()
  description: string;

  @ApiProperty({ example: 'FT2514447', description: 'Mã giao dịch (ref)' })
  @IsString()
  ref_no: string;

  @ApiProperty({
    example: '2025-05-26T00:02:00Z',
    description: 'Ngày tạo bản ghi',
  })
  @IsDateString()
  created: Date;
}
