"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useMemo, useState } from "react";
import { projects, type Project, type ProjectCategory } from "@/lib/content";
import { ArrowRightIcon } from "./Icons";
import { Section, SectionHead, Wrap } from "./Primitives";
import { ProjectArt } from "./ProjectArt";
import { ProjectDialog } from "./ProjectDialog";
import { StatusPill } from "./StatusPill";

type Filter = "All" | ProjectCategory;
const filters: Filter[] = ["All", "Hardware", "Software", "Teaching"];

export function Projects() {
  const [filter, setFilter] = useState<Filter>("All");
  const [open, setOpen] = useState<Project | null>(null);
  const reduce = useReducedMotion();

  const visible = useMemo(
    () => (filter === "All" ? projects : projects.filter((p) => p.category === filter)),
    [filter],
  );

  const counts = useMemo(() => {
    const map = new Map<Filter, number>([["All", projects.length]]);
    for (const p of projects) map.set(p.category, (map.get(p.category) ?? 0) + 1);
    return map;
  }, []);

  return (
    <Section id="projects" alt>
      <Wrap>
        <SectionHead
          eyebrow="Projects"
          title="Six builds, from a first-semester win to an ongoing final-year project."
          lede="Every card is a real project with a real outcome. Open one to read the full write-up and its spec sheet."
        />

        <div
          role="group"
          aria-label="Filter projects by category"
          className="mt-8 flex flex-wrap gap-2"
        >
          {filters.map((f) => {
            const isActive = filter === f;
            return (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                aria-pressed={isActive}
                className={`inline-flex min-h-[2.75rem] cursor-pointer items-center gap-2 rounded-lg border px-4 text-sm font-medium transition-colors duration-200 ${
                  isActive
                    ? "border-[var(--accent)] bg-[var(--accent)] text-white"
                    : "border-[var(--line-strong)] bg-[var(--surface)] text-[var(--ink-2)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
                }`}
              >
                {f}
                <span
                  className={`tnum font-[family-name:var(--font-mono)] text-xs ${
                    isActive ? "text-white/75" : "text-[var(--ink-3)]"
                  }`}
                >
                  {counts.get(f) ?? 0}
                </span>
              </button>
            );
          })}
        </div>

        <p aria-live="polite" className="sr-only">
          Showing {visible.length} of {projects.length} projects
          {filter === "All" ? "" : ` in ${filter}`}.
        </p>

        <motion.ul layout={!reduce} className="mt-8 grid gap-6 sm:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {visible.map((project, i) => (
              <motion.li
                key={project.id}
                layout={!reduce}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
                transition={{
                  duration: 0.35,
                  delay: Math.min(i, 5) * 0.05,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <article className="group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-[var(--line-strong)] bg-[var(--surface)] transition-[border-color,box-shadow] duration-200 hover:border-[var(--accent)] hover:shadow-[0_8px_28px_-12px_rgba(15,23,32,0.22)] focus-within:border-[var(--accent)]">
                  <div className="aspect-[400/240] w-full border-b border-[var(--line)] bg-[var(--surface-2)]">
                    <ProjectArt id={project.id} />
                  </div>

                  <div className="flex flex-1 flex-col gap-3.5 p-5">
                    <div className="flex flex-wrap items-center gap-2">
                      <StatusPill status={project.status} note={project.statusNote} />
                    </div>

                    <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold tracking-[-0.01em] text-[var(--ink)]">
                      {/* Stretched link: the whole card is the target, one tab stop. */}
                      <button
                        type="button"
                        onClick={() => setOpen(project)}
                        className="cursor-pointer text-left"
                      >
                        {/* stretched hit area: the whole card opens the dialog */}
                        <span className="absolute inset-0" aria-hidden />
                        {project.title}
                        <span className="sr-only"> — open project details</span>
                      </button>
                    </h3>

                    <p className="text-[0.9375rem] leading-relaxed text-[var(--ink-2)]">
                      {project.summary}
                    </p>

                    <ul className="mt-auto flex flex-wrap gap-1.5 pt-1">
                      {project.tags.slice(0, 3).map((tag) => (
                        <li
                          key={tag}
                          className="rounded-md border border-[var(--line)] bg-[var(--surface-2)] px-2 py-0.5 font-[family-name:var(--font-mono)] text-[0.6875rem] text-[var(--ink-3)]"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>

                    <p className="flex items-center gap-1.5 border-t border-dashed border-[var(--line)] pt-3 text-sm font-medium text-[var(--accent)]">
                      Read the write-up
                      <span className="transition-transform duration-200 group-hover:translate-x-1">
                        <ArrowRightIcon size={15} />
                      </span>
                    </p>
                  </div>
                </article>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </Wrap>

      <ProjectDialog project={open} onClose={() => setOpen(null)} />
    </Section>
  );
}
