"use client";

import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "./Icons";

export function ThemeToggle({ className = "" }: { className?: string }) {
  // `null` until mounted so SSR markup never asserts the wrong icon.
  const [dark, setDark] = useState<boolean | null>(null);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggle() {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      /* private mode — the choice just won't persist */
    }
    setDark(next);
  }

  const label =
    dark === null ? "Toggle colour theme" : dark ? "Switch to light theme" : "Switch to dark theme";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className={`grid h-11 w-11 cursor-pointer place-items-center rounded-lg border border-[var(--line-strong)] bg-[var(--surface)] text-[var(--ink-2)] transition-colors duration-200 hover:border-[var(--accent)] hover:text-[var(--accent)] ${className}`}
    >
      <span className="sr-only">{label}</span>
      {dark ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}
