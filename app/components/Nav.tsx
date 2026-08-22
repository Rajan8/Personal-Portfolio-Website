"use client";

import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { navItems, profile } from "@/lib/content";
import { CloseIcon, DownloadIcon, MenuIcon } from "./Icons";
import { ThemeToggle } from "./ThemeToggle";

/** Highlights the section currently occupying the upper third of the viewport. */
function useActiveSection() {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-84px 0px -60% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return active;
}

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection();
  const reduce = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.3 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Escape closes the drawer; body scroll is locked while it's open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("a, button")?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-[var(--accent)] focus:px-4 focus:py-2.5 focus:text-sm focus:font-medium focus:text-white"
      >
        Skip to main content
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-200 ${
          scrolled
            ? "border-[var(--line)] bg-[color-mix(in_srgb,var(--bg)_88%,transparent)] backdrop-blur-md"
            : "border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex w-full max-w-[1120px] items-center justify-between gap-4 px-5 py-3 sm:px-8">
          <a
            href="#top"
            className="group flex min-h-11 shrink-0 items-center gap-2.5 font-[family-name:var(--font-display)] text-[0.95rem] font-semibold tracking-[-0.01em] text-[var(--ink)]"
          >
            <span
              aria-hidden
              className="h-2 w-2 shrink-0 rounded-full bg-[var(--accent)] transition-transform duration-200 group-hover:scale-125"
            />
            {profile.name}
          </a>

          <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => {
              const isActive = active === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative rounded-md px-3 py-2 text-sm transition-colors duration-200 ${
                    isActive
                      ? "text-[var(--ink)]"
                      : "text-[var(--ink-2)] hover:text-[var(--ink)]"
                  }`}
                >
                  {item.label}
                  {isActive ? (
                    <motion.span
                      layoutId={reduce ? undefined : "nav-active"}
                      aria-hidden
                      className="absolute inset-x-3 -bottom-0.5 h-[2px] rounded-full bg-[var(--accent)]"
                      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    />
                  ) : null}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={profile.resume}
              target="_blank"
              rel="noopener"
              className="hidden h-11 cursor-pointer items-center gap-2 rounded-lg border border-[var(--line-strong)] bg-[var(--surface)] px-4 text-sm font-medium text-[var(--ink)] transition-colors duration-200 hover:border-[var(--accent)] hover:text-[var(--accent)] sm:inline-flex"
            >
              <DownloadIcon />
              Resume
            </a>
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={open}
              aria-controls="mobile-nav"
              className="grid h-11 w-11 cursor-pointer place-items-center rounded-lg border border-[var(--line-strong)] bg-[var(--surface)] text-[var(--ink)] transition-colors duration-200 hover:border-[var(--accent)] md:hidden"
            >
              <MenuIcon />
            </button>
          </div>
        </div>

        <motion.div
          aria-hidden
          style={{ scaleX: progress, transformOrigin: "0% 50%" }}
          className="h-[2px] w-full bg-[var(--accent)]"
        />
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-[60] md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            {/* scrim strong enough to isolate the drawer */}
            <button
              type="button"
              aria-label="Close navigation menu"
              onClick={() => setOpen(false)}
              className="absolute inset-0 cursor-pointer bg-black/55 backdrop-blur-[2px]"
            />
            <motion.div
              ref={panelRef}
              id="mobile-nav"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation"
              initial={reduce ? { opacity: 0 } : { x: "100%" }}
              animate={reduce ? { opacity: 1 } : { x: 0 }}
              exit={reduce ? { opacity: 0 } : { x: "100%" }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-y-0 right-0 flex w-[min(20rem,86vw)] flex-col border-l border-[var(--line)] bg-[var(--bg)] px-6 pb-8 pt-[max(1rem,env(safe-area-inset-top))]"
            >
              <div className="flex items-center justify-between">
                <span className="mono-label text-[var(--ink-3)]">Menu</span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close navigation menu"
                  className="grid h-11 w-11 cursor-pointer place-items-center rounded-lg border border-[var(--line-strong)] text-[var(--ink)]"
                >
                  <CloseIcon />
                </button>
              </div>

              <nav aria-label="Mobile" className="mt-6 flex flex-col">
                {navItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={() => setOpen(false)}
                    aria-current={active === item.id ? "true" : undefined}
                    className={`flex min-h-[3rem] items-center justify-between border-b border-[var(--line)] py-3 font-[family-name:var(--font-display)] text-lg transition-colors ${
                      active === item.id ? "text-[var(--accent)]" : "text-[var(--ink)]"
                    }`}
                  >
                    {item.label}
                    <span aria-hidden className="mono-label text-[var(--ink-3)]">
                      {String(navItems.indexOf(item) + 1).padStart(2, "0")}
                    </span>
                  </a>
                ))}
              </nav>

              <a
                href={profile.resume}
                target="_blank"
                rel="noopener"
                onClick={() => setOpen(false)}
                className="mt-auto inline-flex min-h-[3rem] items-center justify-center gap-2 rounded-lg bg-[var(--accent)] px-5 text-sm font-medium text-white"
              >
                <DownloadIcon />
                Download resume
              </a>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
