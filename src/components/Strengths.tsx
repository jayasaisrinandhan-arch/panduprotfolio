import React, { useEffect, useRef } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Zap, Target, Users, Lightbulb, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const getStrengthIcon = (iconName: string) => {
  switch (iconName.toLowerCase()) {
    case 'zap':
      return <Zap className="w-6 h-6 text-amber-400" />;
    case 'target':
      return <Target className="w-6 h-6 text-rose-400" />;
    case 'users':
      return <Users className="w-6 h-6 text-sky-400" />;
    case 'lightbulb':
      return <Lightbulb className="w-6 h-6 text-yellow-300" />;
    default:
      return <Zap className="w-6 h-6 text-sky-400" />;
  }
};

export const Strengths: React.FC = () => {
  const { profile } = usePortfolio();
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const cards = cardsRef.current?.querySelectorAll('.strength-card');
      if (cards && cards.length > 0) {
        gsap.from(cards, {
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          opacity: 0,
          y: 30,
          stagger: 0.12,
          duration: 0.8,
          ease: 'power3.out',
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [profile.strengths]);

  return (
    <section
      id="strengths"
      ref={sectionRef}
      className="relative py-28 bg-[#0a0c12] border-t border-white/[0.04] overflow-hidden"
    >
      <div className="absolute right-10 bottom-1/4 w-80 h-80 bg-amber-500/5 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-mono mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>CHARACTER & ATTRIBUTES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white tracking-tight">
            What Defines Me
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-3 max-w-xl mx-auto">
            The core work ethic and mindset I bring to software development and collaborative teams.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-amber-400 to-sky-400 mx-auto mt-4 rounded-full" />
        </div>

        {/* 4 Cards Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {profile.strengths.map((item) => (
            <div
              key={item.id}
              className="strength-card glass-card rounded-2xl p-6 sm:p-7 border border-white/10 group hover:border-amber-400/40 relative overflow-hidden transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-charcoal-900 border border-white/10 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:border-amber-400/30 transition-all duration-300 shadow-lg">
                  {getStrengthIcon(item.iconName)}
                </div>

                <h3 className="text-xl font-display font-bold text-white mb-2.5 group-hover:text-amber-200 transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-light">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center gap-2 text-[11px] font-mono text-slate-400">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>Core Value</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
