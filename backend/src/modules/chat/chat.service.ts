import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from './chemas/message.schema';
import { CreateMessageDto } from './dto/create.dto';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Message.name) private readonly messageModel: Model<Message>,
  ) {}

  async create(createMessageDto: CreateMessageDto): Promise<Message> {
    const createdMessage = new this.messageModel({
      ...createMessageDto,
      timestamp: new Date(),
    });
    return createdMessage.save();
  }

  async findAll(): Promise<Message[]> {
    try {
      console.log('Fetching all messages from database...');
      const messages = await this.messageModel
        .find()
        .sort({ timestamp: 1 }) // Sort by timestamp ascending (oldest first)
        .limit(50) // Limit to last 50 messages
        .exec();

      console.log(`Found ${messages.length} messages in database`);
      return messages;
    } catch (error) {
      console.error('Error fetching messages:', error);
      return [];
    }
  }

  async findByUser(userId: string): Promise<Message[]> {
    try {
      return await this.messageModel
        .find({ userId })
        .sort({ timestamp: 1 })
        .limit(20)
        .exec();
    } catch (error) {
      console.error('Error fetching user messages:', error);
      return [];
    }
  }

  async delete(messageId: string): Promise<{ deleted: boolean }> {
    try {
      const result = await this.messageModel.deleteOne({ messageId }).exec();
      return { deleted: result.deletedCount > 0 };
    } catch (error) {
      console.error('Error deleting message:', error);
      return { deleted: false };
    }
  }
}
