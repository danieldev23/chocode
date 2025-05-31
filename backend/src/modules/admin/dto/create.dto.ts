import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

enum NotificationType {
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error',
  SUCCESS = 'success',
}

enum TargetType {
  ALL = 'ALL',
  SPECIFIC = 'SPECIFIC',
}

export class CreateNotificationDto {
  @ApiProperty()
  @IsString()
  title: string;

  @IsString()
  @ApiProperty()
  message: string;

  @IsString()
  @ApiProperty({ example: 'INFO' })
  type: NotificationType;

  @IsString()
  @ApiProperty({ example: 'ALL' })
  target: TargetType;
}
