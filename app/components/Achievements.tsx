import { achievements } from "@/lib/content";
import { TrophyIcon } from "./Icons";
import { Section, SectionHead, Wrap } from "./Primitives";
import { Reveal } from "./Reveal";

export function Achievements() {
  return (
    <Section id="achievements" alt>
      <Wrap>
        <SectionHead
          eyebrow="Achievements"
          title="Recognition & milestones"
          lede="Competition results, selections, and certifications from 2023 onward."
        />

        <ul className="mt-10 grid gap-4 sm:grid-cols-2">
          {achievements.map((item, i) => (
            <Reveal key={item.title} as="li" index={i}>
              <div className="flex h-full gap-4 rounded-[var(--radius-card)] border border-[var(--line-strong)] bg-[var(--surface)] p-5">
                <span
                  aria-hidden
                  className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-[var(--line)] bg-[var(--accent-tint)] text-[var(--accent)]"
                >
                  <TrophyIcon />
                </span>
                <div className="min-w-0">
                  <p className="mono-label tnum text-[var(--ink-3)]">{item.date}</p>
                  <h3 className="mt-1.5 font-[family-name:var(--font-display)] text-[1.0625rem] font-semibold leading-snug text-[var(--ink)]">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-[var(--ink-2)]">
                    {item.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </Wrap>
    </Section>
  );
}
