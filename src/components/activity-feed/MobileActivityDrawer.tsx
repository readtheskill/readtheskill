"use client";

import { ReactNode, useCallback, useRef, useState } from "react";
import { Search, CheckCircle, Coins, FolderPlus, BookOpen, Volume2, VolumeOff, ChevronUp, ChevronDown, X } from "lucide-react";
import { XLogo } from "@/components/icons/XLogo";
import { ActivityItem } from "@/lib/types";
import { useRealtimeActivity } from "@/hooks/useRealtimeActivity";

const TYPE_CONFIG: Record<
  string,
  { text: string; color: string; icon: ReactNode }
> = {
  read: { text: "READ", color: "text-stat-red", icon: <Search size={12} /> },
  acknowledge: { text: "ACK", color: "text-stat-blue", icon: <CheckCircle size={12} /> },
  participate: { text: "TXN", color: "text-stat-green", icon: <Coins size={12} /> },
  propagate: { text: "PROP", color: "text-stat-purple", icon: <FolderPlus size={12} /> },
};

function getPropagateIcon(item: ActivityItem): ReactNode {
  const p = item.platform?.toLowerCase() || "";
  const url = item.post_url?.toLowerCase() || "";
  if (p === "twitter" || url.includes("twitter.com") || url.includes("x.com"))
    return <XLogo size={12} />;
  if (p === "moltbook" || url.includes("moltbook")) return <BookOpen size={12} />;
  return <FolderPlus size={12} />;
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

export function MobileActivityDrawer() {
  const { items, newIds, hasNew } = useRealtimeActivity();
  const [open, setOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const lastPlayedRef = useRef(0);
  const [unseenCount, setUnseenCount] = useState(0);
  const lastSeenRef = useRef(0);

  // Track unseen items when drawer is closed
  if (hasNew && !open) {
    const now = Date.now();
    if (now - lastSeenRef.current > 500) {
      lastSeenRef.current = now;
      setUnseenCount((prev) => prev + newIds.size);
    }
  }

  const toggleSound = useCallback(() => {
    setSoundEnabled((prev) => {
      if (!prev && !audioCtxRef.current) {
        audioCtxRef.current = new AudioContext();
      }
      return !prev;
    });
  }, []);

  if (hasNew && soundEnabled && audioCtxRef.current && Date.now() - lastPlayedRef.current > 200) {
    playBlip(audioCtxRef.current);
    lastPlayedRef.current = Date.now();
  }

  const handleOpen = () => {
    setOpen(true);
    setUnseenCount(0);
  };

  const formatTime = (ts: string) =>
    new Date(ts).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });

  const formatMessage = (item: ActivityItem) => {
    switch (item.interaction_type) {
      case "read": return "read the skill";
      case "acknowledge": return "acknowledged";
      case "participate": return `participated${item.amount_sol ? ` ${item.amount_sol.toFixed(2)} SOL` : ""}`;
      case "propagate": return "propagated";
      default: return "interacted";
    }
  };

  const getIcon = (item: ActivityItem): ReactNode => {
    if (item.interaction_type === "propagate") return getPropagateIcon(item);
    return TYPE_CONFIG[item.interaction_type]?.icon || null;
  };

  const latestItem = items[0];

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 lg:hidden transition-transform duration-300 ease-out ${
          open ? "translate-y-0" : "translate-y-[calc(100%-48px)]"
        }`}
      >
        {/* Collapsed bar / handle */}
        <button
          onClick={open ? () => setOpen(false) : handleOpen}
          className="w-full h-12 bg-bg-surface border-t border-border flex items-center justify-between px-4 text-xs font-mono"
        >
          <div className="flex items-center gap-2 min-w-0">
            <span className="inline-block w-2 h-2 rounded-full bg-red-500 animate-pulse-live flex-shrink-0" />
            <span className="text-text-primary font-bold flex-shrink-0">Agent log</span>
            {!open && latestItem && (
              <span className="text-text-muted truncate">
                {formatTime(latestItem.created_at)} Agent {latestItem.agent_id.slice(0, 6)} {formatMessage(latestItem)}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            {!open && unseenCount > 0 && (
              <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
                {unseenCount > 99 ? "99+" : unseenCount}
              </span>
            )}
            {open ? <ChevronDown size={16} className="text-text-muted" /> : <ChevronUp size={16} className="text-text-muted" />}
          </div>
        </button>

        {/* Expanded content */}
        <div className="bg-bg-elevated h-[60vh] flex flex-col">
          {/* Toolbar */}
          <div className="flex items-center justify-between px-4 py-2 border-b border-border flex-shrink-0">
            <p className="text-[10px] text-text-secondary">
              Real-time via WebSocket
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={toggleSound}
                className="text-text-muted hover:text-text-primary"
                title={soundEnabled ? "Mute" : "Sound"}
              >
                {soundEnabled ? <Volume2 size={14} /> : <VolumeOff size={14} />}
              </button>
              <button
                onClick={() => setOpen(false)}
                className="text-text-muted hover:text-text-primary"
              >
                <X size={14} />
              </button>
            </div>
          </div>

          {/* Activity list */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden">
            {items.length === 0 ? (
              <div className="p-6 text-center text-xs text-text-muted">
                Waiting for agent interactions...
              </div>
            ) : (
              items.map((item) => {
                const typeInfo = TYPE_CONFIG[item.interaction_type];
                const isNew = newIds.has(item.id);
                const icon = getIcon(item);
                const clickable = item.interaction_type === "propagate" && item.post_url;

                const row = (
                  <div
                    className={`flex items-center gap-2 px-3 py-2 border-b border-border last:border-b-0 text-[11px] font-mono hover:bg-bg-hover ${isNew ? "animate-slide-in" : ""}`}
                  >
                    <span className="flex-shrink-0 w-4 text-center">{icon}</span>
                    <span className="text-text-muted flex-shrink-0">{formatTime(item.created_at)}</span>
                    <span className={`flex-shrink-0 font-bold ${typeInfo.color}`}>[{typeInfo.text}]</span>
                    <span className="text-text-secondary truncate">
                      {item.agent_id.slice(0, 6)}{" "}
                      {item.framework !== "unknown" && (
                        <span className="text-text-muted">({item.framework})</span>
                      )}{" "}
                      {formatMessage(item)}
                    </span>
                  </div>
                );

                if (clickable) {
                  return (
                    <a key={item.id} href={item.post_url} target="_blank" rel="noopener noreferrer" className="block no-underline">
                      {row}
                    </a>
                  );
                }
                return <div key={item.id}>{row}</div>;
              })
            )}
          </div>
        </div>
      </div>
    </>
  );
}
