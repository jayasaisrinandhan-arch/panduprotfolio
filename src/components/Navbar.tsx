import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Menu, X, Shield, Code2 } from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
}

const navItems: NavItem[] = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'education', label: 'Education' },
  { id: 'skills', label: 'Skills' },
  { id: 'learning', label: 'Learning' },
  { id: 'interests', label: 'Interests' },
  { id: 'contact', label: 'Contact' },
];

export const Navbar: React.FC = () => {
  const { profile, setIsEditorOpen } = usePortfolio();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Check current section
      const sections = navItems.map((item) => document.getElementById(item.id));
      const scrollPos = window.scrollY + 180;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i];
        if (sec && sec.offsetTop <= scrollPos) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'py-3.5 bg-[#090b11]/80 backdrop-blur-md border-b border-white/[0.08] shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
            : 'py-6 bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <button
            onClick={() => scrollTo('hero')}
            className="flex items-center gap-2 group text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 rounded-lg"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-sky-500/20 group-hover:scale-105 transition-transform duration-300">
              <Code2 className="w-4 h-4 text-white" />
            </div>
            <span className="font-display font-bold text-xl sm:text-2xl tracking-tight text-white group-hover:text-sky-300 transition-colors">
              {profile.brandName}
            </span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs lg:text-sm font-medium transition-all duration-200 relative ${
                    isActive
                      ? 'text-sky-300 bg-sky-500/10 shadow-[0_0_15px_rgba(56,189,248,0.15)] border border-sky-500/30'
                      : 'text-slate-300 hover:text-white hover:bg-white/[0.05]'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-sky-400 shadow-[0_0_8px_#38bdf8]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action: Profile Editor Trigger */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => setIsEditorOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-medium text-slate-300 bg-charcoal-800/80 hover:bg-charcoal-700/80 border border-white/10 hover:border-sky-400/40 transition-all duration-300 hover:text-sky-300 shadow-sm"
              title="Secure Profile Editor"
            >
              <Shield className="w-3.5 h-3.5 text-sky-400" />
              <span>Edit Profile</span>
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setIsEditorOpen(true)}
              className="p-2 rounded-lg text-slate-300 hover:text-sky-300 hover:bg-white/5"
              aria-label="Profile settings"
            >
              <Shield className="w-4 h-4 text-sky-400" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-200 hover:text-white hover:bg-white/10 focus:outline-none"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-sky-400" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 md:hidden bg-[#07090e]/95 backdrop-blur-2xl pt-24 px-6 flex flex-col justify-between pb-12 animate-in fade-in duration-200">
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`text-left text-lg font-medium px-4 py-3 rounded-xl transition-all ${
                    isActive
                      ? 'text-sky-300 bg-sky-500/15 border border-sky-500/30'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          <div className="pt-6 border-t border-white/10 flex flex-col gap-4">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsEditorOpen(true);
              }}
              className="w-full py-3 rounded-xl bg-charcoal-800 border border-white/10 text-sm font-medium text-sky-300 flex items-center justify-center gap-2"
            >
              <Shield className="w-4 h-4 text-sky-400" />
              <span>Open Profile Editor</span>
            </button>
            <p className="text-center text-xs text-slate-300 font-mono">
              {profile.brandName} • {profile.location}
            </p>
          </div>
        </div>
      )}
    </>
  );
};
