import React, { useEffect, useRef } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GraduationCap, Calendar, MapPin, PlusCircle, CheckCircle, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const Education: React.FC = () => {
  const { profile, setIsEditorOpen } = usePortfolio();
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const items = timelineRef.current?.querySelectorAll('.timeline-item');
      if (items && items.length > 0) {
        gsap.from(items, {
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
          opacity: 0,
          y: 40,
          stagger: 0.2,
          duration: 0.9,
          ease: 'power3.out',
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [profile.education]);

  return (
    <section
      id="education"
      ref={sectionRef}
      className="relative py-28 bg-[#0a0c12] border-t border-white/[0.04] overflow-hidden"
    >
      <div className="absolute right-0 top-1/3 w-80 h-80 bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>QUALIFICATIONS & PATH</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white tracking-tight">
            Academic Journey
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-indigo-400 to-sky-400 mx-auto mt-4 rounded-full" />
        </div>

        {/* Timeline Container */}
        <div ref={timelineRef} className="relative pl-6 sm:pl-10 border-l-2 border-white/10 space-y-12 ml-2 sm:ml-6">
          {profile.education.map((item) => (
            <div key={item.id} className="timeline-item relative group">
              {/* Timeline Indicator Node */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-6 h-6 rounded-full bg-slate-900 border-2 border-sky-400 flex items-center justify-center shadow-[0_0_12px_rgba(56,189,248,0.6)] group-hover:scale-125 transition-transform duration-300">
                <div className="w-2 h-2 rounded-full bg-sky-300" />
              </div>

              {/* Education Card */}
              <div className="glass-card p-6 sm:p-8 rounded-2xl border border-white/10 relative overflow-hidden">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/25 text-xs font-mono text-sky-300">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Status: {item.status}</span>
                  </div>

                  <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {item.timeline}
                    </span>
                    {item.location && (
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        {item.location}
                      </span>
                    )}
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-display font-bold text-white mb-2">
                  {item.degree}
                </h3>

                <div className="flex items-center gap-2 text-sky-400 text-sm sm:text-base font-medium mb-4">
                  <GraduationCap className="w-5 h-5 text-indigo-400" />
                  <span>{item.institution}</span>
                </div>

                {item.description && (
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
                    {item.description}
                  </p>
                )}

                <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center gap-2 text-xs text-slate-400">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>Actively building foundations in CS, algorithms, software engineering, and systems.</span>
                </div>
              </div>
            </div>
          ))}

          {/* Reserved Space for Future Education Milestone */}
          <div className="timeline-item relative group opacity-75 hover:opacity-100 transition-opacity">
            <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-6 h-6 rounded-full bg-slate-900 border-2 border-dashed border-slate-600 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-500" />
            </div>

            <div className="p-6 rounded-2xl border border-dashed border-white/10 bg-white/[0.01] hover:border-sky-500/30 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h4 className="text-base font-semibold text-slate-300">
                  Space for Future Education & Certifications
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Additional degrees, specializations, or certifications can be added anytime through the profile editor.
                </p>
              </div>

              <button
                onClick={() => setIsEditorOpen(true)}
                className="px-3.5 py-2 rounded-lg bg-charcoal-800 hover:bg-charcoal-700 text-xs font-medium text-sky-300 border border-white/10 flex items-center gap-1.5 shrink-0 transition-colors"
              >
                <PlusCircle className="w-3.5 h-3.5 text-sky-400" />
                <span>Add Education</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
