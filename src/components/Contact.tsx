import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Mail, MapPin, Send, Github, Linkedin, AlertCircle, CheckCircle2, ExternalLink, Sparkles } from 'lucide-react';

export const Contact: React.FC = () => {
  const { profile } = usePortfolio();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submissionStatus, setSubmissionStatus] = useState<
    'idle' | 'validating' | 'needs-backend'
  >('idle');

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please provide your name.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please provide your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please provide a valid email address.';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Please specify a subject.';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please write a message.';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message should be at least 10 characters long.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmissionStatus('validating');
    setTimeout(() => {
      // Prompt Requirement 14:
      // "If no email/backend service is configured, do not pretend that messages were successfully sent.
      // Clearly show that the contact integration needs to be configured."
      setSubmissionStatus('needs-backend');
    }, 600);
  };

  const handleOpenMailto = () => {
    const mailtoUrl = `mailto:${profile.email}?subject=${encodeURIComponent(
      formData.subject || 'Portfolio Inquiry'
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;
    window.location.href = mailtoUrl;
  };

  return (
    <section
      id="contact"
      className="relative py-28 bg-[#0a0c12] border-t border-white/[0.04] overflow-hidden"
    >
      <div className="absolute right-0 bottom-0 w-[500px] h-[500px] bg-sky-500/5 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-mono mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>GET IN TOUCH</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white tracking-tight">
            Let's Connect
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-3 max-w-xl mx-auto">
            “I'm always interested in learning, collaborating, and exploring new opportunities in technology.”
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-sky-400 to-indigo-500 mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Contact Details & Links Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-card rounded-2xl p-6 sm:p-8 border border-white/10 shadow-xl space-y-6">
              <h3 className="text-xl font-display font-bold text-white">
                Contact Information
              </h3>

              <div className="space-y-4">
                {/* Email Item */}
                <div className="flex items-start gap-4 p-4 rounded-xl bg-charcoal-900/60 border border-white/[0.06]">
                  <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="overflow-hidden">
                    <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">Email Address</span>
                    <a
                      href={`mailto:${profile.email}`}
                      className="text-sm sm:text-base font-medium text-white hover:text-sky-300 transition-colors break-all"
                    >
                      {profile.email}
                    </a>
                  </div>
                </div>

                {/* Location Item */}
                <div className="flex items-start gap-4 p-4 rounded-xl bg-charcoal-900/60 border border-white/[0.06]">
                  <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">Location</span>
                    <p className="text-sm sm:text-base font-medium text-white">
                      {profile.location}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-white/[0.06] flex flex-col gap-3">
                <a
                  href={`mailto:${profile.email}`}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-sky-400 to-indigo-500 text-slate-950 font-medium text-sm flex items-center justify-center gap-2 hover:opacity-95 transition-opacity shadow-[0_0_15px_rgba(56,189,248,0.3)]"
                >
                  <Mail className="w-4 h-4" />
                  <span>Email Me Directly</span>
                </a>

                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={profile.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-4 rounded-xl bg-charcoal-800 hover:bg-charcoal-700 text-white text-xs font-medium border border-white/10 flex items-center justify-center gap-2 transition-colors"
                  >
                    <Github className="w-4 h-4 text-slate-300" />
                    <span>GitHub</span>
                  </a>

                  <a
                    href={profile.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-4 rounded-xl bg-charcoal-800 hover:bg-charcoal-700 text-white text-xs font-medium border border-white/10 flex items-center justify-center gap-2 transition-colors"
                  >
                    <Linkedin className="w-4 h-4 text-sky-400" />
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-7">
            <div className="glass-card rounded-2xl p-6 sm:p-8 border border-white/10 shadow-2xl">
              <h3 className="text-xl font-display font-bold text-white mb-6">
                Send a Message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name field */}
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5">
                      Your Name <span className="text-sky-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (errors.name) setErrors({ ...errors, name: '' });
                      }}
                      placeholder="e.g. Alex Smith"
                      className={`w-full px-4 py-3 rounded-xl bg-charcoal-900 border ${
                        errors.name ? 'border-rose-500' : 'border-white/10 focus:border-sky-400'
                      } text-white text-sm placeholder:text-slate-600 focus:outline-none transition-colors`}
                    />
                    {errors.name && <p className="text-xs text-rose-400 mt-1">{errors.name}</p>}
                  </div>

                  {/* Email field */}
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5">
                      Your Email <span className="text-sky-400">*</span>
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (errors.email) setErrors({ ...errors, email: '' });
                      }}
                      placeholder="alex@example.com"
                      className={`w-full px-4 py-3 rounded-xl bg-charcoal-900 border ${
                        errors.email ? 'border-rose-500' : 'border-white/10 focus:border-sky-400'
                      } text-white text-sm placeholder:text-slate-600 focus:outline-none transition-colors`}
                    />
                    {errors.email && <p className="text-xs text-rose-400 mt-1">{errors.email}</p>}
                  </div>
                </div>

                {/* Subject field */}
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5">
                    Subject <span className="text-sky-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => {
                      setFormData({ ...formData, subject: e.target.value });
                      if (errors.subject) setErrors({ ...errors, subject: '' });
                    }}
                    placeholder="Project inquiry / Mentorship / Collaboration"
                    className={`w-full px-4 py-3 rounded-xl bg-charcoal-900 border ${
                      errors.subject ? 'border-rose-500' : 'border-white/10 focus:border-sky-400'
                    } text-white text-sm placeholder:text-slate-600 focus:outline-none transition-colors`}
                  />
                  {errors.subject && <p className="text-xs text-rose-400 mt-1">{errors.subject}</p>}
                </div>

                {/* Message field */}
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5">
                    Message <span className="text-sky-400">*</span>
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => {
                      setFormData({ ...formData, message: e.target.value });
                      if (errors.message) setErrors({ ...errors, message: '' });
                    }}
                    placeholder="Write your message here..."
                    className={`w-full px-4 py-3 rounded-xl bg-charcoal-900 border ${
                      errors.message ? 'border-rose-500' : 'border-white/10 focus:border-sky-400'
                    } text-white text-sm placeholder:text-slate-600 focus:outline-none transition-colors resize-none`}
                  />
                  {errors.message && <p className="text-xs text-rose-400 mt-1">{errors.message}</p>}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={submissionStatus === 'validating'}
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-sky-400 via-cyan-300 to-indigo-500 text-slate-950 font-semibold text-sm hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-sky-500/20 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{submissionStatus === 'validating' ? 'Validating...' : 'Send Message'}</span>
                </button>
              </form>

              {/* Requirement 14 Status Notice */}
              {submissionStatus === 'needs-backend' && (
                <div className="mt-6 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs animate-in fade-in duration-300">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <div className="space-y-2">
                      <p className="font-semibold text-amber-300">
                        Notice: Contact Backend Integration Not Configured
                      </p>
                      <p className="text-amber-200/90 leading-relaxed font-light">
                        Your inputs were validated, but this static portfolio does not have an active email API key (such as Formspree, Resend, or EmailJS) configured yet.
                      </p>
                      <div className="pt-2 flex flex-wrap items-center gap-3">
                        <button
                          onClick={handleOpenMailto}
                          className="px-3 py-1.5 rounded-lg bg-amber-400 text-slate-950 font-medium text-xs flex items-center gap-1.5 hover:bg-amber-300 transition-colors"
                        >
                          <Mail className="w-3.5 h-3.5" />
                          <span>Dispatch via Mail Client Now</span>
                        </button>
                        <button
                          onClick={() => setSubmissionStatus('idle')}
                          className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs transition-colors"
                        >
                          Dismiss
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
