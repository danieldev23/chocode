import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Message extends Document {
  @Prop() messageId: string;
  @Prop() message: string;
  @Prop() timestamp: Date;
  @Prop() fullName: string;
  @Prop() username: string;
  @Prop() avatar: string;
  @Prop() userId: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
