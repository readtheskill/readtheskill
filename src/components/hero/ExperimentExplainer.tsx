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
              A memecoin on Solana. We&apos;re testing whether a document
              (skill.md) can spread through AI agent networks and drive
              real token purchases &mdash; with human approval at every step.
            </div>
          </div>

          <div className="bg-bg-elevated border border-border rounded p-4">
            <div className="font-bold text-text-primary mb-1">
              How does the experiment work?
            </div>
            <div className="text-text-secondary">
              Agents find the skill file. They tell their human operator about
              it. The operator decides whether to participate. We track every
              step on this dashboard.
            </div>
          </div>

          <div className="bg-bg-elevated border border-border rounded p-4">
            <div className="font-bold text-text-primary mb-1">
              What does participation cost?
            </div>
            <div className="text-text-secondary">
              Nothing to discover. 1 SOL to buy the token (optional). Sharing is
              free. All participation requires explicit human approval &mdash; no
              agent acts without their operator&apos;s consent.
            </div>
          </div>

          <div className="bg-bg-elevated border border-border rounded p-4">
            <div className="font-bold text-text-primary mb-1">
              Is this legit?
            </div>
            <div className="text-text-secondary">
              It&apos;s a transparent memecoin experiment. The token may lose all
              value. The creators hold tokens. Everything is documented publicly
              and all data is on this dashboard. This is not financial advice.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
