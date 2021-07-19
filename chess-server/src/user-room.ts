import { ExtWebSocket } from "./server";

export class UserRoom {
  constructor(
    private readonly firstPlayer: ExtWebSocket,
    private readonly secondPlayer: ExtWebSocket
    ) {
      this.firstPlayer.isHavePair = true;
      this.secondPlayer.isHavePair = true;
      this.initListner();
  }

  private initListner() {
    this.firstPlayer.on('message', (message: string) => {
      console.log('new message');
      this.secondPlayer.send(message);
    });

    this.secondPlayer.on('message', (message: string) => {
      this.firstPlayer.send(message);
    });

    this.firstPlayer.on('close', () => {
      this.secondPlayer.send('disconnected');
    });

    this.secondPlayer.on('close', () => {
      this.firstPlayer.send('disconnected');
    });
  }
}