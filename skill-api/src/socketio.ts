import { Server as SocketServer } from "socket.io";

let io: SocketServer | null = null;

export function setSocketIO(server: SocketServer): void {
  io = server;
}

export function getSocketIO(): SocketServer | null {
  return io;
}
