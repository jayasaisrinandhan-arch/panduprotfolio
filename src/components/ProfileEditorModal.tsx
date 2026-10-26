import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { PortfolioProfile } from '../types/portfolio';
import { 
  X, 
  Lock, 
  KeyRound, 
  Save, 
  RotateCcw, 
  ShieldCheck, 
  AlertCircle, 
  User, 
  GraduationCap, 
  Wrench, 
  BookOpen, 
  FolderGit2, 
  Link2,
  Check
} from 'lucide-react';

export const ProfileEditorModal: React.FC = () => {
  const { 
    profile, 
    updateProfile, 
    resetToDefaults, 
    isEditorOpen, 
    setIsEditorOpen, 
    isAuthenticated, 
    verifyPin,
    addToast 
  } = usePortfolio();

  // Local draft state to enable Cancel / Discard
  const [draft, setDraft] = useState<PortfolioProfile>(profile);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);
  const [activeTab, setActiveTab] = useState<'identity' | 'about' | 'education' | 'skills' | 'projects' | 'socials'>('identity');
  const [isSaving, setIsSaving] = useState(false);

  // Sync draft whenever modal is opened
  useEffect(() => {
    if (isEditorOpen) {
      setDraft(JSON.parse(JSON.stringify(profile)));
      setPinError(false);
    }
  }, [isEditorOpen, profile]);

  if (!isEditorOpen) return null;

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (verifyPin(pinInput)) {
      setPinError(false);
      setPinInput('');
    } else {
      setPinError(true);
    }
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      const ok = updateProfile(draft);
      setIsSaving(false);
      if (ok) {
        setIsEditorOpen(false);
      }
    }, 400);
  };

  const handleCancel = () => {
    // Discard unsaved changes by restoring draft to active profile
    setDraft(JSON.parse(JSON.stringify(profile)));
    setIsEditorOpen(false);
    addToast('info', 'Profile changes discarded.');
  };

  const handleReset = () => {
    if (window.confirm('Reset all portfolio information to the original specifications?')) {
      resetToDefaults();
      setIsEditorOpen(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-4xl max-h-[92vh] bg-charcoal-900 border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-slate-100">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-charcoal-950">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-sky-500/20 border border-sky-500/40 flex items-center justify-center text-sky-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-display font-bold text-white">
                PANDU.DEV — Profile Editor
              </h2>
              <p className="text-[11px] font-mono text-slate-400">
                {isAuthenticated ? 'Authenticated Session • Live Synchronized' : 'Protected Developer Access'}
              </p>
            </div>
          </div>

          <button
            onClick={handleCancel}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Auth Gate if not authenticated */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-12 flex flex-col items-center justify-center text-center my-auto">
            <div className="w-16 h-16 rounded-2xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 mb-6 shadow-[0_0_25px_rgba(56,189,248,0.2)]">
              <Lock className="w-8 h-8" />
            </div>

            <h3 className="text-xl font-display font-bold text-white mb-2">
              Authentication Required
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 max-w-sm mb-6 leading-relaxed">
              Enter your admin developer PIN to edit portfolio information, skills, and configuration.
            </p>

            <form onSubmit={handlePinSubmit} className="w-full max-w-xs space-y-4">
              <div className="relative">
                <input
                  type="password"
                  value={pinInput}
                  onChange={(e) => {
                    setPinInput(e.target.value);
                    if (pinError) setPinError(false);
                  }}
                  placeholder="Enter PIN (Default: pandu2026)"
                  autoFocus
                  className={`w-full px-4 py-3 rounded-xl bg-charcoal-850 border ${
                    pinError ? 'border-rose-500 text-rose-300' : 'border-white/10 focus:border-sky-400 text-white'
                  } text-center font-mono tracking-widest text-sm focus:outline-none`}
                />
                <KeyRound className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              </div>

              {pinError && (
                <div className="flex items-center justify-center gap-1.5 text-xs text-rose-400">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>Incorrect PIN. (Default: pandu2026)</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-sky-400 to-indigo-500 text-slate-950 font-semibold text-xs tracking-wider uppercase hover:opacity-90 transition-opacity"
              >
                Unlock Editor
              </button>
            </form>
          </div>
        ) : (
          <>
            {/* Tab Navigation */}
            <div className="flex border-b border-white/10 bg-charcoal-850/60 overflow-x-auto text-xs font-medium">
              <button
                onClick={() => setActiveTab('identity')}
                className={`flex items-center gap-2 px-4 py-3 border-b-2 whitespace-nowrap transition-colors ${
                  activeTab === 'identity'
                    ? 'border-sky-400 text-sky-300 bg-white/[0.03]'
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>Identity & Hero</span>
              </button>

              <button
                onClick={() => setActiveTab('about')}
                className={`flex items-center gap-2 px-4 py-3 border-b-2 whitespace-nowrap transition-colors ${
                  activeTab === 'about'
                    ? 'border-sky-400 text-sky-300 bg-white/[0.03]'
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>About & Career</span>
              </button>

              <button
                onClick={() => setActiveTab('education')}
                className={`flex items-center gap-2 px-4 py-3 border-b-2 whitespace-nowrap transition-colors ${
                  activeTab === 'education'
                    ? 'border-sky-400 text-sky-300 bg-white/[0.03]'
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Education</span>
              </button>

              <button
                onClick={() => setActiveTab('skills')}
                className={`flex items-center gap-2 px-4 py-3 border-b-2 whitespace-nowrap transition-colors ${
                  activeTab === 'skills'
                    ? 'border-sky-400 text-sky-300 bg-white/[0.03]'
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                <Wrench className="w-3.5 h-3.5" />
                <span>Skills & Learning</span>
              </button>

              <button
                onClick={() => setActiveTab('projects')}
                className={`flex items-center gap-2 px-4 py-3 border-b-2 whitespace-nowrap transition-colors ${
                  activeTab === 'projects'
                    ? 'border-sky-400 text-sky-300 bg-white/[0.03]'
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                <FolderGit2 className="w-3.5 h-3.5" />
                <span>Projects</span>
              </button>

              <button
                onClick={() => setActiveTab('socials')}
                className={`flex items-center gap-2 px-4 py-3 border-b-2 whitespace-nowrap transition-colors ${
                  activeTab === 'socials'
                    ? 'border-sky-400 text-sky-300 bg-white/[0.03]'
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                <Link2 className="w-3.5 h-3.5" />
                <span>Links & Socials</span>
              </button>
            </div>

            {/* Editor Content Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* TAB: Identity & Hero */}
              {activeTab === 'identity' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1">Brand Logo Name</label>
                      <input
                        type="text"
                        value={draft.brandName}
                        onChange={(e) => setDraft({ ...draft, brandName: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-charcoal-800 border border-white/10 text-white text-sm focus:border-sky-400 focus:outline-none font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1">Full Legal / Display Name</label>
                      <input
                        type="text"
                        value={draft.fullName}
                        onChange={(e) => setDraft({ ...draft, fullName: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-charcoal-800 border border-white/10 text-white text-sm focus:border-sky-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1">Primary Role</label>
                      <input
                        type="text"
                        value={draft.role}
                        onChange={(e) => setDraft({ ...draft, role: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-charcoal-800 border border-white/10 text-white text-sm focus:border-sky-400 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1">Supporting Title</label>
                      <input
                        type="text"
                        value={draft.supportingTitle}
                        onChange={(e) => setDraft({ ...draft, supportingTitle: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-charcoal-800 border border-white/10 text-white text-sm focus:border-sky-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">Hero Description</label>
                    <textarea
                      rows={2}
                      value={draft.heroDescription}
                      onChange={(e) => setDraft({ ...draft, heroDescription: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-charcoal-800 border border-white/10 text-white text-sm focus:border-sky-400 focus:outline-none resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1">University</label>
                      <input
                        type="text"
                        value={draft.university}
                        onChange={(e) => setDraft({ ...draft, university: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-charcoal-800 border border-white/10 text-white text-sm focus:border-sky-400 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1">Location</label>
                      <input
                        type="text"
                        value={draft.location}
                        onChange={(e) => setDraft({ ...draft, location: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-charcoal-800 border border-white/10 text-white text-sm focus:border-sky-400 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1">Hero Big Parallax Watermark</label>
                      <input
                        type="text"
                        value={draft.heroBgText}
                        onChange={(e) => setDraft({ ...draft, heroBgText: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-charcoal-800 border border-white/10 text-white text-sm focus:border-sky-400 focus:outline-none font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: About & Career Goal */}
              {activeTab === 'about' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">About Me Bio (supports paragraphs)</label>
                    <textarea
                      rows={5}
                      value={draft.aboutText}
                      onChange={(e) => setDraft({ ...draft, aboutText: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-charcoal-800 border border-white/10 text-white text-sm focus:border-sky-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">Career Goal Large Heading</label>
                    <input
                      type="text"
                      value={draft.careerGoalHeading}
                      onChange={(e) => setDraft({ ...draft, careerGoalHeading: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-charcoal-800 border border-white/10 text-white text-sm focus:border-sky-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">Career Goal Statement (Scroll-Highlighted)</label>
                    <textarea
                      rows={3}
                      value={draft.careerGoalText}
                      onChange={(e) => setDraft({ ...draft, careerGoalText: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-charcoal-800 border border-white/10 text-white text-sm focus:border-sky-400 focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {/* TAB: Education */}
              {activeTab === 'education' && (
                <div className="space-y-4">
                  {draft.education.map((edu, index) => (
                    <div key={edu.id} className="p-4 rounded-xl bg-charcoal-800/80 border border-white/10 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono text-sky-400 font-semibold">Entry #{index + 1}</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-mono text-slate-400 mb-1">Degree Title</label>
                          <input
                            type="text"
                            value={edu.degree}
                            onChange={(e) => {
                              const list = [...draft.education];
                              list[index].degree = e.target.value;
                              setDraft({ ...draft, education: list });
                            }}
                            className="w-full px-3 py-2 rounded-lg bg-charcoal-900 border border-white/10 text-white text-xs focus:border-sky-400 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-mono text-slate-400 mb-1">Institution</label>
                          <input
                            type="text"
                            value={edu.institution}
                            onChange={(e) => {
                              const list = [...draft.education];
                              list[index].institution = e.target.value;
                              setDraft({ ...draft, education: list });
                            }}
                            className="w-full px-3 py-2 rounded-lg bg-charcoal-900 border border-white/10 text-white text-xs focus:border-sky-400 focus:outline-none"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-mono text-slate-400 mb-1">Status</label>
                          <input
                            type="text"
                            value={edu.status}
                            onChange={(e) => {
                              const list = [...draft.education];
                              list[index].status = e.target.value;
                              setDraft({ ...draft, education: list });
                            }}
                            className="w-full px-3 py-2 rounded-lg bg-charcoal-900 border border-white/10 text-white text-xs focus:border-sky-400 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-mono text-slate-400 mb-1">Timeline</label>
                          <input
                            type="text"
                            value={edu.timeline}
                            onChange={(e) => {
                              const list = [...draft.education];
                              list[index].timeline = e.target.value;
                              setDraft({ ...draft, education: list });
                            }}
                            className="w-full px-3 py-2 rounded-lg bg-charcoal-900 border border-white/10 text-white text-xs focus:border-sky-400 focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB: Skills & Learning */}
              {activeTab === 'skills' && (
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xs font-mono text-sky-400 uppercase tracking-wider mb-3">Skill Categories</h4>
                    <div className="space-y-4">
                      {draft.skillCategories.map((cat, cIdx) => (
                        <div key={cIdx} className="p-4 rounded-xl bg-charcoal-800/80 border border-white/10">
                          <h5 className="text-sm font-semibold text-white mb-2">{cat.title}</h5>
                          <div className="flex flex-wrap gap-2">
                            {cat.skills.map((skill, sIdx) => (
                              <span key={sIdx} className="px-2.5 py-1 rounded bg-charcoal-900 border border-white/10 text-xs text-slate-300 font-mono">
                                {skill.name} {skill.levelBadge ? `(${skill.levelBadge})` : ''}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-mono text-emerald-400 uppercase tracking-wider mb-3">Currently Learning Topics</h4>
                    <div className="space-y-3">
                      {draft.currentLearning.map((item, lIdx) => (
                        <div key={item.id} className="p-3.5 rounded-xl bg-charcoal-800/80 border border-white/10">
                          <p className="text-sm font-medium text-white">{item.title}</p>
                          <p className="text-xs text-slate-400 mt-1">{item.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: Projects */}
              {activeTab === 'projects' && (
                <div className="space-y-4">
                  {draft.projects.map((proj, pIdx) => (
                    <div key={proj.id} className="p-4 rounded-xl bg-charcoal-800/80 border border-white/10 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono text-sky-400 font-semibold">Project #{pIdx + 1}</span>
                        <label className="flex items-center gap-2 text-xs font-mono text-slate-300 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={proj.isComingSoon}
                            onChange={(e) => {
                              const list = [...draft.projects];
                              list[pIdx].isComingSoon = e.target.checked;
                              setDraft({ ...draft, projects: list });
                            }}
                            className="rounded bg-charcoal-900 border-white/20 text-sky-500 focus:ring-0"
                          />
                          <span>Coming Soon</span>
                        </label>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-mono text-slate-400 mb-1">Title</label>
                          <input
                            type="text"
                            value={proj.title}
                            onChange={(e) => {
                              const list = [...draft.projects];
                              list[pIdx].title = e.target.value;
                              setDraft({ ...draft, projects: list });
                            }}
                            className="w-full px-3 py-2 rounded-lg bg-charcoal-900 border border-white/10 text-white text-xs focus:border-sky-400 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-mono text-slate-400 mb-1">Category</label>
                          <input
                            type="text"
                            value={proj.category}
                            onChange={(e) => {
                              const list = [...draft.projects];
                              list[pIdx].category = e.target.value;
                              setDraft({ ...draft, projects: list });
                            }}
                            className="w-full px-3 py-2 rounded-lg bg-charcoal-900 border border-white/10 text-white text-xs focus:border-sky-400 focus:outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono text-slate-400 mb-1">Description</label>
                        <textarea
                          rows={2}
                          value={proj.description}
                          onChange={(e) => {
                            const list = [...draft.projects];
                            list[pIdx].description = e.target.value;
                            setDraft({ ...draft, projects: list });
                          }}
                          className="w-full px-3 py-2 rounded-lg bg-charcoal-900 border border-white/10 text-white text-xs focus:border-sky-400 focus:outline-none resize-none"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB: Socials & Contact */}
              {activeTab === 'socials' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">Email Address</label>
                    <input
                      type="email"
                      value={draft.email}
                      onChange={(e) => setDraft({ ...draft, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-charcoal-800 border border-white/10 text-white text-sm focus:border-sky-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">GitHub URL</label>
                    <input
                      type="url"
                      value={draft.githubUrl}
                      onChange={(e) => setDraft({ ...draft, githubUrl: e.target.value })}
                      placeholder="https://github.com/..."
                      className="w-full px-3.5 py-2.5 rounded-lg bg-charcoal-800 border border-white/10 text-white text-sm focus:border-sky-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">LinkedIn URL</label>
                    <input
                      type="url"
                      value={draft.linkedinUrl}
                      onChange={(e) => setDraft({ ...draft, linkedinUrl: e.target.value })}
                      placeholder="https://linkedin.com/in/..."
                      className="w-full px-3.5 py-2.5 rounded-lg bg-charcoal-800 border border-white/10 text-white text-sm focus:border-sky-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">Avatar / Profile Image URL (Optional)</label>
                    <input
                      type="url"
                      value={draft.avatarUrl}
                      onChange={(e) => setDraft({ ...draft, avatarUrl: e.target.value })}
                      placeholder="https://example.com/photo.jpg"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-charcoal-800 border border-white/10 text-white text-sm focus:border-sky-400 focus:outline-none"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Footer with Edit Profile, Save Changes, Cancel, Reset */}
            <div className="px-6 py-4 border-t border-white/10 bg-charcoal-950 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleReset}
                className="px-3.5 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] transition-colors flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset to Defaults</span>
              </button>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] transition-colors"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleSave}
                  disabled={isSaving}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-sky-400 to-indigo-500 text-slate-950 font-semibold text-xs tracking-wider flex items-center gap-1.5 hover:opacity-90 transition-all shadow-md shadow-sky-500/20 disabled:opacity-50"
                >
                  {isSaving ? (
                    <span>Saving...</span>
                  ) : (
                    <>
                      <Save className="w-3.5 h-3.5" />
                      <span>Save Changes</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
