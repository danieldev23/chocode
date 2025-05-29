// notification.gateway.ts
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class NotificationGateway {
  @WebSocketServer()
  server: Server;

  emitNotification(data: any) {
    this.server.emit('notification', data);
  }

  emitPayment(data: any) {
    console.log('Data from emit: ', data);
    this.server.emit('payment-success', data);
  }
  emitToUsers(userIds: string[], data: any) {
    userIds.forEach((userId) => {
      this.server.to(userId).emit('notification', data);
    });
  }
}
