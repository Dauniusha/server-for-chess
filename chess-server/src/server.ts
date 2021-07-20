import express from 'express';
import http from 'http';
import WebSocket from 'ws';
import { getRandomColor } from './get-random-color';
import { UserRoom } from './user-room';

export interface ExtWebSocket extends WebSocket {
  isHavePair: boolean;
  isAlive: boolean;
}

let users: ExtWebSocket[] = [];

const app = express();

const server = http.createServer(app);

const webSocketServer = new WebSocket.Server({ server });

webSocketServer.on('connection', (socket: WebSocket) => {
  console.log(users);
  const extSocket = <ExtWebSocket> socket;
  extSocket.isAlive = true;
  extSocket.isHavePair = false;
  users.push(extSocket);
  for (const user of users) {
    if (!user.isHavePair && user !== extSocket) {
      const firstPlayerColor = getRandomColor();
      const secondPlayerColor = firstPlayerColor === 'white' ? 'black' : 'white';
      extSocket.send(firstPlayerColor);
      user.send(secondPlayerColor);
      extSocket.send('connected');
      user.send('connected');
      new UserRoom(extSocket, user);
      return;
    }
  }
  extSocket.send('loading');

  extSocket.on('close', () => {
    users = users.filter((user) => {
      return user !== extSocket;
    });
  });
});

server.listen(process.env.PORT || 3000, () => {
  if (server) {
  console.log(`Server started on port ${(<WebSocket.AddressInfo> server.address()).port}`);
}});