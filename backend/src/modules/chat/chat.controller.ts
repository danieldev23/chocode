import { Controller, Get, Post, Delete, Body, Query } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateMessageDto } from './dto/create.dto';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get()
  async getAllMessages() {
    try {
      console.log('Controller: Fetching all messages...');
      const messages = await this.chatService.findAll();
      console.log(`Controller: Returning ${messages.length} messages`);
      return messages; // Return array directly
    } catch (error) {
      console.error('Controller error:', error);
      return []; // Return empty array on error
    }
  }

  @Get('user')
  async getUserMessages(@Query('userId') userId: string) {
    try {
      return await this.chatService.findByUser(userId);
    } catch (error) {
      console.error('Controller error for user messages:', error);
      return [];
    }
  }

  @Post()
  async createMessage(@Body() createMessageDto: CreateMessageDto) {
    try {
      console.log('Controller: Creating message:', createMessageDto);
      const result = await this.chatService.create(createMessageDto);
      console.log('Controller: Message created successfully');
      return result;
    } catch (error) {
      console.error('Controller error creating message:', error);
      throw error;
    }
  }

  @Delete()
  async deleteMessage(@Query('messageId') messageId: string) {
    try {
      return await this.chatService.delete(messageId);
    } catch (error) {
      console.error('Controller error deleting message:', error);
      return { deleted: false };
    }
  }
}
