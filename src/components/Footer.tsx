import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Code2, ArrowUp, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const { profile } = usePortfolio();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#07080d] border-t border-white/[0.08] py-16 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-12 border-b border-white/[0.06]">
          {/* Brand & Personal Signature */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2.5 mb-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white">
                <Code2 className="w-4 h-4" />
              </div>
              <span className="font-display font-extrabold text-2xl text-white tracking-tight">
                {profile.brandName}
              </span>
            </div>

            <p className="text-sm font-medium text-slate-300">
              {profile.fullName}
            </p>

            <p className="text-xs font-mono text-sky-400/90 mt-1 italic">
              “Learning. Building. Growing.”
            </p>
          </div>

          {/* Quick Navigation Links */}
          <nav className="flex items-center gap-6 text-xs sm:text-sm font-medium">
            <button
              onClick={() => scrollTo('hero')}
              className="text-slate-400 hover:text-white transition-colors"
            >
              Home
            </button>
            <span className="text-white/20">•</span>
            <button
              onClick={() => scrollTo('about')}
              className="text-slate-400 hover:text-white transition-colors"
            >
              About
            </button>
            <span className="text-white/20">•</span>
            <button
              onClick={() => scrollTo('skills')}
              className="text-slate-400 hover:text-white transition-colors"
            >
              Skills
            </button>
            <span className="text-white/20">•</span>
            <button
              onClick={() => scrollTo('contact')}
              className="text-slate-400 hover:text-white transition-colors"
            >
              Contact
            </button>
          </nav>

          {/* Back to top button */}
          <div>
            <button
              onClick={scrollToTop}
              className="w-10 h-10 rounded-xl bg-charcoal-800 hover:bg-charcoal-700 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-all group"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Copyright notice */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-slate-400 gap-4">
          <p>© 2026 {profile.fullName}. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Designed for <span className="text-sky-400 font-semibold">{profile.brandName}</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
