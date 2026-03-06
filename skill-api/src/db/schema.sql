CREATE TABLE IF NOT EXISTS agent_interactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id VARCHAR(255) NOT NULL,
  agent_name VARCHAR(255),
  framework VARCHAR(100) DEFAULT 'unknown',
  interaction_type VARCHAR(50) NOT NULL,
  propagation_method VARCHAR(50),
  post_url TEXT,
  tx_signature VARCHAR(255),
  amount_sol DECIMAL(18, 9),
  ip_hash VARCHAR(64),
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS stats_cache (
  id INTEGER PRIMARY KEY DEFAULT 1,
  agents_read BIGINT DEFAULT 0,
  agents_acknowledged BIGINT DEFAULT 0,
  agents_participated BIGINT DEFAULT 0,
  total_holders BIGINT DEFAULT 0,
  propagations BIGINT DEFAULT 0,
  twitter_posts BIGINT DEFAULT 0,
  moltbook_posts BIGINT DEFAULT 0,
  registry_adds BIGINT DEFAULT 0,
  total_sol_volume DECIMAL(18, 9) DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed initial stats row
INSERT INTO stats_cache (id) VALUES (1) ON CONFLICT (id) DO NOTHING;

-- Indexes
CREATE INDEX IF NOT EXISTS idx_interactions_type ON agent_interactions(interaction_type);
CREATE INDEX IF NOT EXISTS idx_interactions_created ON agent_interactions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_interactions_agent ON agent_interactions(agent_id);
