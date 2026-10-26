import React, { useEffect, useRef } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code, Globe, Bot, LineChart, Layout, Rocket, Sparkles, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const getInterestIcon = (iconName: string) => {
  switch (iconName.toLowerCase()) {
    case 'code':
      return <Code className="w-6 h-6 text-sky-400" />;
    case 'globe':
      return <Globe className="w-6 h-6 text-cyan-400" />;
    case 'bot':
      return <Bot className="w-6 h-6 text-indigo-400" />;
    case 'linechart':
      return <LineChart className="w-6 h-6 text-emerald-400" />;
    case 'layout':
      return <Layout className="w-6 h-6 text-violet-400" />;
    case 'rocket':
      return <Rocket className="w-6 h-6 text-amber-400" />;
    default:
      return <Code className="w-6 h-6 text-sky-400" />;
  }
};

export const Interests: React.FC = () => {
  const { profile } = usePortfolio();
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const cards = gridRef.current?.querySelectorAll('.interest-card');
      if (cards && cards.length > 0) {
        gsap.from(cards, {
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          opacity: 0,
          y: 25,
          stagger: 0.1,
          duration: 0.7,
          ease: 'power3.out',
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [profile.interests]);

  return (
    <section
      id="interests"
      ref={sectionRef}
      className="relative py-28 bg-[#090a0f] border-t border-white/[0.04] overflow-hidden"
    >
      <div className="absolute left-1/4 bottom-10 w-96 h-96 bg-violet-500/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-mono mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AREAS OF PASSION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white tracking-tight">
            My Interests
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-3 max-w-xl mx-auto">
            Disciplines and frontiers that inspire me to build, analyze, and innovate.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-violet-400 to-sky-400 mx-auto mt-4 rounded-full" />
        </div>

        {/* Interests Grid */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {profile.interests.map((item) => (
            <div
              key={item.id}
              className="interest-card glass-card rounded-2xl p-6 sm:p-7 border border-white/10 group hover:border-sky-400/50 hover:bg-charcoal-800/80 transition-all duration-300 relative overflow-hidden"
            >
              {/* Subtle radial glow on card hover */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 rounded-full blur-2xl group-hover:bg-sky-500/20 transition-all duration-300 pointer-events-none" />

              <div className="flex items-start justify-between mb-5">
                <div className="w-12 h-12 rounded-xl bg-charcoal-900 border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:border-sky-400/40 transition-all duration-300 shadow-md">
                  {getInterestIcon(item.iconName)}
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-600 group-hover:text-sky-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>

              <h3 className="font-display font-bold text-lg sm:text-xl text-white mb-2 group-hover:text-sky-300 transition-colors">
                {item.title}
              </h3>

              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-light">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
