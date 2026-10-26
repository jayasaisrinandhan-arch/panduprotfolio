import React, { createContext, useContext, useState, useEffect } from 'react';
import { PortfolioProfile } from '../types/portfolio';
import { initialPortfolioData } from '../data/initialPortfolioData';

interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  text: string;
}

interface PortfolioContextType {
  profile: PortfolioProfile;
  updateProfile: (updated: PortfolioProfile) => boolean;
  resetToDefaults: () => void;
  isEditorOpen: boolean;
  setIsEditorOpen: (open: boolean) => void;
  isAuthenticated: boolean;
  verifyPin: (pin: string) => boolean;
  toasts: ToastMessage[];
  addToast: (type: 'success' | 'error' | 'info', text: string) => void;
  removeToast: (id: string) => void;
}

const STORAGE_KEY = 'pandu_portfolio_profile_v1';
const ADMIN_PIN = 'pandu2026';

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<PortfolioProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...initialPortfolioData, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.warn("Failed to read profile from localStorage", e);
    }
    return initialPortfolioData;
  });

  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: 'success' | 'error' | 'info', text: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, type, text }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const updateProfile = (updated: PortfolioProfile): boolean => {
    try {
      setProfile(updated);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      addToast('success', 'Profile updated and saved successfully!');
      return true;
    } catch (err) {
      console.error("Failed to save profile", err);
      addToast('error', 'Error saving profile to local storage.');
      return false;
    }
  };

  const resetToDefaults = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      setProfile(initialPortfolioData);
      addToast('info', 'Profile reset to original specifications.');
    } catch (err) {
      console.error(err);
    }
  };

  const verifyPin = (pin: string): boolean => {
    if (pin.trim() === ADMIN_PIN) {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  return (
    <PortfolioContext.Provider
      value={{
        profile,
        updateProfile,
        resetToDefaults,
        isEditorOpen,
        setIsEditorOpen,
        isAuthenticated,
        verifyPin,
        toasts,
        addToast,
        removeToast,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
