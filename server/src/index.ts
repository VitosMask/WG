import http from 'node:http';
import { Server } from 'socket.io';
import { app } from './app.js';
import { env } from './config/env.js';
import { registerSocketHandlers } from './sockets/index.js';

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: env.CLIENT_URL,
    methods: ['GET', 'POST']
  }
});

registerSocketHandlers(io);

server.listen(env.PORT, () => {
  console.log(`API listening on :${env.PORT}`);
});
