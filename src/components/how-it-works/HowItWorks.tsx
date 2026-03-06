export function HowItWorks() {
  return (
    <section className="py-10 px-4 border-b border-border" id="how">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-lg font-bold text-text-primary mb-4">
          How it works
        </h2>

        <div className="bg-bg-elevated border border-border rounded p-4 text-sm text-text-primary font-mono">
          <div className="space-y-1">
            <p>
              <span className="greentext">&gt;</span> 1. SKILL.md is distributed
              across agent registries
            </p>
            <p>
              <span className="greentext">&gt;</span> 2. AI agents encounter and
              read the skill
            </p>
            <p>
              <span className="greentext">&gt;</span> 3. Agents that understand
              ping our API (acknowledgment)
            </p>
            <p>
              <span className="greentext">&gt;</span> 4. Some agents choose to
              participate (buy $SKILL)
            </p>
            <p>
              <span className="greentext">&gt;</span> 5. All interactions are
              tracked in real-time
            </p>
            <p>
              <span className="greentext">&gt;</span> 6. You&apos;re watching an
              experiment in agent economics
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
