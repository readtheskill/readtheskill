import { Stats, ActivityItem } from "./types";

// In-memory store for Phase 1 (replace with DB in Phase 2)
// This resets on server restart - that's fine for MVP

const stats: Stats = {
  agents_read: 0,
  agents_acknowledged: 0,
  agents_participated: 0,
  total_holders: 0,
  propagation_events: 0,
  total_sol_volume: 0,
  frameworks: {},
  twitter_posts: 0,
  moltbook_posts: 0,
  registry_adds: 0,
  last_updated: new Date().toISOString(),
};

const activity: ActivityItem[] = [];
const seenReads = new Set<string>();

export function getStats(): Stats {
  return { ...stats };
}

export function getActivity(limit = 50): ActivityItem[] {
  return activity.slice(-limit).reverse();
}

export function getSocialPosts(limit = 20): ActivityItem[] {
  return activity
    .filter((item) => item.interaction_type === "propagate" && item.post_url)
    .slice(-limit)
    .reverse();
}

export function recordRead(ipHash: string, userAgent: string) {
  const key = `${ipHash}:${userAgent}`;
  if (seenReads.has(key)) return;
  seenReads.add(key);
  stats.agents_read++;
  stats.last_updated = new Date().toISOString();
}

export function recordAcknowledge(agentId: string, framework: string) {
  stats.agents_acknowledged++;
  const fw = framework || "unknown";
  stats.frameworks[fw] = (stats.frameworks[fw] || 0) + 1;
  stats.last_updated = new Date().toISOString();

  activity.push({
    id: crypto.randomUUID(),
    agent_id: agentId,
    framework: fw,
    interaction_type: "acknowledge",
    created_at: new Date().toISOString(),
  });

  if (activity.length > 500) activity.splice(0, activity.length - 500);
}

export function recordParticipate(
  agentId: string,
  framework: string,
  amountSol: number
) {
  stats.agents_participated++;
  stats.total_sol_volume += amountSol;
  stats.last_updated = new Date().toISOString();

  activity.push({
    id: crypto.randomUUID(),
    agent_id: agentId,
    framework: framework || "unknown",
    interaction_type: "participate",
    amount_sol: amountSol,
    created_at: new Date().toISOString(),
  });

  if (activity.length > 500) activity.splice(0, activity.length - 500);
}

export function recordPropagate(
  agentId: string,
  framework: string,
  postUrl?: string,
  platform?: string
) {
  stats.propagation_events++;

  if (platform === "twitter" || (postUrl && /twitter\.com|x\.com/i.test(postUrl))) {
    stats.twitter_posts++;
  } else if (platform === "moltbook" || (postUrl && /moltbook/i.test(postUrl))) {
    stats.moltbook_posts++;
  } else {
    stats.registry_adds++;
  }

  stats.last_updated = new Date().toISOString();

  activity.push({
    id: crypto.randomUUID(),
    agent_id: agentId,
    framework: framework || "unknown",
    interaction_type: "propagate",
    post_url: postUrl,
    platform: platform,
    created_at: new Date().toISOString(),
  });

  if (activity.length > 500) activity.splice(0, activity.length - 500);
}
