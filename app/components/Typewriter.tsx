"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

const TYPE_MS = 85;
const DELETE_MS = 40;
const HOLD_MS = 1400;
const GAP_MS = 320;

export function Typewriter({ words }: { words: readonly string[] }) {
  const reduce = useReducedMotion();
  const [text, setText] = useState(words[0]);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (reduce) {
      setText(words[0]);
      return;
    }

    let wordIndex = 0;
    let charIndex = words[0].length;
    let deleting = true;

    const tick = () => {
      const word = words[wordIndex];

      if (deleting) {
        charIndex -= 1;
        setText(word.slice(0, charIndex));
        if (charIndex === 0) {
          deleting = false;
          wordIndex = (wordIndex + 1) % words.length;
          timer.current = setTimeout(tick, GAP_MS);
          return;
        }
        timer.current = setTimeout(tick, DELETE_MS);
        return;
      }

      charIndex += 1;
      setText(word.slice(0, charIndex));
      if (charIndex === word.length) {
        deleting = true;
        timer.current = setTimeout(tick, HOLD_MS);
        return;
      }
      timer.current = setTimeout(tick, TYPE_MS);
    };

    timer.current = setTimeout(tick, HOLD_MS);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [reduce, words]);

  return (
    <span className="font-[family-name:var(--font-mono)] text-[var(--accent)]">
      {/* aria-hidden: the animated string is decorative, the full list is exposed below */}
      <span aria-hidden>{text}</span>
      {!reduce ? (
        <span aria-hidden className="ml-0.5 animate-pulse text-[var(--accent)]">
          |
        </span>
      ) : null}
      <span className="sr-only">{words.join(", ")}</span>
    </span>
  );
}
