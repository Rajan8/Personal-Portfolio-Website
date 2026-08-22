"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowUpIcon } from "./Icons";

export function BackToTop() {
  const [show, setShow] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 900);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show ? (
        <motion.a
          href="#top"
          aria-label="Back to top"
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-5 z-40 grid h-12 w-12 cursor-pointer place-items-center rounded-full border border-[var(--line-strong)] bg-[var(--surface)] text-[var(--ink-2)] shadow-[0_6px_20px_-8px_rgba(15,23,32,0.35)] transition-colors duration-200 hover:border-[var(--accent)] hover:text-[var(--accent)]"
        >
          <ArrowUpIcon />
        </motion.a>
      ) : null}
    </AnimatePresence>
  );
}
