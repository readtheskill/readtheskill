"use client";

import { useEffect, useState } from "react";
import { Stats } from "@/lib/types";
import { STATS_POLL_INTERVAL } from "@/lib/constants";

export function SocialStats() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/stats");
        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.error("Failed to fetch stats:", err);
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, STATS_POLL_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  const items = [
    { icon: "\uD835\uDD4F", label: "Twitter Posts", value: stats?.twitter_posts ?? 0 },
    { icon: "\uD83D\uDCD8", label: "Moltbook Posts", value: stats?.moltbook_posts ?? 0 },
    { icon: "\uD83D\uDCC1", label: "Registry Adds", value: stats?.registry_adds ?? 0 },
  ];

  return (
    <section className="py-4 px-4 border-b border-border">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-center gap-6 sm:gap-10">
          {items.map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-2 text-xs font-mono text-text-secondary"
            >
              <span className="text-sm">{item.icon}</span>
              <span className="text-text-primary font-bold">{item.value}</span>
              <span className="hidden sm:inline">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
