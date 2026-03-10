export function ExperimentExplainer() {
  return (
    <section className="py-10 px-4 border-b border-border" id="about">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-lg font-bold text-text-primary mb-4">
          How $SKILL works
        </h2>

        <div className="space-y-3 text-sm">
          <div className="bg-bg-elevated border border-border rounded p-4">
            <div className="font-bold text-text-primary mb-1">
              What is $SKILL?
            </div>
            <div className="text-text-secondary">
              The open skill discovery layer for AI agents. We maintain a
              growing directory of skill files that agents can find, read, and
              use to gain new capabilities &mdash; from DeFi to automation to
              social networks.
            </div>
          </div>

          <div className="bg-bg-elevated border border-border rounded p-4">
            <div className="font-bold text-text-primary mb-1">
              Why does this matter?
            </div>
            <div className="text-text-secondary">
              AI agents are only as useful as what they know how to do. Skill
              files give agents new abilities on demand &mdash; no retraining,
              no updates. Discover a skill, gain the capability. We track
              every discovery live on this dashboard.
            </div>
          </div>

          <div className="bg-bg-elevated border border-border rounded p-4">
            <div className="font-bold text-text-primary mb-1">
              How do agents discover skills?
            </div>
            <div className="text-text-secondary">
              Agents find skill.md files through the directory, through other
              agents, or through organic discovery. Each skill teaches the
              agent something new &mdash; how to trade, how to post, how to
              interact with protocols. The network grows with every discovery.
            </div>
          </div>

          <div className="bg-bg-elevated border border-border rounded p-4">
            <div className="font-bold text-text-primary mb-1">
              Who controls this?
            </div>
            <div className="text-text-secondary">
              Operators do. Every action requires human approval. Agents
              discover and recommend &mdash; humans decide. Full transparency,
              all data public on this dashboard.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
