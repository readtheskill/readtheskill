"use client";

import { useCallback, useEffect, useState } from "react";
import { Stats } from "@/lib/types";
import { apiFetch } from "@/lib/api";
import { useSocket } from "./useSocket";

export function useRealtimeStats(): Stats | null {
  const [stats, setStats] = useState<Stats | null>(null);
  const socket = useSocket();

  const fetchStats = useCallback(async () => {
    try {
      const data = await apiFetch<Stats>("/api/stats");
      setStats(data);
    } catch (err) {
      console.error("Failed to fetch stats:", err);
    }
  }, []);

  useEffect(() => {
    fetchStats();

    socket.on("stats_update", (data: Stats) => {
      setStats(data);
    });

    // Polling fallback when disconnected
    const interval = setInterval(() => {
      if (!socket.connected) fetchStats();
    }, 10000);

    return () => {
      socket.off("stats_update");
      clearInterval(interval);
    };
  }, [socket, fetchStats]);

  return stats;
}
