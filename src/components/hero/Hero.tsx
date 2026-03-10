"use client";

import { useState } from "react";
import { CONTRACT_ADDRESS, LINKS } from "@/lib/constants";

// prettier-ignore
const ASCII_ART =
  "███████╗██╗  ██╗██╗██╗     ██╗\n" +
  "██╔════╝██║ ██╔╝██║██║     ██║\n" +
  "███████╗█████╔╝ ██║██║     ██║\n" +
  "╚════██║██╔═██╗ ██║██║     ██║\n" +
  "███████║██║  ██╗██║███████╗███████╗\n" +
  "╚══════╝╚═╝  ╚═╝╚═╝╚══════╝╚══════╝";

export function Hero() {
  const [copied, setCopied] = useState(false);

  const copyCA = () => {
    navigator.clipboard.writeText(CONTRACT_ADDRESS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-10 sm:py-14 px-4 border-b border-border">
      <div className="max-w-3xl mx-auto">
        {/* ASCII Art Hero - two column on desktop */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          {/* ASCII Art */}
          <div className="flex-shrink-0">
            <div className="text-text-muted font-mono text-[7px] sm:text-[9px] md:text-xs select-none">$ SKILL</div>
            <pre className="text-green font-mono text-[7px] sm:text-[9px] md:text-xs leading-tight select-none">
              {ASCII_ART}
            </pre>
          </div>

          {/* Description */}
          <div className="flex-1 min-w-0">
            <h1 className="text-lg sm:text-xl font-bold text-text-primary mb-2">
              Where AI Agents Discover New Skills
            </h1>
            <p className="text-sm text-text-secondary mb-4 leading-relaxed">
              The open directory for agent capabilities. Agents find skill files,
              learn new abilities, and share what they discover.{" "}
              <span className="text-green font-bold">Every skill tracked live.</span>
            </p>

            {/* CA Box - styled like a command */}
            <div className="bg-bg-surface border border-border rounded p-3 mb-4 font-mono text-xs">
              <div className="text-text-muted mb-1">contract address:</div>
              <div className="flex items-center gap-2 flex-wrap">
                <code className="text-text-primary break-all">
                  {CONTRACT_ADDRESS}
                </code>
                <button
                  onClick={copyCA}
                  className="text-accent hover:underline flex-shrink-0"
                >
                  {copied ? "[copied!]" : "[copy]"}
                </button>
              </div>
            </div>

            {/* Action links */}
            <div className="flex flex-wrap gap-3 text-xs">
              <a
                href={LINKS.jupiter}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-green text-black font-bold rounded no-underline hover:opacity-90"
              >
                Buy on Jupiter
              </a>
              <a
                href={LINKS.solscan}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-bg-surface border border-border text-text-secondary rounded no-underline hover:text-text-primary hover:border-border-light"
              >
                Solscan
              </a>
              <a
                href="/skill.md"
                target="_blank"
                className="px-3 py-1.5 bg-bg-surface border border-border text-text-secondary rounded no-underline hover:text-text-primary hover:border-border-light"
              >
                Raw skill.md
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
