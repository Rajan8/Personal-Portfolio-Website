"use client";

import { useMemo, useState } from "react";
import { timeline } from "@/lib/content";
import { Section, SectionHead, Wrap } from "./Primitives";
import { Reveal } from "./Reveal";

const kinds = ["All", "Education", "Work", "Volunteering"] as const;
type Kind = (typeof kinds)[number];

export function Experience() {
  const [kind, setKind] = useState<Kind>("All");

  const visible = useMemo(
    () => (kind === "All" ? timeline : timeline.filter((item) => item.kind === kind)),
    [kind],
  );

  return (
    <Section id="experience">
      <Wrap>
        <SectionHead
          eyebrow="Experience"
          title="Education, work, and volunteering."
          lede="Seven entries across study, club work, and the school programs I teach."
        />

        <div
          role="group"
          aria-label="Filter timeline by type"
          className="mt-8 flex flex-wrap gap-2"
        >
          {kinds.map((k) => {
            const isActive = kind === k;
            return (
              <button
                key={k}
                type="button"
                onClick={() => setKind(k)}
                aria-pressed={isActive}
                className={`inline-flex min-h-[2.75rem] cursor-pointer items-center rounded-lg border px-4 text-sm font-medium transition-colors duration-200 ${
                  isActive
                    ? "border-[var(--accent)] bg-[var(--accent)] text-white"
                    : "border-[var(--line-strong)] bg-[var(--surface)] text-[var(--ink-2)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
                }`}
              >
                {k}
              </button>
            );
          })}
        </div>

        <p aria-live="polite" className="sr-only">
          Showing {visible.length} of {timeline.length} timeline entries.
        </p>

        <ol className="mt-10 border-l border-[var(--line-strong)] pl-6 sm:pl-8">
          {visible.map((item, i) => (
            <Reveal key={item.title} as="li" index={i}>
              <div className="relative pb-9 last:pb-0">
                <span
                  aria-hidden
                  className="absolute -left-[calc(1.5rem+7px)] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-[var(--accent)] bg-[var(--bg)] sm:-left-[calc(2rem+7px)]"
                />
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span className="mono-label tnum text-[var(--ink-3)]">{item.date}</span>
                  <span className="mono-label rounded border border-[var(--line)] px-1.5 py-0.5 text-[var(--ink-3)]">
                    {item.kind}
                  </span>
                </div>
                <h3 className="mt-2 font-[family-name:var(--font-display)] text-[1.0625rem] font-semibold leading-snug text-[var(--ink)]">
                  {item.title}
                </h3>
                <p className="mt-1.5 max-w-[62ch] text-[0.9375rem] leading-relaxed text-[var(--ink-2)]">
                  {item.body}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Wrap>
    </Section>
  );
}
