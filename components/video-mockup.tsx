'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

interface VideoMockupProps {
  videoSrc?: string;
  cropBottom?: number; // percentage (0-100) to clip from the bottom of the video
}

/**
 * Laptop mockup — macbase.png as base image, video drawn onto a canvas.
 *
 * Canvas approach eliminates the black-flash loop problem: the canvas retains
 * the last painted frame while the video seeks back to t=0, so there is never
 * a blank frame. RAF loop runs only while the component is in the viewport.
 *
 * Loop strategy: `loop` attribute on <video> lets the browser loop natively
 * (seamless, no black flash). `handleEnded` is a fallback in case the browser
 * fires `ended` instead of looping (e.g. some mobile browsers ignore `loop`
 * on muted videos).
 *
 * Pixel positions derived from Figma node 104-212 (container 996×597):
 *   screen area → left 202px  top 107px  w 593px  h 359px
 *   as % of container → left 20.28%  top 17.92%  w 59.54%  h 60.13%
 */
export function VideoMockup({ videoSrc, cropBottom = 0 }: VideoMockupProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef     = useRef<HTMLVideoElement>(null);
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const rafRef       = useRef<number | null>(null);
  const runningRef   = useRef(false);

  useEffect(() => {
    const video  = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas || !videoSrc) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const tick = () => {
      if (!runningRef.current) return;
      // readyState >= 2 means at least the current frame is available
      if (video.readyState >= 2) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      }
      // canvas retains last frame if readyState < 2 — no black flash
      rafRef.current = requestAnimationFrame(tick);
    };

    const startDrawing = () => {
      if (!runningRef.current) {
        runningRef.current = true;
        tick();
      }
    };

    const stopDrawing = () => {
      runningRef.current = false;
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };

    // Fallback: if browser fires `ended` despite `loop` attribute, restart manually
    const handleEnded = () => {
      video.currentTime = 0;
      video.play().catch(() => {});
    };

    video.addEventListener('ended', handleEnded);
    video.addEventListener('playing', startDrawing);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.preload = 'auto';
          video.play().catch(() => {});
        } else {
          video.pause();
          stopDrawing();
        }
      },
      { threshold: 0.25 }
    );

    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      stopDrawing();
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('playing', startDrawing);
      observer.disconnect();
    };
  }, [videoSrc]);

  return (
    <div ref={containerRef} className="relative w-full">
      {/* macbase — sets container height naturally via image ratio (996×597) */}
      <Image
        src="/cases/macbase.png"
        alt=""
        width={996}
        height={597}
        className="w-full h-auto block pointer-events-none"
      />

      {/* Screen area — pixel-perfect from Figma node 104-212 (996×597 container)
          left 202px → 20.28%   top 107px → 17.92%
          w 593px   → 59.54%   h 359px   → 60.13%  */}
      {videoSrc && (
        <div
          className="absolute overflow-hidden"
          style={{ left: '20.28%', top: '17.92%', width: '59.54%', height: '60.13%' }}
        >
          <canvas
            ref={canvasRef}
            width={593}
            height={359}
            className="absolute inset-0 size-full"
            style={cropBottom > 0 ? { clipPath: `inset(0 0 ${cropBottom}% 0)` } : undefined}
          />
          <video
            ref={videoRef}
            className="absolute opacity-0 pointer-events-none"
            style={{ width: 1, height: 1 }}
            muted
            loop
            playsInline
            preload="none"
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        </div>
      )}
    </div>
  );
}
