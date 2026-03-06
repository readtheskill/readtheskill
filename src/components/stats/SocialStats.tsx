"use client";

import { useRealtimeStats } from "@/hooks/useRealtimeStats";

export function SocialStats() {
  const stats = useRealtimeStats();

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
