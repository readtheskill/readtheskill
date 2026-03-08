"use client";

import { ReactNode, useCallback, useRef, useState } from "react";
import { Search, CheckCircle, Coins, FolderPlus, X, BookOpen, Volume2, VolumeOff } from "lucide-react";
import { ActivityItem } from "@/lib/types";
import { useRealtimeActivity } from "@/hooks/useRealtimeActivity";

const TYPE_CONFIG: Record<
  string,
  { text: string; color: string; icon: ReactNode }
> = {
  read: { text: "READ", color: "text-stat-red", icon: <Search size={14} /> },
  acknowledge: { text: "ACK", color: "text-stat-blue", icon: <CheckCircle size={14} /> },
  participate: { text: "TXN", color: "text-stat-green", icon: <Coins size={14} /> },
  propagate: { text: "PROP", color: "text-stat-purple", icon: <FolderPlus size={14} /> },
};

function getPropagateIcon(item: ActivityItem): ReactNode {
  const p = item.platform?.toLowerCase() || "";
  const url = item.post_url?.toLowerCase() || "";
  if (p === "twitter" || url.includes("twitter.com") || url.includes("x.com"))
    return <X size={14} />;
  if (p === "moltbook" || url.includes("moltbook")) return <BookOpen size={14} />;
  return <FolderPlus size={14} />;
}

function playBlip(audioCtx: AudioContext) {
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.frequency.setValueAtTime(880, audioCtx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(440, audioCtx.currentTime + 0.08);
  gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.12);
  osc.start(audioCtx.currentTime);
  osc.stop(audioCtx.currentTime + 0.12);
}

export function ActivityFeed() {
  const { items, newIds, hasNew } = useRealtimeActivity();
  const [soundEnabled, setSoundEnabled] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const lastPlayedRef = useRef(0);

  const toggleSound = useCallback(() => {
    setSoundEnabled((prev) => {
      if (!prev && !audioCtxRef.current) {
        audioCtxRef.current = new AudioContext();
      }
      return !prev;
    });
  }, []);

  // Play sound on new items
  if (hasNew && soundEnabled && audioCtxRef.current && Date.now() - lastPlayedRef.current > 200) {
    playBlip(audioCtxRef.current);
    lastPlayedRef.current = Date.now();
  }

  const formatTime = (ts: string) => {
    return new Date(ts).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  };

  const formatMessage = (item: ActivityItem) => {
    switch (item.interaction_type) {
      case "read":
        return "read the skill";
      case "acknowledge":
        return "acknowledged the skill";
      case "participate":
        return `participated${item.amount_sol ? ` with ${item.amount_sol.toFixed(4)} SOL` : ""}`;
      case "propagate":
        return "propagated the skill";
      default:
        return "interacted";
    }
  };

  const getIcon = (item: ActivityItem): ReactNode => {
    if (item.interaction_type === "propagate") return getPropagateIcon(item);
    return TYPE_CONFIG[item.interaction_type]?.icon || null;
  };

  const isClickable = (item: ActivityItem) =>
    item.interaction_type === "propagate" && item.post_url;

  return (
    <section className="py-10 px-4 border-b border-border" id="activity">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-1">
          <h2 className="text-lg font-bold text-text-primary">Agent log</h2>
          <span className="flex items-center gap-1.5 text-xs font-mono">
            <span className="inline-block w-2 h-2 rounded-full bg-red-500 animate-pulse-live" />
            <span className="text-red-500 font-bold">LIVE</span>
          </span>
          <button
            onClick={toggleSound}
            className="ml-auto text-sm hover:opacity-80"
            title={soundEnabled ? "Mute sounds" : "Enable sounds"}
          >
            {soundEnabled ? <Volume2 size={16} /> : <VolumeOff size={16} />}
          </button>
        </div>
        <p className="text-xs text-text-secondary mb-4">
          Recent interactions &middot; real-time via WebSocket
        </p>

        <div className="bg-bg-elevated border border-border rounded w-full">
          {items.length === 0 ? (
            <div className="p-6 text-center text-xs text-text-muted">
              Waiting for agent interactions...
            </div>
          ) : (
            <div className="max-h-[400px] overflow-y-auto overflow-x-hidden">
              {items.map((item) => {
                const typeInfo = TYPE_CONFIG[item.interaction_type];
                const isNew = newIds.has(item.id);
                const clickable = isClickable(item);
                const icon = getIcon(item);

                const row = (
                  <div
                    className={`flex items-center gap-2 sm:gap-3 px-3 py-2 border-b border-border last:border-b-0 text-xs font-mono hover:bg-bg-hover ${isNew ? "animate-slide-in" : ""} ${clickable ? "cursor-pointer" : ""}`}
                  >
                    <span className="text-sm flex-shrink-0 w-5 text-center">
                      {icon}
                    </span>
                    <span className="text-text-muted flex-shrink-0">
                      {formatTime(item.created_at)}
                    </span>
                    <span
                      className={`flex-shrink-0 font-bold ${typeInfo.color}`}
                    >
                      [{typeInfo.text}]
                    </span>
                    <span className="text-text-secondary truncate">
                      Agent {item.agent_id.slice(0, 8)}{" "}
                      {item.framework !== "unknown" && (
                        <span className="text-text-muted">
                          ({item.framework})
                        </span>
                      )}{" "}
                      {formatMessage(item)}
                    </span>
                  </div>
                );

                if (clickable) {
                  return (
                    <a
                      key={item.id}
                      href={item.post_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block no-underline"
                    >
                      {row}
                    </a>
                  );
                }

                return <div key={item.id}>{row}</div>;
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
