import express from 'express';
import http from 'http';
import WebSocket from 'ws';
import { getRandomColor } from './get-random-color';
import { UserRoom } from './user-room';

export interface ExtWebSocket extends WebSocket {
  isHavePair: boolean;
  isAlive: boolean;
}

const users: ExtWebSocket[] = [];

const app = express();

const server = http.createServer(app);

const webSocketServer = new WebSocket.Server({ server });

webSocketServer.on('connection', (socket: WebSocket) => {
  const extSocket = <ExtWebSocket> socket;
  extSocket.isAlive = true;
  extSocket.isHavePair = false;
  users.push(extSocket);
  for (const user of users) {
    if (!user.isHavePair && user !== extSocket) {
      extSocket.send('connected');
      user.send('connected');
      const firstPlayerColor = getRandomColor();
      const secondPlayerColor = firstPlayerColor === 'white' ? 'black' : 'white';
      extSocket.send(firstPlayerColor);
      user.send(secondPlayerColor);
      new UserRoom(extSocket, user);
      return;
    }
  }
  extSocket.send('loading');

});

server.listen(3000, () => { console.log('Server started!') });

/* class Server {
  constructor() {
    
  }
} */