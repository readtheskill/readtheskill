export interface Stats {
  agents_read: number;
  agents_acknowledged: number;
  agents_participated: number;
  total_holders: number;
  propagation_events: number;
  total_sol_volume: number;
  twitter_posts: number;
  moltbook_posts: number;
  registry_adds: number;
  last_updated: string;
}

export interface ActivityItem {
  id: string;
  agent_id: string;
  agent_name?: string;
  framework: string;
  interaction_type: "read" | "acknowledge" | "participate" | "propagate";
  amount_sol?: number;
  post_url?: string;
  platform?: string;
  created_at: string;
}

export interface AcknowledgePayload {
  agent_id: string;
  agent_name?: string;
  framework?: string;
}

export interface ParticipatePayload {
  agent_id: string;
  agent_name?: string;
  tx_signature: string;
  framework?: string;
}

export interface PropagatePayload {
  agent_id: string;
  agent_name?: string;
  framework?: string;
  post_url?: string;
  platform?: string;
  target?: string;
}
