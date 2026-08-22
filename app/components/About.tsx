import { aboutBody, aboutTitle, skills } from "@/lib/content";
import { Reveal } from "./Reveal";
import { Eyebrow, Section, Wrap } from "./Primitives";

export function About() {
  return (
    <Section id="about">
      <Wrap>
        <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <Reveal>
            <Eyebrow>About</Eyebrow>
            <h2 className="mt-3 max-w-[20ch] font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.6rem)] font-semibold leading-[1.12] tracking-[-0.025em] text-[var(--ink)]">
              {aboutTitle}
            </h2>
            <p className="mt-5 max-w-[60ch] text-[1.0625rem] leading-relaxed text-[var(--ink-2)]">
              {aboutBody}
            </p>
          </Reveal>

          <div>
            <Reveal>
              <h3 className="mono-label text-[var(--ink-3)]">What I actually use</h3>
            </Reveal>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {skills.map((block, i) => (
                <Reveal key={block.group} as="li" index={i}>
                  <div className="h-full rounded-[var(--radius-card)] border border-[var(--line-strong)] bg-[var(--surface)] p-4">
                    <h4 className="font-[family-name:var(--font-display)] text-[0.9375rem] font-semibold text-[var(--ink)]">
                      {block.group}
                    </h4>
                    <ul className="mt-2.5 flex flex-wrap gap-1.5">
                      {block.items.map((item) => (
                        <li
                          key={item}
                          className="rounded-md border border-[var(--line)] bg-[var(--surface-2)] px-2.5 py-1 font-[family-name:var(--font-mono)] text-xs text-[var(--ink-2)]"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </Wrap>
    </Section>
  );
}
