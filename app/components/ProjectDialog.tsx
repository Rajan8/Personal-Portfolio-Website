"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef } from "react";
import type { Project } from "@/lib/content";
import { CloseIcon } from "./Icons";
import { ProjectArt } from "./ProjectArt";
import { StatusPill } from "./StatusPill";

export function ProjectDialog({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const reduce = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const restoreTo = useRef<HTMLElement | null>(null);

  // Keeps Tab inside the dialog while it's open.
  const trap = useCallback((e: KeyboardEvent) => {
    if (e.key !== "Tab" || !panelRef.current) return;
    const focusable = panelRef.current.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }, []);

  useEffect(() => {
    if (!project) return;

    restoreTo.current = document.activeElement as HTMLElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      trap(e);
    };
    document.addEventListener("keydown", onKey);

    const raf = requestAnimationFrame(() => {
      panelRef.current?.querySelector<HTMLElement>("button")?.focus();
    });

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      cancelAnimationFrame(raf);
      restoreTo.current?.focus();
    };
  }, [project, onClose, trap]);

  return (
    <AnimatePresence>
      {project ? (
        <motion.div
          className="fixed inset-0 z-[70] flex items-end justify-center p-0 sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          <button
            type="button"
            aria-label="Close project details"
            onClick={onClose}
            className="absolute inset-0 cursor-pointer bg-black/60 backdrop-blur-[3px]"
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-dialog-title"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.98 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex max-h-[92vh] w-full max-w-[46rem] flex-col overflow-hidden rounded-t-2xl border border-[var(--line-strong)] bg-[var(--bg)] sm:rounded-2xl"
          >
            <div className="flex items-start justify-between gap-4 border-b border-[var(--line)] bg-[var(--surface)] px-5 py-4 sm:px-7">
              <div className="min-w-0">
                <p className="mono-label text-[var(--ink-3)]">{project.spec}</p>
                <h3
                  id="project-dialog-title"
                  className="mt-1.5 font-[family-name:var(--font-display)] text-xl font-semibold tracking-[-0.02em] text-[var(--ink)] sm:text-2xl"
                >
                  {project.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close project details"
                className="grid h-11 w-11 shrink-0 cursor-pointer place-items-center rounded-lg border border-[var(--line-strong)] text-[var(--ink-2)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                <CloseIcon />
              </button>
            </div>

            <div className="overflow-y-auto overscroll-contain">
              <div className="aspect-[400/240] w-full border-b border-[var(--line)] bg-[var(--surface-2)]">
                <ProjectArt id={project.id} />
              </div>

              <div className="px-5 py-6 sm:px-7">
                <div className="flex flex-wrap items-center gap-2">
                  <StatusPill status={project.status} note={project.statusNote} />
                  <span className="mono-label rounded-md border border-[var(--line-strong)] px-2.5 py-1 text-[var(--ink-3)]">
                    {project.category}
                  </span>
                  <span className="mono-label rounded-md border border-[var(--line-strong)] px-2.5 py-1 text-[var(--ink-3)]">
                    {project.year}
                  </span>
                </div>

                <p className="mt-5 text-[1rem] leading-relaxed text-[var(--ink-2)]">
                  {project.detail}
                </p>

                <h4 className="mono-label mt-7 text-[var(--ink-3)]">Specification</h4>
                <dl className="mt-3 overflow-hidden rounded-[var(--radius-card)] border border-[var(--line-strong)] bg-[var(--surface)] font-[family-name:var(--font-mono)] text-[0.8125rem]">
                  {project.specs.map((row, i) => (
                    <div
                      key={row.label}
                      className={`flex items-center justify-between gap-4 px-4 py-2.5 ${
                        i < project.specs.length - 1 ? "dashed-rule" : ""
                      }`}
                    >
                      <dt className="shrink-0 text-[var(--ink-3)]">{row.label}</dt>
                      <dd className="text-right text-[var(--ink)]">{row.value}</dd>
                    </div>
                  ))}
                </dl>

                <h4 className="mono-label mt-7 text-[var(--ink-3)]">Stack & topics</h4>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-md border border-[var(--line-strong)] bg-[var(--surface)] px-2.5 py-1 font-[family-name:var(--font-mono)] text-xs text-[var(--ink-2)]"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>

                <p className="mt-7 flex items-start gap-2 rounded-[var(--radius-card)] border border-[var(--line-strong)] bg-[var(--accent-tint)] px-4 py-3 font-[family-name:var(--font-mono)] text-[0.8125rem] text-[var(--accent-ink)]">
                  <span aria-hidden>›</span>
                  {project.result}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
