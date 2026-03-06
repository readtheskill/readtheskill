"use client";

import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { API_URL } from "@/lib/api";

let globalSocket: Socket | null = null;

function getSocket(): Socket {
  if (!globalSocket) {
    const url = API_URL || (typeof window !== "undefined" ? window.location.origin : "");
    globalSocket = io(url, {
      transports: ["websocket", "polling"],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: Infinity,
      autoConnect: false,
    });
  }
  return globalSocket;
}

export function useSocket(): Socket {
  const socketRef = useRef<Socket | null>(null);

  if (!socketRef.current) {
    socketRef.current = getSocket();
  }

  useEffect(() => {
    const socket = socketRef.current!;
    if (!socket.connected) socket.connect();
  }, []);

  return socketRef.current;
}
