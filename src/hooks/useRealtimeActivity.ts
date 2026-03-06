"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ActivityItem } from "@/lib/types";
import { apiFetch } from "@/lib/api";
import { useSocket } from "./useSocket";

export function useRealtimeActivity(): {
  items: ActivityItem[];
  newIds: Set<string>;
  hasNew: boolean;
} {
  const [items, setItems] = useState<ActivityItem[]>([]);
  const [newIds, setNewIds] = useState<Set<string>>(new Set());
  const [hasNew, setHasNew] = useState(false);
  const knownIdsRef = useRef<Set<string>>(new Set());
  const isFirstFetch = useRef(true);
  const socket = useSocket();

  const fetchActivity = useCallback(async () => {
    try {
      const data = await apiFetch<ActivityItem[]>("/api/activity");

      if (!isFirstFetch.current) {
        const fresh = new Set<string>();
        let foundNew = false;
        for (const item of data) {
          if (!knownIdsRef.current.has(item.id)) {
            fresh.add(item.id);
            foundNew = true;
          }
        }
        if (foundNew) {
          setNewIds(fresh);
          setHasNew(true);
        }
      }

      isFirstFetch.current = false;
      for (const item of data) {
        knownIdsRef.current.add(item.id);
      }
      setItems(data);
    } catch (err) {
      console.error("Failed to fetch activity:", err);
    }
  }, []);

  useEffect(() => {
    fetchActivity();

    socket.on("new_activity", (item: ActivityItem) => {
      knownIdsRef.current.add(item.id);
      setNewIds(new Set([item.id]));
      setHasNew(true);
      setItems((prev) => [item, ...prev].slice(0, 100));
    });

    // Polling fallback when disconnected
    const interval = setInterval(() => {
      if (!socket.connected) fetchActivity();
    }, 10000);

    return () => {
      socket.off("new_activity");
      clearInterval(interval);
    };
  }, [socket, fetchActivity]);

  return { items, newIds, hasNew };
}
