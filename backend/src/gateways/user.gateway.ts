import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

interface OnlineUser {
  userId: string;
  socketId: string;
  username: string;
  avatar?: string;
  lastActive: Date;
}

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true,
  },
  transports: ['websocket', 'polling'],
})
export class UserGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private onlineUsers: OnlineUser[] = [];

  handleConnection(client: Socket) {
    console.log('🔌 New connection:', client.id);
  }

  handleDisconnect(client: Socket) {
    const user = this.onlineUsers.find((u) => u.socketId === client.id);
    if (user) {
      this.onlineUsers = this.onlineUsers.filter(
        (u) => u.socketId !== client.id,
      );
      console.log(`❌ User ${user.userId} disconnected`);
      this.server.emit('user-status-changed', {
        userId: user.userId,
        online: false,
      });
    }
  }

  @SubscribeMessage('online-user')
  handleOnlineUser(
    @MessageBody()
    data,
    @ConnectedSocket() client: Socket,
  ) {
    const exists = this.onlineUsers.find((u) => u.userId === data.userId);
    if (!exists) {
      const user: OnlineUser = {
        userId: data.userId,
        socketId: client.id,
        username: data.username,
        avatar: data.avatar,
        lastActive: new Date(),
      };
      this.onlineUsers.push(user);
      console.log(
        `✅ User ${JSON.stringify(data)} is online with socket ${client.id}`,
      );
      this.server.emit('user-status-changed', {
        userId: data.user.userId,
        username: data.user.username,
        online: true,
      });
    }
  }
}
