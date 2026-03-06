import { CONTRACT_ADDRESS, LINKS } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="py-8 px-4 text-center text-xs text-text-muted">
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-wrap justify-center gap-4 mb-4">
          <a
            href={LINKS.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-secondary hover:text-text-primary"
          >
            [&#120143; twitter]
          </a>
          <a
            href={LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-secondary hover:text-text-primary"
          >
            [github]
          </a>
          <a
            href={LINKS.solscan}
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-secondary hover:text-text-primary"
          >
            [solscan]
          </a>
          <a
            href={LINKS.jupiter}
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-secondary hover:text-text-primary"
          >
            [jupiter]
          </a>
        </div>
        <div className="font-mono text-text-muted mb-2">{CONTRACT_ADDRESS}</div>
        <div>Built by PumpMarket Labs</div>
      </div>
    </footer>
  );
}
