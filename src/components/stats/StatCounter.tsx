"use client";

import { useEffect, useRef, useState } from "react";

interface StatCounterProps {
  label: string;
  value: number;
  color: string;
}

export function StatCounter({ label, value, color }: StatCounterProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const prevValue = useRef(0);

  useEffect(() => {
    const start = prevValue.current;
    const end = value;
    if (start === end) return;

    const duration = 400;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setDisplayValue(Math.round(start + (end - start) * progress));
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
    prevValue.current = end;
  }, [value]);

  const formatNumber = (n: number): string => {
    if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
    if (n >= 1_000) return (n / 1_000).toFixed(1) + "K";
    return n.toLocaleString();
  };

  return (
    <div className="text-center">
      <div className={`text-2xl sm:text-3xl font-bold ${color}`}>
        {formatNumber(displayValue)}
      </div>
      <div className="text-xs text-text-secondary mt-1">{label}</div>
    </div>
  );
}
