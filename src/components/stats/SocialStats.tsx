"use client";

import { X, BookOpen, FolderPlus } from "lucide-react";
import { ReactNode } from "react";
import { useRealtimeStats } from "@/hooks/useRealtimeStats";

export function SocialStats() {
  const stats = useRealtimeStats();

  const items: { icon: ReactNode; label: string; value: number }[] = [
    { icon: <X size={14} />, label: "Twitter Posts", value: stats?.twitter_posts ?? 0 },
    { icon: <BookOpen size={14} />, label: "Moltbook Posts", value: stats?.moltbook_posts ?? 0 },
    { icon: <FolderPlus size={14} />, label: "Registry Adds", value: stats?.registry_adds ?? 0 },
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
              <span className="flex-shrink-0">{item.icon}</span>
              <span className="text-text-primary font-bold">{item.value}</span>
              <span className="hidden sm:inline">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
