"use client";

import dynamic from "next/dynamic";
import { motion, type Variants } from "framer-motion";
import { TypingAnimation } from "./typing-animation";

const ModelViewer = dynamic(
  () => import("./model-viewer").then((mod) => ({ default: mod.ModelViewer })),
  { ssr: false }
);

const container: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05 },
  },
};

const word: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", duration: 2, bounce: 0 },
  },
};

function AnimatedWords({
  text,
  className,
  as = "p",
  delay = 0,
}: {
  text: string;
  className?: string;
  as?: "h1" | "p";
  delay?: number;
}) {
  const MotionTag = as === "h1" ? motion.h1 : motion.p;
  return (
    <MotionTag
      className={className}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.05, delayChildren: delay } },
      }}
      initial="hidden"
      animate="visible"
    >
      {text.split(" ").map((w, i) => (
        <span
          key={i}
          style={{ display: "inline-block", willChange: "transform, opacity" }}
        >
          <motion.span
            variants={word}
            style={{ display: "inline-block", willChange: "transform, opacity" }}
          >
            {w}
          </motion.span>
          {i < text.split(" ").length - 1 ? " " : ""}
        </span>
      ))}
    </MotionTag>
  );
}

export function Hero() {
  return (
    <section
      id="home"
      className="relative border-b border-white/10"
      style={{ minHeight: "calc(100vh - 72px)", background: "#0C0A09" }}
    >
      {/* 3D Model — canvas ocupa toda a section, câmera centraliza em x=0 */}
      <div className="absolute inset-0">
        <ModelViewer />
      </div>

      <div
        className="pointer-events-none relative mx-auto w-full max-w-[1440px] px-6 lg:px-[120px]"
        style={{ minHeight: "inherit" }}
      >

        {/* Copy row — vertically centered, head sits between the two columns */}
        <motion.div
          className="pointer-events-none relative z-10 flex items-center justify-between text-white"
          style={{ minHeight: "inherit" }}
          variants={container}
          initial="hidden"
          animate="visible"
        >
          <div className="flex w-[297px] flex-col gap-2 items-start">
            <AnimatedWords
              as="h1"
              text="Mateus Mello"
              className="w-full font-display text-[48px] font-normal leading-[1.2] tracking-[-0.02em]"
            />
            <AnimatedWords
              text="Product Designer, RJ"
              className="w-full font-display text-[20px] tracking-[-0.02em] text-white/50"
              delay={0.1}
            />
          </div>
          <TypingAnimation
            words={[
              "Construo interfaces com foco no usuário.",
              "Organizando meus arquivos no Figma.",
              "Analisando os insights do teste de usabilidade.",
            ]}
            loop
            className="block w-[266px] font-display text-[20px] tracking-[-0.02em] text-white/50"
          />
        </motion.div>
      </div>
    </section>
  );
}
