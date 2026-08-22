import type { ProjectStatus } from "@/lib/content";

const tone: Record<ProjectStatus, string> = {
  Shipped: "text-[var(--success)] border-[var(--success)]",
  "In progress": "text-[var(--accent)] border-[var(--accent)]",
  Ongoing: "text-[var(--ink-2)] border-[var(--line-strong)]",
};

/**
 * Status is conveyed by shape + text, not colour alone — the dot glyph
 * differs per state so it still reads without colour perception.
 */
const glyph: Record<ProjectStatus, string> = {
  Shipped: "●",
  "In progress": "◐",
  Ongoing: "○",
};

export function StatusPill({ status, note }: { status: ProjectStatus; note?: string }) {
  return (
    <span
      className={`mono-label inline-flex items-center gap-1.5 rounded-md border bg-[var(--surface)] px-2.5 py-1 ${tone[status]}`}
    >
      <span aria-hidden className="text-[0.7rem] leading-none">
        {glyph[status]}
      </span>
      {note ?? status}
    </span>
  );
}
