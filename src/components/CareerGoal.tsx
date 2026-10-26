import React, { useEffect, useRef } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Compass, Sparkles, Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const CareerGoal: React.FC = () => {
  const { profile } = usePortfolio();
  const sectionRef = useRef<HTMLElement>(null);
  const wordsContainerRef = useRef<HTMLDivElement>(null);

  // Split quote text into individual words for scroll-scrub highlighting
  const words = profile.careerGoalText.split(' ');

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const wordElements = wordsContainerRef.current?.querySelectorAll('.editorial-word');
      if (wordElements && wordElements.length > 0) {
        gsap.to(wordElements, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'bottom 40%',
            scrub: 0.8,
          },
          color: '#ffffff',
          textShadow: '0 0 20px rgba(56, 189, 248, 0.4)',
          stagger: 0.05,
          ease: 'power1.inOut',
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [profile.careerGoalText]);

  return (
    <section
      id="career-goal"
      ref={sectionRef}
      className="relative py-36 bg-[#090a0f] border-t border-white/[0.04] overflow-hidden"
    >
      {/* Ambient background light */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-sky-500/10 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Subtle Pill Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-mono mb-8">
          <Compass className="w-3.5 h-3.5" />
          <span>LONG-TERM VISION</span>
        </div>

        {/* Large Editorial Heading: Building My Future Through Technology */}
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-sky-300 tracking-tight leading-tight mb-12">
          {profile.careerGoalHeading}
        </h2>

        {/* Quote Container with Editorial Scroll Highlight Effect */}
        <div className="relative max-w-4xl mx-auto p-8 sm:p-12 rounded-3xl glass-card border border-white/10 shadow-2xl">
          <div className="absolute top-6 left-6 text-white/10 pointer-events-none">
            <Quote className="w-12 h-12" />
          </div>

          <div
            ref={wordsContainerRef}
            className="editorial-quote font-sans font-medium text-slate-400 leading-relaxed text-center"
          >
            “
            {words.map((word, index) => (
              <span
                key={index}
                className="editorial-word mr-2 inline-block transition-colors duration-200"
              >
                {word}
              </span>
            ))}
            ”
          </div>

          {/* Signature / Author */}
          <div className="mt-8 pt-6 border-t border-white/[0.08] flex items-center justify-center gap-3">
            <div className="w-8 h-8 rounded-full bg-sky-500/20 border border-sky-500/40 flex items-center justify-center text-sky-300">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="text-left">
              <p className="text-sm font-display font-bold text-white tracking-wide">
                {profile.fullName}
              </p>
              <p className="text-xs font-mono text-sky-400">
                {profile.role} • {profile.university}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
