import React, { useEffect, useRef } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, GitFork, ArrowUpRight, Sparkles, Folder, Terminal } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const getLanguageColor = (lang: string) => {
  switch (lang.toLowerCase()) {
    case 'typescript':
      return 'bg-blue-500';
    case 'javascript':
      return 'bg-yellow-400';
    case 'java':
      return 'bg-amber-600';
    case 'c':
      return 'bg-sky-400';
    case 'python':
      return 'bg-emerald-500';
    case 'html':
      return 'bg-orange-500';
    default:
      return 'bg-slate-400';
  }
};

export const GithubSection: React.FC = () => {
  const { profile } = usePortfolio();
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const cards = cardsRef.current?.querySelectorAll('.repo-card');
      if (cards && cards.length > 0) {
        gsap.from(cards, {
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          opacity: 0,
          y: 25,
          stagger: 0.12,
          duration: 0.8,
          ease: 'power3.out',
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [profile.repositories]);

  return (
    <section
      id="github"
      ref={sectionRef}
      className="relative py-28 bg-[#090a0f] border-t border-white/[0.04] overflow-hidden"
    >
      <div className="absolute left-1/3 top-10 w-96 h-96 bg-sky-500/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-white/10 text-slate-300 text-xs font-mono mb-3">
              <Terminal className="w-3.5 h-3.5 text-sky-400" />
              <span>OPEN SOURCE & LABS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white tracking-tight">
              Code & Experiments
            </h2>
            <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-xl">
              Public repositories, experimental scripts, and hands-on coding repositories.
            </p>
          </div>

          <div>
            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white text-slate-950 font-medium text-sm hover:bg-slate-200 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.15)] group"
            >
              <Github className="w-4 h-4 text-slate-950" />
              <span>View GitHub</span>
              <ArrowUpRight className="w-4 h-4 text-slate-950 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>

        {/* Repositories Cards Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {profile.repositories.map((repo) => (
            <a
              key={repo.id}
              href={repo.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="repo-card glass-card rounded-2xl p-6 border border-white/10 group hover:border-sky-400/50 flex flex-col justify-between transition-all duration-300 shadow-lg relative overflow-hidden"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-slate-400 group-hover:text-sky-300 transition-colors">
                    <Folder className="w-5 h-5 text-sky-400" />
                    <span className="font-mono text-sm font-semibold text-white group-hover:text-sky-300 transition-colors">
                      {repo.name}
                    </span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-sky-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>

                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-light mb-6">
                  {repo.description}
                </p>
              </div>

              <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-slate-400">
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${getLanguageColor(repo.language)}`} />
                  <span>{repo.language}</span>
                </div>
                <span className="text-slate-500 group-hover:text-slate-300 transition-colors">Public Repository</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
