import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageDto {
  @ApiProperty() messageId: string;
  @ApiProperty() message: string;
  @ApiProperty() fullName: string;
  @ApiProperty() username: string;
  @ApiProperty() avatar: string;
  @ApiProperty() userId: string;
}
