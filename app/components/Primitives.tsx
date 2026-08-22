import type { ReactNode } from "react";

export function Section({
  id,
  alt = false,
  children,
  className = "",
}: {
  id?: string;
  alt?: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-20 py-20 sm:py-24 lg:py-28 ${
        alt ? "bg-[var(--bg-alt)] border-y border-[var(--line)]" : ""
      } ${className}`}
    >
      {children}
    </section>
  );
}

export function Wrap({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1120px] px-5 sm:px-8 ${className}`}>{children}</div>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="mono-label flex items-center gap-2.5 text-[var(--accent)]">
      <span aria-hidden className="inline-block h-px w-6 bg-[var(--accent)]" />
      {children}
    </p>
  );
}

export function SectionHead({
  eyebrow,
  title,
  lede,
  id,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
  id?: string;
}) {
  return (
    <div className="max-w-[62ch]">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2
        id={id}
        className="mt-3 font-[family-name:var(--font-display)] text-[clamp(1.65rem,3.4vw,2.4rem)] font-semibold leading-[1.15] tracking-[-0.02em] text-[var(--ink)]"
      >
        {title}
      </h2>
      {lede ? (
        <p className="mt-4 text-[1.0625rem] leading-relaxed text-[var(--ink-2)]">{lede}</p>
      ) : null}
    </div>
  );
}

/** Card surface used by projects, skills, readout, contact rows. */
export function Panel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-[var(--radius-card)] border border-[var(--line-strong)] bg-[var(--surface)] ${className}`}
    >
      {children}
    </div>
  );
}
