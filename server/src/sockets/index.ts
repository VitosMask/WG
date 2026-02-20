import { Server } from 'socket.io';
import { streamService } from '../services/stream.service.js';

export const registerSocketHandlers = (io: Server) => {
  io.on('connection', (socket) => {
    socket.on('messages:join', (conversationId: string) => {
      socket.join(`conversation:${conversationId}`);
    });

    socket.on('messages:send', ({ conversationId, message }) => {
      io.to(`conversation:${conversationId}`).emit('messages:new', message);
    });

    socket.on('post:liked', ({ postId, likesCount }) => {
      io.emit('post:likesUpdated', { postId, likesCount });
    });

    socket.on('stream:viewersUpdate', async ({ streamId, viewersCount }) => {
      const stream = await streamService.updateViewers(streamId, viewersCount);
      io.emit('stream:updated', stream);
    });
  });
};
