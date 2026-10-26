import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLHeadingElement>(null);
  const tagRef = useRef<HTMLParagraphElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      const timer = setTimeout(() => {
        onComplete();
      }, 500);
      return () => clearTimeout(timer);
    }

    const tl = gsap.timeline({
      onComplete: () => {
        onComplete();
      }
    });

    // 1. Initial State
    gsap.set(brandRef.current, { opacity: 0, y: 20 });
    gsap.set(tagRef.current, { opacity: 0, y: 15 });
    gsap.set(lineRef.current, { scaleX: 0, transformOrigin: "left center" });

    // 2. Entrance & Progress animation
    tl.to(brandRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power3.out",
    })
    .to(tagRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: "power2.out",
    }, "-=0.3")
    .to(lineRef.current, {
      scaleX: 1,
      duration: 1.1,
      ease: "power2.inOut",
    }, "-=0.2")
    .to([brandRef.current, tagRef.current, lineRef.current], {
      opacity: 0,
      y: -20,
      duration: 0.4,
      ease: "power2.in",
      stagger: 0.05
    }, "+=0.2")
    .to(containerRef.current, {
      yPercent: -100,
      duration: 0.85,
      ease: "expo.inOut",
    });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#07080c] select-none pointer-events-auto"
      aria-label="Loading screen"
    >
      {/* Subtle radial ambient background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_40%,rgba(56,189,248,0.08),transparent_70%)] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center px-4 max-w-md w-full">
        {/* Brand Name */}
        <h1
          ref={brandRef}
          className="font-display font-extrabold tracking-wider text-4xl sm:text-5xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-white via-sky-100 to-sky-400 drop-shadow-sm mb-3"
        >
          PANDU.DEV
        </h1>

        {/* Subtitle / Tagline */}
        <p
          ref={tagRef}
          className="text-xs sm:text-sm font-medium tracking-[0.3em] uppercase text-sky-400/80 mb-8"
        >
          Design • Code • Create
        </p>

        {/* Progress Line Track & Indicator */}
        <div className="w-48 sm:w-64 h-[2px] bg-white/10 rounded-full overflow-hidden relative">
          <div
            ref={lineRef}
            className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-sky-500 via-cyan-300 to-indigo-400 shadow-[0_0_12px_rgba(56,189,248,0.8)]"
          />
        </div>
      </div>
    </div>
  );
};
