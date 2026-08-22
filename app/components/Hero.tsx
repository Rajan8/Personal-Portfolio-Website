"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { profile, readout, stats } from "@/lib/content";
import { ArrowRightIcon, DownloadIcon } from "./Icons";
import { Wrap } from "./Primitives";
import { Typewriter } from "./Typewriter";

export function Hero() {
  const reduce = useReducedMotion();

  const rise = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-[var(--line)] pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24"
    >
      <div aria-hidden className="blueprint-grid absolute inset-0" />
      <div
        aria-hidden
        className="absolute -top-40 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full opacity-70 blur-3xl"
        style={{
          background: "radial-gradient(circle, var(--grid-glow), transparent 65%)",
        }}
      />

      <Wrap className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
          <div>
            <motion.p
              {...rise(0)}
              className="mono-label inline-flex items-center gap-2 rounded-full border border-[var(--line-strong)] bg-[var(--surface)] px-3 py-1.5 text-[var(--ink-2)]"
            >
              <span
                aria-hidden
                className="h-1.5 w-1.5 rounded-full bg-[var(--success)]"
              />
              Open to internships & collaborations
            </motion.p>

            <motion.h1
              {...rise(0.06)}
              className="mt-6 font-[family-name:var(--font-display)] text-[clamp(2.1rem,6vw,3.6rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-[var(--ink)]"
            >
              {profile.headline.map((line, i) => (
                <span key={line} className="block">
                  {line}
                  {i === profile.headline.length - 1 ? (
                    <span className="text-[var(--accent)]">.</span>
                  ) : null}
                </span>
              ))}
            </motion.h1>

            <motion.p
              {...rise(0.12)}
              className="mt-5 flex flex-wrap items-baseline gap-x-2 gap-y-1 text-[0.9375rem] text-[var(--ink-3)]"
            >
              <span className="font-[family-name:var(--font-mono)]">Working with —</span>
              <Typewriter words={profile.rotatingWords} />
            </motion.p>

            <motion.p
              {...rise(0.18)}
              className="mt-5 max-w-[58ch] text-[1.0625rem] leading-relaxed text-[var(--ink-2)]"
            >
              {profile.lede}
            </motion.p>

            <motion.div {...rise(0.24)} className="mt-8 flex flex-wrap gap-3">
              <a
                href="#projects"
                className="group inline-flex min-h-[3rem] cursor-pointer items-center gap-2 rounded-lg bg-[var(--accent)] px-5 text-[0.9375rem] font-medium text-white transition-colors duration-200 hover:bg-[var(--accent-hover)]"
              >
                View projects
                <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                  <ArrowRightIcon />
                </span>
              </a>
              <a
                href={profile.resume}
                target="_blank"
                rel="noopener"
                className="inline-flex min-h-[3rem] cursor-pointer items-center gap-2 rounded-lg border border-[var(--line-strong)] bg-[var(--surface)] px-5 text-[0.9375rem] font-medium text-[var(--ink)] transition-colors duration-200 hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                <DownloadIcon />
                Download resume
              </a>
            </motion.div>
          </div>

          <motion.div
            {...(reduce
              ? {}
              : {
                  initial: { opacity: 0, scale: 0.95 },
                  animate: { opacity: 1, scale: 1 },
                  transition: { duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] as const },
                })}
            className="mx-auto w-full max-w-[22rem] lg:max-w-none"
          >
            <div className="relative">
              <div
                aria-hidden
                className="absolute -inset-3 rounded-[1.6rem] border border-dashed border-[var(--line-strong)]"
              />
              <div className="relative overflow-hidden rounded-[1.25rem] border border-[var(--line-strong)] bg-[var(--surface-2)]">
                <Image
                  src={profile.photo}
                  alt={`${profile.name}, ${profile.role}`}
                  width={640}
                  height={720}
                  priority
                  sizes="(max-width: 1024px) 22rem, 24rem"
                  className="aspect-[4/5] w-full object-cover object-[center_22%]"
                />
              </div>
            </div>

            <dl className="mt-4 overflow-hidden rounded-[var(--radius-card)] border border-[var(--line-strong)] bg-[var(--surface)] font-[family-name:var(--font-mono)] text-[0.8125rem]">
              {readout.map((row, i) => (
                <div
                  key={row.label}
                  className={`flex items-center justify-between gap-4 px-4 py-2.5 ${
                    i < readout.length - 1 ? "dashed-rule" : ""
                  }`}
                >
                  <dt className="shrink-0 text-[var(--ink-3)]">{row.label}</dt>
                  <dd
                    className={`text-right ${
                      row.highlight ? "text-[var(--success)]" : "text-[var(--ink)]"
                    }`}
                  >
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>
          </motion.div>
        </div>

        <motion.dl
          {...rise(0.32)}
          className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-card)] border border-[var(--line-strong)] bg-[var(--line)] sm:grid-cols-4"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="bg-[var(--surface)] px-5 py-5">
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="tnum block font-[family-name:var(--font-display)] text-[2rem] font-semibold leading-none text-[var(--ink)]">
                  {stat.num}
                </span>
                <span className="mono-label mt-2 block text-[var(--ink-3)]">{stat.label}</span>
              </dd>
            </div>
          ))}
        </motion.dl>
      </Wrap>
    </section>
  );
}
