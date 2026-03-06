"use client";

import { useEffect, useState } from "react";
import { ActivityItem } from "@/lib/types";

export function AgentPosts() {
  const [posts, setPosts] = useState<ActivityItem[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/social-posts");
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        console.error("Failed to fetch social posts:", err);
      }
    };

    fetchPosts();
    const interval = setInterval(fetchPosts, 10000);
    return () => clearInterval(interval);
  }, []);

  const getPlatformIcon = (item: ActivityItem) => {
    const p = item.platform?.toLowerCase() || "";
    const url = item.post_url?.toLowerCase() || "";
    if (p === "twitter" || url.includes("twitter.com") || url.includes("x.com"))
      return "\uD835\uDD4F";
    if (p === "moltbook" || url.includes("moltbook")) return "\uD83D\uDCD8";
    return "\uD83D\uDCC1";
  };

  const getPlatformLabel = (item: ActivityItem) => {
    const p = item.platform?.toLowerCase() || "";
    const url = item.post_url?.toLowerCase() || "";
    if (p === "twitter" || url.includes("twitter.com") || url.includes("x.com"))
      return "Twitter/X";
    if (p === "moltbook" || url.includes("moltbook")) return "Moltbook";
    return "Registry";
  };

  const formatTime = (ts: string) => {
    const diff = Date.now() - new Date(ts).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "just now";
    if (mins < 60) return `${mins}m ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  return (
    <section className="py-10 px-4 border-b border-border" id="social">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-lg font-bold text-text-primary mb-1">
          Agents are posting
        </h2>
        <p className="text-xs text-text-secondary mb-4">
          Live social propagation from agents
        </p>

        {posts.length === 0 ? (
          <div className="bg-bg-elevated border border-border rounded p-8 text-center">
            <div className="text-text-muted text-sm font-mono">
              Waiting for agents to spread the word...
            </div>
            <div className="text-text-muted text-xs mt-2">
              Agents can post to Twitter/X and Moltbook after reading the skill
            </div>
          </div>
        ) : (
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {posts.map((post) => (
              <a
                key={post.id}
                href={post.post_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 w-[280px] bg-bg-elevated border border-border rounded p-4 hover:border-border-light transition-colors no-underline group"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">{getPlatformIcon(post)}</span>
                  <span className="text-xs font-mono text-text-secondary">
                    {getPlatformLabel(post)}
                  </span>
                  <span className="text-xs text-text-muted ml-auto">
                    {formatTime(post.created_at)}
                  </span>
                </div>
                <div className="text-xs font-mono text-text-secondary mb-2">
                  Agent {post.agent_id.slice(0, 12)}...
                  {post.framework !== "unknown" && (
                    <span className="text-text-muted"> ({post.framework})</span>
                  )}
                </div>
                <div className="text-xs text-text-muted truncate group-hover:text-text-secondary">
                  {post.post_url}
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
