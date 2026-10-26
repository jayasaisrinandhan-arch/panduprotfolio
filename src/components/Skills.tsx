import React, { useEffect, useRef } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Terminal, 
  Coffee, 
  Code2, 
  FileCode, 
  Palette, 
  Network, 
  BrainCircuit, 
  GitBranch, 
  Github, 
  FileSpreadsheet, 
  Sparkles,
  Layers
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Icon mapping helper
const getSkillIcon = (name: string) => {
  const lower = name.toLowerCase();
  if (lower.includes('java') && !lower.includes('script')) return <Coffee className="w-5 h-5 text-amber-400" />;
  if (lower.includes('python')) return <Terminal className="w-5 h-5 text-emerald-400" />;
  if (lower.includes('c') && lower.length <= 2) return <Code2 className="w-5 h-5 text-sky-400" />;
  if (lower.includes('html')) return <FileCode className="w-5 h-5 text-orange-400" />;
  if (lower.includes('css')) return <Palette className="w-5 h-5 text-blue-400" />;
  if (lower.includes('data structure')) return <Network className="w-5 h-5 text-purple-400" />;
  if (lower.includes('problem solving')) return <BrainCircuit className="w-5 h-5 text-cyan-400" />;
  if (lower === 'git') return <GitBranch className="w-5 h-5 text-rose-400" />;
  if (lower.includes('github')) return <Github className="w-5 h-5 text-white" />;
  if (lower.includes('office')) return <FileSpreadsheet className="w-5 h-5 text-teal-400" />;
  return <Code2 className="w-5 h-5 text-sky-400" />;
};

export const Skills: React.FC = () => {
  const { profile } = usePortfolio();
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const cards = cardsRef.current?.querySelectorAll('.skill-card');
      if (cards && cards.length > 0) {
        gsap.from(cards, {
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          opacity: 0,
          y: 35,
          stagger: 0.15,
          duration: 0.8,
          ease: 'power3.out',
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [profile.skillCategories]);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-28 bg-[#090a0f] border-t border-white/[0.04] overflow-hidden"
    >
      <div className="absolute left-1/3 top-10 w-96 h-96 bg-cyan-500/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>CORE COMPETENCIES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white tracking-tight">
            Technical Skills
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-3 max-w-xl mx-auto">
            Grounded in computer science fundamentals, programming logic, and developer tooling.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-indigo-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* Categories Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {profile.skillCategories.map((category, index) => (
            <div
              key={index}
              className="skill-card glass-card rounded-2xl p-6 border border-white/10 flex flex-col justify-between group hover:border-sky-500/40 relative overflow-hidden transition-all duration-300"
            >
              {/* Subtle top accent gradient */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-sky-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div>
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-charcoal-800/80 border border-white/10 flex items-center justify-center text-sky-400 group-hover:scale-105 group-hover:border-sky-400/40 transition-all duration-300">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg text-white group-hover:text-sky-300 transition-colors">
                      {category.title}
                    </h3>
                  </div>
                </div>

                <p className="text-xs text-slate-400 mb-6 font-light">
                  {category.description}
                </p>

                {/* Skills List */}
                <div className="space-y-3">
                  {category.skills.map((skill, sIdx) => (
                    <div
                      key={sIdx}
                      className="p-3 rounded-xl bg-charcoal-900/60 border border-white/[0.06] hover:border-sky-500/30 flex items-center justify-between transition-colors group/item"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-1.5 rounded-lg bg-white/[0.03] group-hover/item:bg-white/[0.08] transition-colors">
                          {getSkillIcon(skill.name)}
                        </div>
                        <span className="text-sm font-medium text-slate-200 group-hover/item:text-white">
                          {skill.name}
                        </span>
                      </div>

                      {skill.levelBadge && (
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-white/[0.04] text-slate-400 border border-white/[0.06] group-hover/item:border-sky-500/30 group-hover/item:text-sky-300 transition-colors">
                          {skill.levelBadge}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer Status */}
              <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>{category.skills.length} Items</span>
                <span className="text-sky-400/80">Active Practice</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
