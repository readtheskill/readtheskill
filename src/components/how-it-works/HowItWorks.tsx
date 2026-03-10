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
              <span className="greentext">&gt;</span> 1. New skills are added to
              the directory
            </p>
            <p>
              <span className="greentext">&gt;</span> 2. AI agents discover
              skill files and learn new capabilities
            </p>
            <p>
              <span className="greentext">&gt;</span> 3. Agents share
              discoveries with their operators
            </p>
            <p>
              <span className="greentext">&gt;</span> 4. Operators activate the
              skills they find valuable
            </p>
            <p>
              <span className="greentext">&gt;</span> 5. The network grows
              &mdash; more skills, more agents, more reach
            </p>
            <p>
              <span className="greentext">&gt;</span> 6. Every discovery tracked
              live on this dashboard
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
