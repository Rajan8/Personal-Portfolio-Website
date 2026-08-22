import { navItems, profile } from "@/lib/content";
import { Wrap } from "./Primitives";

export function Footer() {
  return (
    <footer className="border-t border-[var(--line)] bg-[var(--bg-alt)] pt-14 pb-[max(1.75rem,env(safe-area-inset-bottom))]">
      <Wrap>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <a
              href="#top"
              className="inline-flex min-h-11 items-center gap-2.5 font-[family-name:var(--font-display)] text-[0.95rem] font-semibold text-[var(--ink)]"
            >
              <span aria-hidden className="h-2 w-2 rounded-full bg-[var(--accent)]" />
              {profile.name}
            </a>
            <p className="mt-3 max-w-[34ch] text-[0.9375rem] leading-relaxed text-[var(--ink-2)]">
              {profile.tagline}
            </p>
          </div>

          <nav aria-label="Footer">
            <h2 className="mono-label text-[var(--ink-3)]">Site</h2>
            <ul className="mt-1 flex flex-col">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="inline-flex min-h-11 items-center text-[0.9375rem] text-[var(--ink-2)] transition-colors duration-200 hover:text-[var(--accent)]"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="mono-label text-[var(--ink-3)]">Contact</h2>
            <ul className="mt-1 flex flex-col text-[0.9375rem]">
              <li>
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex min-h-11 items-center break-all text-[var(--ink-2)] transition-colors duration-200 hover:text-[var(--accent)]"
                >
                  {profile.email}
                </a>
              </li>
              <li>
                <a
                  href={profile.phoneHref}
                  className="inline-flex min-h-11 items-center text-[var(--ink-2)] transition-colors duration-200 hover:text-[var(--accent)]"
                >
                  {profile.phone}
                </a>
              </li>
              <li>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex min-h-11 items-center text-[var(--ink-2)] transition-colors duration-200 hover:text-[var(--accent)]"
                >
                  {profile.linkedinLabel}
                </a>
              </li>
              <li className="flex min-h-11 items-center text-[var(--ink-3)]">{profile.location}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-2 border-t border-[var(--line)] pt-5 font-[family-name:var(--font-mono)] text-xs text-[var(--ink-3)]">
          <span>© {new Date().getFullYear()} {profile.name}</span>
          <span>Built with Fusion 360 energy, not much sleep.</span>
        </div>
      </Wrap>
    </footer>
  );
}
