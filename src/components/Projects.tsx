import React, { useEffect, useRef } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FolderGit2, Github, ExternalLink, Sparkles, Clock, Code2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const Projects: React.FC = () => {
  const { profile } = usePortfolio();
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const cards = gridRef.current?.querySelectorAll('.project-card');
      if (cards && cards.length > 0) {
        gsap.from(cards, {
          scrollTrigger: {
            trigger: gridRef.current,
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
  }, [profile.projects]);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-28 bg-[#0a0c12] border-t border-white/[0.04] overflow-hidden"
    >
      <div className="absolute right-1/3 top-1/4 w-96 h-96 bg-indigo-500/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-mono mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>PORTFOLIO WORK</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white tracking-tight">
            Things I Build
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-3 max-w-xl mx-auto">
            Practical applications, engineering experiments, and upcoming software builds.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-sky-400 to-indigo-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* Projects Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {profile.projects.map((proj) => (
            <div
              key={proj.id}
              className="project-card glass-card rounded-2xl border border-white/10 overflow-hidden flex flex-col justify-between group hover:border-sky-400/40 transition-all duration-300 shadow-xl"
            >
              <div>
                {/* Visual Placeholder Header */}
                <div className="relative h-48 bg-charcoal-900/90 border-b border-white/[0.08] flex flex-col items-center justify-center p-6 text-center overflow-hidden">
                  {/* Subtle Grid in thumbnail */}
                  <div className="absolute inset-0 bg-grid-pattern opacity-30" />
                  
                  {/* Ambient glowing spotlight behind placeholder */}
                  <div className="absolute w-32 h-32 bg-sky-500/15 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-500" />

                  <div className="relative z-10 flex flex-col items-center">
                    <div className="w-14 h-14 rounded-2xl bg-charcoal-800 border border-white/10 flex items-center justify-center text-sky-400 mb-3 group-hover:scale-110 group-hover:border-sky-400/50 transition-all duration-300 shadow-lg">
                      <Code2 className="w-7 h-7" />
                    </div>
                    <span className="text-xs font-mono text-slate-400 font-medium tracking-wide">
                      {proj.imagePlaceholderText}
                    </span>
                  </div>

                  {/* Coming Soon Badge */}
                  {proj.isComingSoon && (
                    <div className="absolute top-3 right-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/90 border border-amber-500/40 text-amber-300 text-[11px] font-mono shadow-md backdrop-blur-md">
                      <Clock className="w-3 h-3 text-amber-400 animate-pulse" />
                      <span>Coming Soon</span>
                    </div>
                  )}
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-sky-400 font-medium">
                    {proj.category}
                  </span>

                  <h3 className="text-xl font-display font-bold text-white mt-1.5 mb-3 group-hover:text-sky-300 transition-colors">
                    {proj.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-light mb-6">
                    {proj.description}
                  </p>

                  {/* Technologies Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {proj.technologies.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-1 rounded-md bg-white/[0.03] text-slate-300 text-xs font-mono border border-white/[0.06] group-hover:border-sky-400/20 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons: GitHub & Live Demo */}
              <div className="p-6 pt-0 border-t border-white/[0.06] mt-auto">
                <div className="flex items-center gap-3 pt-4">
                  {proj.githubUrl ? (
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2 px-3 rounded-lg bg-charcoal-800 hover:bg-charcoal-700 text-xs font-medium text-white border border-white/10 flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>Source</span>
                    </a>
                  ) : (
                    <button
                      disabled
                      className="flex-1 py-2 px-3 rounded-lg bg-white/[0.02] text-xs font-medium text-slate-600 border border-white/[0.04] flex items-center justify-center gap-1.5 cursor-not-allowed"
                      title="Repository will be linked upon release"
                    >
                      <Github className="w-3.5 h-3.5 text-slate-600" />
                      <span>GitHub</span>
                    </button>
                  )}

                  {proj.liveDemoUrl ? (
                    <a
                      href={proj.liveDemoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2 px-3 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 text-xs font-medium text-sky-300 border border-sky-500/30 flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Demo</span>
                    </a>
                  ) : (
                    <button
                      disabled
                      className="flex-1 py-2 px-3 rounded-lg bg-white/[0.02] text-xs font-medium text-slate-600 border border-white/[0.04] flex items-center justify-center gap-1.5 cursor-not-allowed"
                      title="Demo will be deployed upon completion"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-slate-600" />
                      <span>Live Demo</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
