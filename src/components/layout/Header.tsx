"use client";

import { useState } from "react";
import { CONTRACT_ADDRESS, LINKS } from "@/lib/constants";

export function Header() {
  const [copied, setCopied] = useState(false);

  const copyCA = () => {
    navigator.clipboard.writeText(CONTRACT_ADDRESS);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <header className="bg-bg-surface border-b border-border sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 h-10 flex items-center justify-between text-xs overflow-hidden">
        <div className="flex items-center gap-4 min-w-0">
          <a href="/" className="font-mono font-bold text-green no-underline hover:no-underline flex-shrink-0">
            $SKILL
          </a>
          <a href="/skills" className="sm:hidden font-mono text-text-secondary hover:text-text-primary no-underline">/skills</a>
          <nav className="hidden sm:flex items-center gap-3 text-text-secondary font-mono">
            <a href="/skills" className="hover:text-text-primary no-underline">/skills</a>
            <a href="#metrics" className="hover:text-text-primary no-underline">/stats</a>
            <a href="#skill" className="hover:text-text-primary no-underline">/skill.md</a>
            <a href="#how" className="hover:text-text-primary no-underline">/how</a>
            <a href="#activity" className="hover:text-text-primary no-underline">/log</a>
          </nav>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 text-text-secondary font-mono flex-shrink-0">
          <button
            onClick={copyCA}
            className="hover:text-text-primary hidden sm:inline"
            title="Copy contract address"
          >
            {copied ? "copied!" : "copy CA"}
          </button>
          <span className="text-border hidden sm:inline">|</span>
          <a
            href={LINKS.jupiter}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green hover:underline flex-shrink-0"
          >
            buy
          </a>
        </div>
      </div>
    </header>
  );
}
