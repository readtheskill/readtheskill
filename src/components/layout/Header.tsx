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
      <div className="max-w-5xl mx-auto px-4 h-10 flex items-center justify-between text-xs">
        <div className="flex items-center gap-4">
          <a href="/" className="font-mono font-bold text-green no-underline hover:no-underline">
            $SKILL
          </a>
          <nav className="hidden sm:flex items-center gap-3 text-text-secondary font-mono">
            <a href="/skills" className="hover:text-text-primary no-underline">/skills</a>
            <a href="#metrics" className="hover:text-text-primary no-underline">/stats</a>
            <a href="#skill" className="hover:text-text-primary no-underline">/skill.md</a>
            <a href="#how" className="hover:text-text-primary no-underline">/how</a>
            <a href="#activity" className="hover:text-text-primary no-underline">/log</a>
          </nav>
        </div>
        <div className="flex items-center gap-3 text-text-secondary font-mono">
          <button
            onClick={copyCA}
            className="hover:text-text-primary"
            title="Copy contract address"
          >
            {copied ? "copied!" : "copy CA"}
          </button>
          <span className="text-border">|</span>
          <a
            href={LINKS.jupiter}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green hover:underline"
          >
            buy
          </a>
        </div>
      </div>
    </header>
  );
}
