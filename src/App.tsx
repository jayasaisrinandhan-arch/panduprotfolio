import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { PortfolioProvider } from './context/PortfolioContext';
import { LoadingScreen } from './components/LoadingScreen';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Education } from './components/Education';
import { Skills } from './components/Skills';
import { CurrentLearning } from './components/CurrentLearning';
import { Interests } from './components/Interests';
import { Strengths } from './components/Strengths';
import { CareerGoal } from './components/CareerGoal';
import { Projects } from './components/Projects';
import { GithubSection } from './components/GithubSection';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ProfileEditorModal } from './components/ProfileEditorModal';
import { ToastContainer } from './components/ToastContainer';

gsap.registerPlugin(ScrollTrigger);

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Initialize Lenis smooth scroll and connect with GSAP ScrollTrigger
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });

    // Synchronize Lenis scroll with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(updateTicker);
    };
  }, []);

  return (
    <PortfolioProvider>
      <div className="min-h-screen bg-[#090a0f] text-slate-100 flex flex-col font-sans selection:bg-sky-500/30 selection:text-sky-200">
        {/* Loading Screen Overlay */}
        {isLoading && (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        )}

        {/* Global Navigation */}
        <Navbar />

        {/* Main Content Sections */}
        <main className="flex-1">
          <Hero />
          <About />
          <Education />
          <Skills />
          <CurrentLearning />
          <Interests />
          <Strengths />
          <CareerGoal />
          <Projects />
          <GithubSection />
          <Contact />
        </main>

        {/* Footer */}
        <Footer />

        {/* Protected Profile Editor Modal */}
        <ProfileEditorModal />

        {/* Toast Alerts */}
        <ToastContainer />
      </div>
    </PortfolioProvider>
  );
};

export default App;
