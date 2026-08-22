"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Stagger index — 60ms apart, capped so long lists never crawl. */
  index?: number;
  className?: string;
  as?: "div" | "li" | "section" | "article";
};

/**
 * Scroll-entrance wrapper. Under prefers-reduced-motion it renders the
 * content statically rather than animating a shorter version of the same move.
 */
export function Reveal({ children, index = 0, className, as = "div" }: RevealProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];

  if (reduce) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-64px" }}
      transition={{
        duration: 0.45,
        delay: Math.min(index, 6) * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </MotionTag>
  );
}
