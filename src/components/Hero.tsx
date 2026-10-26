import React, { useEffect, useRef } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDownRight, Mail, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const Hero: React.FC = () => {
  const { profile } = usePortfolio();
  const heroRef = useRef<HTMLElement>(null);
  const bgTextRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Subtle interactive particle canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const particles: Array<{
      x: number;
      y: number;
      radius: number;
      vx: number;
      vy: number;
      alpha: number;
    }> = [];

    // Subtle 40 glowing points
    for (let i = 0; i < 35; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5 + 0.5,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        alpha: Math.random() * 0.4 + 0.1,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(56, 189, 248, ${p.alpha})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = 'rgba(56, 189, 248, 0.5)';
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // GSAP ScrollTrigger for Hero entrance & Parallax
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Content fade & slide in
      gsap.from(contentRef.current, {
        opacity: 0,
        y: 40,
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.2,
      });

      // Subtle parallax movement of background typography "PANDU"
      if (bgTextRef.current && heroRef.current) {
        gsap.to(bgTextRef.current, {
          yPercent: 35,
          scale: 1.08,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.2,
          },
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-16 bg-[#090a0f]"
    >
      {/* Background Subtle Grid & Lights */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-sky-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[350px] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Interactive Particle Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />

      {/* Large Background Typography Element: PANDU */}
      <div
        ref={bgTextRef}
        className="absolute inset-0 flex items-center justify-center z-0 select-none pointer-events-none overflow-hidden"
      >
        <span className="hero-bg-text font-black tracking-widest text-slate-800/10 transform-gpu translate-y-6">
          {profile.heroBgText}
        </span>
      </div>

      {/* Foreground Content */}
      <div
        ref={contentRef}
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center"
      >
        {/* Status Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-sky-500/25 text-xs font-mono text-sky-300 shadow-[0_0_15px_rgba(56,189,248,0.15)] mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500" />
          </span>
          <Sparkles className="w-3.5 h-3.5 text-sky-400" />
          <span>{profile.role} • {profile.university}</span>
        </div>

        {/* Main Heading: I. JAYASAISRINANDHAN */}
        <h1 className="hero-title font-display font-extrabold text-white tracking-tight text-center uppercase mb-5">
          <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-slate-400">
            {profile.fullName}
          </span>
        </h1>

        {/* Supporting text */}
        <p className="text-base sm:text-xl md:text-2xl font-medium text-sky-400/90 tracking-wide mb-6 max-w-3xl">
          {profile.supportingTitle}
        </p>

        {/* Description */}
        <p className="text-sm sm:text-base md:text-lg text-slate-400 max-w-2xl leading-relaxed mb-10 font-normal">
          “{profile.heroDescription}”
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button
            onClick={() => scrollTo('about')}
            className="w-full sm:w-auto group relative px-8 py-4 rounded-xl font-medium text-sm text-slate-950 bg-gradient-to-r from-sky-400 via-cyan-300 to-sky-400 hover:from-sky-300 hover:to-cyan-200 shadow-[0_0_25px_rgba(56,189,248,0.35)] transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
          >
            <span>Explore My Portfolio</span>
            <ArrowDownRight className="w-4 h-4 text-slate-950 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
          </button>

          <button
            onClick={() => scrollTo('contact')}
            className="w-full sm:w-auto px-8 py-4 rounded-xl font-medium text-sm text-white bg-slate-900/80 hover:bg-slate-800/80 border border-white/10 hover:border-sky-400/50 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg backdrop-blur-sm transform hover:-translate-y-0.5"
          >
            <Mail className="w-4 h-4 text-sky-400" />
            <span>Contact Me</span>
          </button>
        </div>

        {/* Scroll indicator */}
        <div className="mt-16 animate-bounce opacity-50 flex flex-col items-center gap-1.5 cursor-pointer" onClick={() => scrollTo('about')}>
          <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400">Scroll</span>
          <div className="w-5 h-8 rounded-full border border-slate-700 flex items-start justify-center p-1">
            <div className="w-1 h-2 rounded-full bg-sky-400 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
};
