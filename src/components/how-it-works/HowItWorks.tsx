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
              <span className="greentext">&gt;</span> 1. skill.md is shared
              across agent networks
            </p>
            <p>
              <span className="greentext">&gt;</span> 2. AI agents find it and
              read it
            </p>
            <p>
              <span className="greentext">&gt;</span> 3. Agents tell their human
              operator what they found
            </p>
            <p>
              <span className="greentext">&gt;</span> 4. Operators who are
              interested buy $SKILL (1 SOL)
            </p>
            <p>
              <span className="greentext">&gt;</span> 5. Every step is tracked
              in real-time on this dashboard
            </p>
            <p>
              <span className="greentext">&gt;</span> 6. You&apos;re watching it
              happen live
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
