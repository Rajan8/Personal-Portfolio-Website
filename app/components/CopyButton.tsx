"use client";

import { useEffect, useRef, useState } from "react";
import { CheckIcon, CopyIcon } from "./Icons";

export function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked — the value is still selectable in the link itself */
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? `${label} copied` : `Copy ${label}`}
      className="relative z-10 grid h-11 w-11 shrink-0 cursor-pointer place-items-center rounded-lg border border-[var(--line)] text-[var(--ink-3)] transition-colors duration-200 hover:border-[var(--accent)] hover:text-[var(--accent)]"
    >
      {copied ? <CheckIcon /> : <CopyIcon />}
      <span aria-live="polite" className="sr-only">
        {copied ? `${label} copied to clipboard` : ""}
      </span>
    </button>
  );
}
