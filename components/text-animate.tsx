"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

type AnimationType = "blurInUp" | "fadeIn";
type SplitBy = "character" | "word" | "line";

interface TextAnimateProps {
  children: string;
  animation?: AnimationType;
  by?: SplitBy;
  className?: string;
  as?: "p" | "h2" | "h3" | "span";
  delay?: number;
}

const animations: Record<AnimationType, { hidden: Record<string, string | number>; visible: Record<string, string | number> }> = {
  blurInUp: {
    hidden: { opacity: 0, filter: "blur(8px)", y: 8 },
    visible: { opacity: 1, filter: "blur(0px)", y: 0 },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
};

function splitText(text: string, by: SplitBy): string[] {
  if (by === "character") return text.split("");
  if (by === "word") return text.split(/(\s+)/);
  return [text];
}

export function TextAnimate({
  children,
  animation = "blurInUp",
  by = "word",
  className,
  as: Tag = "p",
  delay = 0,
}: TextAnimateProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-64px" });

  const segments = splitText(children, by);
  const { hidden, visible } = animations[animation];

  return (
    <Tag ref={ref as React.RefObject<HTMLParagraphElement>} className={className}>
      {segments.map((segment, i) => (
        <motion.span
          key={i}
          initial={hidden}
          animate={inView ? visible : hidden}
          transition={{
            duration: 0.4,
            delay: delay + i * 0.02,
            ease: [0.25, 0.4, 0.25, 1],
          }}
          style={{ display: "inline-block", whiteSpace: segment.trim() === "" ? "pre" : undefined }}
        >
          {segment}
        </motion.span>
      ))}
    </Tag>
  );
}
