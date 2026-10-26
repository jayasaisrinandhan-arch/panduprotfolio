import React, { useEffect, useRef } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BookOpen, Sparkles, Binary, Flame, Cpu, GitCommit } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const getTopicIcon = (index: number) => {
  switch (index % 5) {
    case 0:
      return <BookOpen className="w-5 h-5 text-amber-400" />;
    case 1:
      return <Binary className="w-5 h-5 text-sky-400" />;
    case 2:
      return <Flame className="w-5 h-5 text-orange-400" />;
    case 3:
      return <Cpu className="w-5 h-5 text-emerald-400" />;
    case 4:
      return <GitCommit className="w-5 h-5 text-purple-400" />;
    default:
      return <BookOpen className="w-5 h-5 text-sky-400" />;
  }
};

export const CurrentLearning: React.FC = () => {
  const { profile } = usePortfolio();
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const cards = containerRef.current?.querySelectorAll('.learning-card');
      if (cards && cards.length > 0) {
        gsap.from(cards, {
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          opacity: 0,
          scale: 0.95,
          y: 30,
          stagger: 0.12,
          duration: 0.8,
          ease: 'power3.out',
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [profile.currentLearning]);

  return (
    <section
      id="learning"
      ref={sectionRef}
      className="relative py-28 bg-[#0a0c12] border-t border-white/[0.04] overflow-hidden"
    >
      <div className="absolute right-1/4 top-1/2 w-80 h-80 bg-emerald-500/5 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ACTIVE STUDY & EXPLORATION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white tracking-tight">
            Currently Learning
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-3 max-w-xl mx-auto">
            Deepening domain understanding through structured curriculum and personal experiments.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-emerald-400 to-sky-400 mx-auto mt-4 rounded-full" />
        </div>

        {/* Learning Cards Grid */}
        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {profile.currentLearning.map((item, index) => (
            <div
              key={item.id}
              className={`learning-card glass-card rounded-2xl p-6 sm:p-7 border border-white/10 flex flex-col justify-between group hover:border-emerald-500/40 relative overflow-hidden transition-all duration-300 ${
                index === 3 ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              <div>
                {/* Header Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-charcoal-800 border border-white/10 flex items-center justify-center group-hover:scale-105 transition-transform">
                    {getTopicIcon(index)}
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-[11px] font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    <span>In Progress</span>
                  </div>
                </div>

                <h3 className="text-lg sm:text-xl font-display font-bold text-white group-hover:text-emerald-300 transition-colors mb-2.5">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed mb-6">
                  {item.description}
                </p>
              </div>

              {/* Tags */}
              <div className="pt-4 border-t border-white/[0.06]">
                <div className="text-[11px] font-mono text-slate-400 mb-2">Key Areas:</div>
                <div className="flex flex-wrap gap-1.5">
                  {item.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 rounded-md bg-white/[0.03] text-slate-300 text-xs font-mono border border-white/[0.06] group-hover:border-emerald-500/20 group-hover:text-emerald-200 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
