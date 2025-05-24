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
import { Logger } from '@nestjs/common';

interface OnlineUser {
  userId: string;
  socketId: string;
  username: string;
  avatar?: string;
  lastActive: Date;
}

interface ChatMessage {
  id: string;
  text: string;
  userId: string;
  sender: string;
  avatar?: string;
  timestamp: string;
  isMember?: boolean;
}

interface TypingUser {
  userId: string;
  username: string;
  timestamp: Date;
}

@WebSocketGateway({
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true,
  },
  transports: ['websocket', 'polling'],
})
export class UserGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(UserGateway.name);
  private onlineUsers = new Map<string, OnlineUser>();
  private typingUsers = new Map<string, TypingUser>();
  private messageHistory: ChatMessage[] = [];
  // Track socket to user mapping for efficient cleanup
  private socketToUser = new Map<string, string>();

  // Cleanup typing indicators every 5 seconds
  private typingCleanupInterval = setInterval(() => {
    this.cleanupTypingUsers();
  }, 5000);

  handleConnection(client: Socket) {
    this.logger.log(`🔥 New connection: ${client.id}`);

    // Send current online count to the new client
    client.emit('onlineCount', this.onlineUsers.size);

    // Send recent message history to new client
    if (this.messageHistory.length > 0) {
      const recentMessages = this.messageHistory.slice(-50); // Last 50 messages
      client.emit('messageHistory', recentMessages);
    }
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`❌ Client disconnected: ${client.id}`);

    // Get userId from socket mapping
    const userId = this.socketToUser.get(client.id);

    if (userId) {
      const user = this.onlineUsers.get(userId);

      // Only remove user if this socket ID matches the current user's socket ID
      // This prevents removing users who have reconnected with a new socket
      if (user && user.socketId === client.id) {
        this.onlineUsers.delete(userId);
        this.logger.log(`User ${user.username} (${userId}) went offline`);

        // Remove from typing users if exists
        this.typingUsers.delete(userId);

        // Broadcast updated online count
        this.server.emit('onlineCount', this.onlineUsers.size);

        // Broadcast that user stopped typing
        this.server.emit('userStoppedTyping', { userId });
      } else if (user) {
        this.logger.log(
          `Socket ${client.id} disconnected but user ${user.username} (${userId}) is still connected with socket ${user.socketId}`,
        );
      }

      // Clean up socket mapping
      this.socketToUser.delete(client.id);
    }
  }

  @SubscribeMessage('userOnline')
  handleUserOnline(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { userId: string; username: string; avatar?: string },
  ) {
    const { userId, username, avatar } = data;

    // Check if user already exists with different socket
    const existingUser = this.onlineUsers.get(userId);
    if (existingUser && existingUser.socketId !== client.id) {
      this.logger.log(
        `User ${username} (${userId}) reconnected. Old socket: ${existingUser.socketId}, New socket: ${client.id}`,
      );

      // Clean up old socket mapping
      this.socketToUser.delete(existingUser.socketId);

      // Disconnect old socket if it still exists
      const oldSocket = this.server.sockets.sockets.get(existingUser.socketId);
      if (oldSocket) {
        oldSocket.disconnect(true);
        this.logger.log(
          `Disconnected old socket ${existingUser.socketId} for user ${username}`,
        );
      }
    }

    // Add/update user with new socket info
    const onlineUser: OnlineUser = {
      userId,
      socketId: client.id,
      username,
      avatar,
      lastActive: new Date(),
    };

    this.onlineUsers.set(userId, onlineUser);
    this.socketToUser.set(client.id, userId);

    this.logger.log(
      `✅ User ${username} (${userId}) is now online with socket ${client.id}`,
    );

    // Send confirmation to the user
    client.emit('onlineStatus', { userId, isOnline: true });

    // Broadcast updated online count to all clients
    this.server.emit('onlineCount', this.onlineUsers.size);
  }

  @SubscribeMessage('sendMessage')
  handleSendMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() messageData: ChatMessage,
  ) {
    try {
      // Validate message
      if (!messageData.text || !messageData.userId || !messageData.sender) {
        client.emit('messageError', { error: 'Invalid message data' });
        return;
      }

      // Verify user is still connected with this socket
      const user = this.onlineUsers.get(messageData.userId);
      if (!user || user.socketId !== client.id) {
        client.emit('messageError', {
          error: 'User not authenticated or connection expired',
        });
        return;
      }

      // Add timestamp if not provided
      if (!messageData.timestamp) {
        messageData.timestamp = new Date().toISOString();
      }

      // Store message in history
      this.messageHistory.push(messageData);

      // Keep only last 1000 messages in memory
      if (this.messageHistory.length > 1000) {
        this.messageHistory = this.messageHistory.slice(-1000);
      }

      this.logger.log(
        `📩 Message from ${messageData.sender}: ${messageData.text}`,
      );

      // Broadcast message to all connected clients
      this.server.emit('newMessage', messageData);

      // Send delivery confirmation to sender
      client.emit('messageDelivered', messageData.id);

      // Update user's last active time
      user.lastActive = new Date();
    } catch (error) {
      this.logger.error(`Error handling message: ${error.message}`);
      client.emit('messageError', { error: 'Failed to send message' });
    }
  }

  @SubscribeMessage('typing')
  handleTyping(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { userId: string },
  ) {
    const { userId } = data;
    const user = this.onlineUsers.get(userId);

    // Verify user is connected with this socket
    if (user && user.socketId === client.id) {
      // Add to typing users
      this.typingUsers.set(userId, {
        userId,
        username: user.username,
        timestamp: new Date(),
      });

      // Broadcast typing indicator to all other clients
      client.broadcast.emit('userTyping', {
        userId,
        username: user.username,
      });
    }
  }

  @SubscribeMessage('stopTyping')
  handleStopTyping(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { userId: string },
  ) {
    const { userId } = data;
    const user = this.onlineUsers.get(userId);

    // Verify user is connected with this socket
    if (user && user.socketId === client.id) {
      // Remove from typing users
      this.typingUsers.delete(userId);

      // Broadcast stop typing to all other clients
      client.broadcast.emit('userStoppedTyping', { userId });
    }
  }

  @SubscribeMessage('checkUserOnline')
  handleCheckUserOnline(
    @ConnectedSocket() client: Socket,
    @MessageBody() userId: string,
  ) {
    const isOnline = this.onlineUsers.has(userId);
    const user = this.onlineUsers.get(userId);

    client.emit('userOnlineStatus', {
      userId,
      isOnline,
      lastActive: user?.lastActive,
    });
  }

  @SubscribeMessage('getOnlineUsers')
  handleGetOnlineUsers(@ConnectedSocket() client: Socket) {
    const users = Array.from(this.onlineUsers.values()).map((user) => ({
      userId: user.userId,
      username: user.username,
      avatar: user.avatar,
      lastActive: user.lastActive,
    }));

    client.emit('onlineUsersList', users);
  }

  @SubscribeMessage('markMessageAsRead')
  handleMarkMessageAsRead(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { messageId: string; userId: string },
  ) {
    const { messageId, userId } = data;

    // Find the message sender and notify them
    const message = this.messageHistory.find((msg) => msg.id === messageId);
    if (message && message.userId !== userId) {
      const sender = this.onlineUsers.get(message.userId);
      if (sender) {
        // Notify sender that their message was read
        this.server.to(sender.socketId).emit('messageRead', messageId);
      }
    }
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { roomId: string; userId: string },
  ) {
    const { roomId, userId } = data;
    const user = this.onlineUsers.get(userId);

    if (user && user.socketId === client.id) {
      client.join(roomId);
      this.logger.log(`User ${user.username} joined room: ${roomId}`);

      // Notify others in the room
      client.to(roomId).emit('userJoinedRoom', {
        userId,
        username: user.username,
        roomId,
      });

      client.emit('joinedRoom', { roomId });
    }
  }

  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { roomId: string; userId: string },
  ) {
    const { roomId, userId } = data;
    const user = this.onlineUsers.get(userId);

    if (user && user.socketId === client.id) {
      client.leave(roomId);
      this.logger.log(`User ${user.username} left room: ${roomId}`);

      // Notify others in the room
      client.to(roomId).emit('userLeftRoom', {
        userId,
        username: user.username,
        roomId,
      });

      client.emit('leftRoom', { roomId });
    }
  }

  @SubscribeMessage('sendRoomMessage')
  handleSendRoomMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { roomId: string; message: ChatMessage },
  ) {
    const { roomId, message } = data;

    try {
      // Validate message
      if (!message.text || !message.userId || !message.sender) {
        client.emit('messageError', { error: 'Invalid message data' });
        return;
      }

      // Verify user is connected with this socket
      const user = this.onlineUsers.get(message.userId);
      if (!user || user.socketId !== client.id) {
        client.emit('messageError', {
          error: 'User not authenticated or connection expired',
        });
        return;
      }

      // Add timestamp if not provided
      if (!message.timestamp) {
        message.timestamp = new Date().toISOString();
      }

      // Store message in history with room info
      const roomMessage = { ...message, roomId };
      this.messageHistory.push(roomMessage);

      this.logger.log(
        `📩 Room message in ${roomId} from ${message.sender}: ${message.text}`,
      );

      // Broadcast message to all clients in the room
      this.server.to(roomId).emit('newRoomMessage', { roomId, message });

      // Send delivery confirmation to sender
      client.emit('messageDelivered', message.id);

      // Update user's last active time
      user.lastActive = new Date();
    } catch (error) {
      this.logger.error(`Error handling room message: ${error.message}`);
      client.emit('messageError', { error: 'Failed to send room message' });
    }
  }

  @SubscribeMessage('getRoomHistory')
  handleGetRoomHistory(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { roomId: string; limit?: number },
  ) {
    const { roomId, limit = 50 } = data;

    // Filter messages for specific room
    const roomMessages = this.messageHistory
      .filter((msg) => (msg as any).roomId === roomId)
      .slice(-limit);

    client.emit('roomHistory', { roomId, messages: roomMessages });
  }

  @SubscribeMessage('ping')
  handlePing(@ConnectedSocket() client: Socket) {
    client.emit('pong', { timestamp: new Date().toISOString() });
  }

  // Private helper methods
  private cleanupTypingUsers() {
    const now = new Date();
    const typingTimeout = 5000; // 5 seconds

    for (const [userId, typingUser] of this.typingUsers.entries()) {
      const timeDiff = now.getTime() - typingUser.timestamp.getTime();

      if (timeDiff > typingTimeout) {
        this.typingUsers.delete(userId);
        // Broadcast stop typing
        this.server.emit('userStoppedTyping', { userId });
      }
    }
  }

  private cleanupInactiveUsers() {
    const now = new Date();
    const inactiveTimeout = 30 * 60 * 1000; // 30 minutes

    for (const [userId, user] of this.onlineUsers.entries()) {
      const timeDiff = now.getTime() - user.lastActive.getTime();

      if (timeDiff > inactiveTimeout) {
        this.onlineUsers.delete(userId);
        this.typingUsers.delete(userId);
        this.socketToUser.delete(user.socketId);

        this.logger.log(`User ${user.username} marked as inactive and removed`);

        // Broadcast updated online count
        this.server.emit('onlineCount', this.onlineUsers.size);
      }
    }
  }

  // Broadcast system messages
  broadcastSystemMessage(
    message: string,
    type: 'info' | 'warning' | 'error' = 'info',
  ) {
    const systemMessage: ChatMessage = {
      id: `system-${Date.now()}`,
      text: message,
      userId: 'system',
      sender: 'System',
      timestamp: new Date().toISOString(),
      avatar: '/api/placeholder/32/32',
    };

    this.messageHistory.push(systemMessage);
    this.server.emit('newMessage', systemMessage);

    this.logger.log(`📢 System message broadcasted: ${message}`);
  }

  // Get server statistics
  getServerStats() {
    return {
      onlineUsers: this.onlineUsers.size,
      typingUsers: this.typingUsers.size,
      totalMessages: this.messageHistory.length,
      socketMappings: this.socketToUser.size,
      uptime: process.uptime(),
    };
  }

  // Cleanup on module destroy
  onModuleDestroy() {
    if (this.typingCleanupInterval) {
      clearInterval(this.typingCleanupInterval);
    }

    // Clear all mappings
    this.onlineUsers.clear();
    this.typingUsers.clear();
    this.socketToUser.clear();
  }
}
