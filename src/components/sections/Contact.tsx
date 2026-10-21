'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactFormSchema, ContactFormData } from '@/lib/validators';
import confetti from 'canvas-confetti';
import { Mail, Linkedin, Github, Send, Copy, Check, Sparkles, AlertCircle, ArrowUpRight, ExternalLink } from 'lucide-react';
import { PROFILE_DATA } from '@/data/profile';

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formMountTime] = useState(() => Date.now());

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const watchedSubject = watch('subject') || '';
  const watchedMessage = watch('message') || '';

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const payload = {
        ...data,
        timestamp: formMountTime,
      };

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || 'Failed to dispatch message');
      }

      setSubmitSuccess(true);
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.8 },
      });
      reset();
      setTimeout(() => setSubmitSuccess(false), 8000);
    } catch (err: unknown) {
      setErrorMessage(
        err instanceof Error
          ? err.message
          : 'Failed to send message. Please email directly at rdpkumar2308@gmail.com.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(PROFILE_DATA.contact.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="contact" aria-label="Contact Section" className="relative py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-xs font-mono font-medium mb-3">
            <span>11 // GET IN TOUCH</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-slate-100 tracking-tight mb-4">
            Let’s Build Intelligent Systems <span className="text-gradient-cyan">Together</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl">
            Whether evaluating candidates for applied machine learning roles, research collaborations, or production RAG deployments.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left: Contact Info & Direct Cards */}
          <div className="lg:col-span-5 space-y-4">
            {/* Direct Email Card with One-Click Copy */}
            <div className="p-6 rounded-3xl glass-card flex flex-col justify-between transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider">Direct Email</div>
                    <div className="font-display font-bold text-sm sm:text-base text-slate-900 dark:text-slate-100">
                      {PROFILE_DATA.contact.email}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={copyEmail}
                  className="p-2.5 rounded-xl bg-slate-100 dark:bg-white/[0.04] hover:bg-slate-200 dark:hover:bg-white/[0.08] text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 border border-slate-200 dark:border-white/[0.08] transition-colors cursor-pointer"
                  aria-label="Copy email address to clipboard"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-500 dark:text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <a
                href={`mailto:${PROFILE_DATA.contact.email}`}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-white/[0.04] hover:bg-cyan-50 dark:hover:bg-cyan-500/10 text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 border border-slate-200 dark:border-white/[0.08] transition-colors"
              >
                <span>Compose in Mail App</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* LinkedIn Card */}
            <a
              href={PROFILE_DATA.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-3xl glass-card flex items-center justify-between group transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-violet-500/10 border border-violet-500/20 text-violet-600 dark:text-violet-400">
                  <Linkedin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider">Professional Network</div>
                  <div className="font-display font-bold text-sm sm:text-base text-slate-900 dark:text-slate-100 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                    rajana-durga-pavan-kumar
                  </div>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors" />
            </a>

            {/* GitHub Card */}
            <a
              href={PROFILE_DATA.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-3xl glass-card flex items-center justify-between group transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                  <Github className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider">Source Code &amp; Repos</div>
                  <div className="font-display font-bold text-sm sm:text-base text-slate-900 dark:text-slate-100 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                    @DurgaPavan0923
                  </div>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors" />
            </a>
          </div>

          {/* Right: Validated Interactive Form */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl glass-panel border border-slate-200 dark:border-white/[0.08]">
            {submitSuccess ? (
              <div className="py-12 text-center flex flex-col items-center justify-center animate-fade-up">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 flex items-center justify-center mb-4">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-lg sm:text-xl text-slate-900 dark:text-slate-100 mb-2">
                  Message Dispatched Successfully!
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-md mb-4">
                  Message sent, I’ll reply within 24–48h directly to your inbox.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitSuccess(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-white/[0.06] text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {errorMessage && (
                  <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs space-y-2.5">
                    <div className="flex items-center gap-2 font-semibold">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-red-500/20">
                      <a
                        href={`mailto:${PROFILE_DATA.contact.email}?subject=${encodeURIComponent(watchedSubject || 'Portfolio Inquiry')}&body=${encodeURIComponent(watchedMessage)}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 font-medium transition-colors"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>Email me directly</span>
                      </a>
                      <button
                        type="button"
                        onClick={copyEmail}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 font-medium transition-colors cursor-pointer"
                      >
                        {copiedEmail ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedEmail ? 'Copied!' : 'Copy rdpkumar2308@gmail.com'}</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Honeypot Spam Field */}
                <input
                  type="text"
                  {...register('botcheck')}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-mono text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider">
                      Your Name <span className="text-cyan-600 dark:text-cyan-400">*</span>
                    </label>
                    <input
                      type="text"
                      {...register('name')}
                      placeholder="e.g. Dr. Alex Vance"
                      className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] focus:border-cyan-500 dark:focus:border-cyan-400/60 focus:bg-white dark:focus:bg-white/[0.06] text-xs sm:text-sm text-slate-900 dark:text-slate-100 outline-none transition-all"
                    />
                    {errors.name && (
                      <p className="text-red-500 dark:text-red-400 text-[11px] mt-1">{errors.name.message}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-mono text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider">
                      Your Email Address <span className="text-cyan-600 dark:text-cyan-400">*</span>
                    </label>
                    <input
                      type="email"
                      {...register('email')}
                      placeholder="e.g. alex@company.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] focus:border-cyan-500 dark:focus:border-cyan-400/60 focus:bg-white dark:focus:bg-white/[0.06] text-xs sm:text-sm text-slate-900 dark:text-slate-100 outline-none transition-all"
                    />
                    {errors.email && (
                      <p className="text-red-500 dark:text-red-400 text-[11px] mt-1">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-xs font-mono text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider">
                    Inquiry Subject <span className="text-cyan-600 dark:text-cyan-400">*</span>
                  </label>
                  <input
                    type="text"
                    {...register('subject')}
                    placeholder="e.g. AI/ML Engineering Role / Collaboration Inquiry"
                    className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] focus:border-cyan-500 dark:focus:border-cyan-400/60 focus:bg-white dark:focus:bg-white/[0.06] text-xs sm:text-sm text-slate-900 dark:text-slate-100 outline-none transition-all"
                  />
                  {errors.subject && (
                    <p className="text-red-500 dark:text-red-400 text-[11px] mt-1">{errors.subject.message}</p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-mono text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider">
                    Detailed Message <span className="text-cyan-600 dark:text-cyan-400">*</span>
                  </label>
                  <textarea
                    rows={4}
                    {...register('message')}
                    placeholder="Detail your objective or opportunity regarding ML engineering, research, or architecture..."
                    className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] focus:border-cyan-500 dark:focus:border-cyan-400/60 focus:bg-white dark:focus:bg-white/[0.06] text-xs sm:text-sm text-slate-900 dark:text-slate-100 outline-none transition-all resize-none"
                  />
                  {errors.message && (
                    <p className="text-red-500 dark:text-red-400 text-[11px] mt-1">{errors.message.message}</p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-cyan-500 hover:from-cyan-300 hover:to-cyan-400 disabled:opacity-60 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-cyan-500/20 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                      <span>Transmitting Message...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Dispatch Priority Message</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
