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
    this.server.emit('online-users-count', this.onlineUsers.length);
  }

  handleDisconnect(client: Socket) {
    const user = this.onlineUsers.find((u) => u.socketId === client.id);
    if (user) {
      user.lastActive = new Date();
      this.onlineUsers = this.onlineUsers.filter(
        (u) => u.socketId !== client.id,
      );
      this.server.emit('user-status-changed', {
        userId: user.userId,
        online: false,
        lastActive: user.lastActive,
      });
      this.server.emit('online-users-count', this.onlineUsers.length);
    }
  }

  @SubscribeMessage('online-user')
  handleOnlineUser(
    @MessageBody() data: { userId: string; username: string; avatar?: string },
    @ConnectedSocket() client: Socket,
  ) {
    let user = this.onlineUsers.find((u) => u.userId === data.userId);
    if (!user) {
      user = {
        userId: data.userId,
        socketId: client.id,
        username: data.username,
        avatar: data.avatar,
        lastActive: new Date(),
      };
      this.onlineUsers.push(user);
      this.server.emit('user-status-changed', {
        userId: user.userId,
        online: true,
        lastActive: user.lastActive,
      });
    } else {
      // Nếu user đã online, cập nhật socketId và lastActive
      user.socketId = client.id;
      user.lastActive = new Date();
      this.server.emit('user-status-changed', {
        userId: user.userId,
        online: true,
        lastActive: user.lastActive,
      });
    }
  }

  @SubscribeMessage('get-online-users')
  handleGetOnlineUsers() {
    // Trả về danh sách user đang online và lastActive
    return this.onlineUsers.map((u) => ({
      userId: u.userId,
      username: u.username,
      avatar: u.avatar,
      online: true,
      lastActive: u.lastActive,
    }));
  }

  @SubscribeMessage('private-message')
  handlePrivateMessage(
    @MessageBody() data: { toUserId: string; message: string },
    @ConnectedSocket() client: Socket,
  ) {
    const fromUser = this.onlineUsers.find((u) => u.socketId === client.id);
    const toUser = this.onlineUsers.find((u) => u.userId === data.toUserId);

    if (fromUser && toUser) {
      // Gửi tin nhắn đến người nhận
      this.server.to(toUser.socketId).emit('private-message', {
        fromUserId: fromUser.userId,
        fromUsername: fromUser.username,
        message: data.message,
        timestamp: new Date(),
      });
      // (Tùy chọn) Gửi lại cho người gửi để hiển thị tin nhắn của chính mình
      client.emit('private-message', {
        fromUserId: fromUser.userId,
        fromUsername: fromUser.username,
        message: data.message,
        timestamp: new Date(),
        self: true,
      });
    }
  }

  @SubscribeMessage('typing')
  handleTyping(
    @MessageBody() data: { toUserId: string; typing: boolean },
    @ConnectedSocket() client: Socket,
  ) {
    const fromUser = this.onlineUsers.find((u) => u.socketId === client.id);
    const toUser = this.onlineUsers.find((u) => u.userId === data.toUserId);
    if (fromUser && toUser) {
      this.server.to(toUser.socketId).emit('typing', {
        fromUserId: fromUser.userId,
        fromUsername: fromUser.username,
        typing: data.typing,
      });
    }
  }

  @SubscribeMessage('global-message')
  handleGlobalMessage(
    @MessageBody() data: { message: string; userId: string; username: string; avatar?: string },
    @ConnectedSocket() client: Socket,
  ) {
    const message = {
      ...data,
      timestamp: new Date(),
    }
    
    // Broadcast to all connected clients
    this.server.emit('global-message', message)
  }

  @SubscribeMessage('get-online-users-count')
  handleGetOnlineUsersCount() {
    return this.onlineUsers.length
  }
}
