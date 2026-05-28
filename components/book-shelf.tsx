"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, animate } from "framer-motion";

const BOOK_W = 160;
const BOOK_H = 232;
const DEPTH = 28;
const ANGLE_STEP = 36;
const RADIUS = 520;
const DRAG_FACTOR = 0.28;

const books = [
  {
    title: "User-Centered Design",
    cover: "https://covers.oreillystatic.com/images/9781449359805/lrg.jpg",
    landscape: false,
  },
  {
    title: "Articulating Design Decisions",
    cover: "https://covers.oreillystatic.com/images/9781492079224/lrg.jpg",
    landscape: false,
  },
  {
    title: "User Story Mapping",
    cover: "https://covers.oreillystatic.com/images/9781491904909/lrg.jpg",
    landscape: false,
  },
  {
    title: "Mapping Experiences",
    cover: "https://covers.oreillystatic.com/images/9781492076636/lrg.jpg",
    landscape: true,
  },
  {
    title: "Design for How People Think",
    cover: "https://covers.oreillystatic.com/images/9781491985458/lrg.jpg",
    landscape: false,
  },
];

export function BookShelf() {
  const rotation = useMotionValue(0);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startR = useRef(0);
  const [activeIndex, setActiveIndex] = useState(2);

  const MIN_R = -2 * ANGLE_STEP;
  const MAX_R = 2 * ANGLE_STEP;

  function handlePointerDown(e: React.PointerEvent) {
    isDragging.current = true;
    startX.current = e.clientX;
    startR.current = rotation.get();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }

  function handlePointerMove(e: React.PointerEvent) {
    if (!isDragging.current) return;
    const dx = e.clientX - startX.current;
    const next = startR.current + dx * DRAG_FACTOR;
    rotation.set(Math.max(MIN_R, Math.min(MAX_R, next)));
  }

  function handlePointerUp() {
    if (!isDragging.current) return;
    isDragging.current = false;

    const current = rotation.get();
    const snapped = Math.max(
      MIN_R,
      Math.min(MAX_R, Math.round(current / ANGLE_STEP) * ANGLE_STEP)
    );

    animate(rotation, snapped, { type: "spring", stiffness: 180, damping: 30 });

    const newActive = Math.round(2 - snapped / ANGLE_STEP);
    setActiveIndex(Math.max(0, Math.min(books.length - 1, newActive)));
  }

  return (
    <section className="border-b border-white/[0.19] py-24 overflow-hidden select-none">
      <div
        className="relative flex items-center justify-center cursor-grab active:cursor-grabbing"
        style={{ height: 420, perspective: "1100px" }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        <motion.div
          style={{
            transformStyle: "preserve-3d",
            rotateY: rotation,
            width: 0,
            height: 0,
          }}
        >
          {books.map((book, i) => {
            const W = book.landscape ? BOOK_H : BOOK_W;
            const H = book.landscape ? BOOK_W : BOOK_H;
            const bookAngle = (i - 2) * ANGLE_STEP;
            const isActive = i === activeIndex;

            return (
              <div
                key={book.title}
                style={{
                  position: "absolute",
                  left: -W / 2,
                  top: -H / 2,
                  width: W,
                  height: H,
                  transformStyle: "preserve-3d",
                  transform: `rotateY(${bookAngle}deg) translateZ(${RADIUS}px)`,
                  willChange: "transform",
                }}
              >
                <motion.div
                  animate={{
                    scale: isActive ? 1.08 : 0.82,
                    opacity: isActive ? 1 : 0.45,
                  }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  style={{
                    width: "100%",
                    height: "100%",
                    transformStyle: "preserve-3d",
                  }}
                >
                  {/* Front cover */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      transform: `translateZ(${DEPTH}px)`,
                      overflow: "hidden",
                      borderRadius: "2px 4px 4px 2px",
                      boxShadow: isActive
                        ? "0 35px 70px rgba(0,0,0,0.55)"
                        : "0 8px 20px rgba(0,0,0,0.3)",
                    }}
                  >
                    <img
                      src={book.cover}
                      alt={book.title}
                      draggable={false}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                        pointerEvents: "none",
                      }}
                    />
                  </div>

                  {/* Spine — left face */}
                  <div
                    style={{
                      position: "absolute",
                      left: 0,
                      top: 0,
                      width: DEPTH,
                      height: H,
                      transformOrigin: "0 50%",
                      transform: "rotateY(-90deg)",
                      background:
                        "linear-gradient(to right, #080808, #1c1c1c)",
                    }}
                  />

                  {/* Pages — right face */}
                  <div
                    style={{
                      position: "absolute",
                      right: 0,
                      top: 0,
                      width: DEPTH,
                      height: H,
                      transformOrigin: "100% 50%",
                      transform: "rotateY(90deg)",
                      background:
                        "repeating-linear-gradient(to bottom, #ddd5c4 0, #ddd5c4 1px, #f4efe6 1px, #f4efe6 3px)",
                    }}
                  />

                  {/* Top face */}
                  <div
                    style={{
                      position: "absolute",
                      left: 0,
                      top: 0,
                      width: W,
                      height: DEPTH,
                      transformOrigin: "50% 0%",
                      transform: "rotateX(90deg)",
                      background:
                        "linear-gradient(to bottom, #ccc4b4, #e8e0d0)",
                    }}
                  />
                </motion.div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
