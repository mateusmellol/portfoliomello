"use client";

import { useEffect, useState } from "react";

type TypingAnimationProps = {
  words: string[];
  className?: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  loop?: boolean;
};

export function TypingAnimation({
  words,
  className,
  typingSpeed = 60,
  deletingSpeed = 30,
  pauseDuration = 1800,
  loop = true,
}: TypingAnimationProps) {
  const [wordIndex, setWordIndex] = useState(0);
  const [display, setDisplay] = useState("");
  const [phase, setPhase] = useState<"typing" | "pausing" | "deleting">("typing");

  useEffect(() => {
    const current = words[wordIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      if (display.length < current.length) {
        timeout = setTimeout(() => {
          setDisplay(current.slice(0, display.length + 1));
        }, typingSpeed);
      } else {
        timeout = setTimeout(() => setPhase("pausing"), pauseDuration);
      }
    } else if (phase === "pausing") {
      const isLast = wordIndex === words.length - 1;
      if (!loop && isLast) return;
      timeout = setTimeout(() => setPhase("deleting"), 0);
    } else if (phase === "deleting") {
      if (display.length > 0) {
        timeout = setTimeout(() => {
          setDisplay(current.slice(0, display.length - 1));
        }, deletingSpeed);
      } else {
        setWordIndex((i) => (i + 1) % words.length);
        setPhase("typing");
      }
    }

    return () => clearTimeout(timeout);
  }, [display, phase, wordIndex, words, typingSpeed, deletingSpeed, pauseDuration, loop]);

  return (
    <span className={className}>
      {display}
      <span aria-hidden className="ml-[2px] inline-block w-[1px] animate-pulse bg-current align-middle" style={{ height: "0.9em" }} />
    </span>
  );
}
