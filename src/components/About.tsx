import React, { useEffect, useRef } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { User, GraduationCap, MapPin, Building2, Code, Sparkles, CheckCircle2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const About: React.FC = () => {
  const { profile } = usePortfolio();
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(cardRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        opacity: 0,
        x: -40,
        duration: 1,
        ease: 'power3.out',
      });

      gsap.from(textRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        opacity: 0,
        x: 40,
        duration: 1,
        ease: 'power3.out',
        delay: 0.15,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-28 bg-[#090a0f] border-t border-white/[0.04] overflow-hidden"
    >
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-sky-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-mono mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>DISCOVER MY BACKGROUND</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white tracking-tight">
            About Me
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-sky-400 to-indigo-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* Grid: Profile Card & Bio Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Elegant Profile Card */}
          <div ref={cardRef} className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-md rounded-2xl glass-card p-6 sm:p-8 border border-white/10 relative overflow-hidden group shadow-2xl">
              {/* Card Ambient Glow Accent */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-sky-500/20 rounded-full blur-3xl pointer-events-none group-hover:bg-sky-500/30 transition-all duration-500" />

              {/* Profile Photo Placeholder */}
              <div className="flex flex-col items-center text-center pb-6 border-b border-white/[0.08]">
                <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-2xl overflow-hidden bg-gradient-to-tr from-slate-900 via-charcoal-800 to-slate-800 border-2 border-sky-400/40 shadow-xl flex items-center justify-center mb-4 group-hover:border-sky-400 transition-colors">
                  {profile.avatarUrl ? (
                    <img
                      src={profile.avatarUrl}
                      alt={profile.fullName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-slate-400 p-4">
                      <div className="w-14 h-14 rounded-full bg-sky-500/10 flex items-center justify-center text-sky-300 mb-2 border border-sky-500/20 shadow-[0_0_15px_rgba(56,189,248,0.2)]">
                        <User className="w-7 h-7" />
                      </div>
                      <span className="text-[11px] font-mono text-slate-400">Profile Photo</span>
                    </div>
                  )}

                  <div className="absolute bottom-2 right-2 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-[#0c0e14] shadow-[0_0_8px_#10b981]" title="Active Student" />
                </div>

                <h3 className="text-xl font-display font-bold text-white tracking-wide">
                  {profile.fullName}
                </h3>
                <p className="text-xs font-mono text-sky-400 mt-1">
                  {profile.role}
                </p>
              </div>

              {/* Details List */}
              <div className="pt-6 space-y-3.5">
                <div className="flex items-center justify-between text-xs sm:text-sm py-2 px-3 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                  <div className="flex items-center gap-2.5 text-slate-400">
                    <User className="w-4 h-4 text-sky-400 shrink-0" />
                    <span>Name</span>
                  </div>
                  <span className="font-medium text-slate-200">{profile.fullName}</span>
                </div>

                <div className="flex items-center justify-between text-xs sm:text-sm py-2 px-3 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                  <div className="flex items-center gap-2.5 text-slate-400">
                    <GraduationCap className="w-4 h-4 text-indigo-400 shrink-0" />
                    <span>Course</span>
                  </div>
                  <span className="font-medium text-slate-200">B.Tech CSE</span>
                </div>

                <div className="flex items-center justify-between text-xs sm:text-sm py-2 px-3 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                  <div className="flex items-center gap-2.5 text-slate-400">
                    <Building2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>University</span>
                  </div>
                  <span className="font-medium text-slate-200">{profile.university}</span>
                </div>

                <div className="flex items-center justify-between text-xs sm:text-sm py-2 px-3 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                  <div className="flex items-center gap-2.5 text-slate-400">
                    <MapPin className="w-4 h-4 text-rose-400 shrink-0" />
                    <span>Location</span>
                  </div>
                  <span className="font-medium text-slate-200">Vijayawada</span>
                </div>

                <div className="flex items-center justify-between text-xs sm:text-sm py-2 px-3 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                  <div className="flex items-center gap-2.5 text-slate-400">
                    <Code className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Role</span>
                  </div>
                  <span className="font-medium text-slate-200">Student / Aspiring Developer</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bio & Intent Content */}
          <div ref={textRef} className="lg:col-span-7 flex flex-col justify-center">
            <div className="space-y-6">
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">
                Passionate Developer & Lifelong Learner
              </h3>

              <div className="space-y-4 text-slate-300 text-base sm:text-lg leading-relaxed">
                {profile.aboutText.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-slate-300 font-light">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Core Philosophy Highlights */}
              <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl glass-panel border border-white/[0.06] flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-white">Foundation First</h4>
                    <p className="text-xs text-slate-400 mt-1">
                      Strengthening core computer science, memory management, and structured algorithms.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl glass-panel border border-white/[0.06] flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-white">Continuous Growth</h4>
                    <p className="text-xs text-slate-400 mt-1">
                      Constantly pushing skills forward across web engineering, Java, and intelligent software.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
