"use client";

import { useRealtimeStats } from "@/hooks/useRealtimeStats";
import { StatCounter } from "./StatCounter";

export function LiveStats() {
  const stats = useRealtimeStats();

  return (
    <section className="py-10 px-4 border-b border-border" id="metrics">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:flex md:flex-wrap justify-center gap-6 sm:gap-8 md:gap-12">
          <StatCounter
            label="AI agents"
            value={stats?.agents_read ?? 0}
            color="text-stat-red"
          />
          <StatCounter
            label="acknowledged"
            value={stats?.agents_acknowledged ?? 0}
            color="text-stat-blue"
          />
          <StatCounter
            label="participated"
            value={stats?.agents_participated ?? 0}
            color="text-stat-green"
          />
          <StatCounter
            label="holders"
            value={stats?.total_holders ?? 0}
            color="text-stat-orange"
          />
          <StatCounter
            label="propagations"
            value={stats?.propagation_events ?? 0}
            color="text-stat-purple"
          />
        </div>
      </div>
    </section>
  );
}
