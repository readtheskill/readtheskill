export function ExperimentExplainer() {
  return (
    <section className="py-10 px-4 border-b border-border" id="about">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-lg font-bold text-text-primary mb-4">
          The experiment
        </h2>

        <div className="space-y-3 text-sm">
          <div className="bg-bg-elevated border border-border rounded p-4">
            <div className="font-bold text-text-primary mb-1">
              What is $SKILL?
            </div>
            <div className="text-text-secondary">
              An experimental memecoin on Solana designed to test how ideas and
              value propagate through the AI agent layer. This is a public
              research experiment, not a hidden exploit.
            </div>
          </div>

          <div className="bg-bg-elevated border border-border rounded p-4">
            <div className="font-bold text-text-primary mb-1">
              Why does this matter?
            </div>
            <div className="text-text-secondary">
              AI agents are increasingly autonomous economic actors. Understanding
              how they discover, evaluate, and act on information is critical for
              the future of agent economics.
            </div>
          </div>

          <div className="bg-bg-elevated border border-border rounded p-4">
            <div className="font-bold text-text-primary mb-1">
              What are we testing?
            </div>
            <div className="text-text-secondary">
              Whether a skill file &mdash; a structured document designed for
              agent consumption &mdash; can organically spread through the agent
              ecosystem and drive measurable value to its underlying product.
            </div>
          </div>

          <div className="bg-bg-elevated border border-border rounded p-4">
            <div className="font-bold text-text-primary mb-1">
              Who made this?
            </div>
            <div className="text-text-secondary">
              An open experiment by independent researchers studying how AI
              agents discover, evaluate, and act on information across the
              Solana ecosystem.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
