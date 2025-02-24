import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: { origin: '*' } })
export class UserGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private onlineUsers = new Map<string, string>();
  handleConnection(client: Socket) {
    console.log(`🔥 New connection: ${client.id}`);
  }

  // Khi user gửi sự kiện `userOnline`
  @SubscribeMessage('userOnline')
  handleUserOnline(client: Socket, userId: string) {
    this.onlineUsers.set(userId, client.id); // Lưu userId với socketId
    console.log(`✅ User ${userId} is online`);

    // Gửi xác nhận lại cho chính user
    client.emit('onlineStatus', { userId, isOnline: true });
  }

  // Khi user gửi yêu cầu kiểm tra user khác có online không
  @SubscribeMessage('checkUserOnline')
  handleCheckUserOnline(client: Socket, userId: string) {
    const isOnline = this.onlineUsers.has(userId);
    client.emit('userOnlineStatus', { userId, isOnline });
  }

  // Khi user ngắt kết nối
  handleDisconnect(client: Socket) {
    for (const [userId, socketId] of this.onlineUsers.entries()) {
      if (socketId === client.id) {
        this.onlineUsers.delete(userId);
        console.log(`❌ User ${userId} is offline`);
        break;
      }
    }
  }
}
