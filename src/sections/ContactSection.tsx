import React, { useState } from 'react';
import { personalData } from '../data/personal';
import { DashedRail } from '../components/DashedRail';
import { ArrowUpRight, CheckCircle2, MessageSquare, Send } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Web Development',
    budget: '₹25,000 – ₹50,000',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    // Prepare direct communication payload
    setTimeout(() => {
      // Create mailto fallback link and open it smoothly
      const subject = encodeURIComponent(`Project Inquiry: ${formData.projectType} from ${formData.name}`);
      const body = encodeURIComponent(
        `Hi Arshad,\n\nMy name is ${formData.name} (${formData.email}).\nI am interested in ${formData.projectType} with a budget of ${formData.budget}.\n\nMessage:\n${formData.message}\n\nLooking forward to hearing from you!`
      );
      
      // Also open mailto or allow WhatsApp dispatch
      window.location.href = `mailto:${personalData.contact.email}?subject=${subject}&body=${body}`;
      setStatus('success');
    }, 800);
  };

  return (
    <section id="contact" className="bg-nx-ink-900 text-nx-paper-100 pt-24 md:pt-36 pb-20 relative nx-grain border-b border-dashed border-nx-line-dark">
      <DashedRail dark />

      <div className="ui-cont relative z-10">
        {/* Top Header */}
        <div className="flex items-center gap-3 mb-6">
          <span className="ui-point bg-nx-yellow-400 shrink-0" />
          <p className="font-mono text-xs uppercase tracking-widest text-nx-stone-300">
            10 // Initiate Collaboration
          </p>
        </div>

        <h2 className="font-display font-black uppercase leading-[0.92] tracking-tighter text-4xl sm:text-6xl md:text-7xl lg:text-8xl max-w-5xl mb-16 text-nx-paper-100">
          Let's build something extraordinary.
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Direct Communication Channels & WhatsApp */}
          <div className="lg:col-span-5 space-y-8">
            <div className="border border-dashed border-nx-line-dark p-6 sm:p-8 bg-nx-ink-950/60 space-y-6">
              <span className="font-mono text-xs uppercase tracking-widest text-nx-stone-500">
                // DIRECT COMMUNICATIONS
              </span>

              <div className="space-y-4">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-nx-stone-400 block mb-1">
                    Primary Email
                  </span>
                  <a
                    href={`mailto:${personalData.contact.email}`}
                    className="font-display font-bold text-xl sm:text-2xl text-nx-yellow-400 underline decoration-2 underline-offset-4 break-all hover:text-nx-yellow-300 transition-colors"
                  >
                    {personalData.contact.email}
                  </a>
                </div>

                <div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-nx-stone-400 block mb-1">
                    Direct Phone / WhatsApp
                  </span>
                  <p className="font-mono text-base sm:text-lg text-nx-paper-100 font-bold">
                    {personalData.contact.phone}
                  </p>
                </div>

                <div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-nx-stone-400 block mb-1">
                    Physical Location
                  </span>
                  <p className="text-sm text-nx-stone-300">
                    {personalData.location.street}, {personalData.location.state} {personalData.location.pincode}, {personalData.location.country}
                  </p>
                </div>
              </div>

              {/* Direct WhatsApp CTA Button */}
              <div className="pt-4 border-t border-dashed border-nx-line-dark">
                <a
                  href={personalData.contact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nx-btn nx-btn--primary w-full justify-center group"
                >
                  <span className="nx-btn__icon">
                    <MessageSquare className="w-4 h-4" />
                  </span>
                  <span className="nx-btn__label flex items-center gap-2">
                    <span>Chat on WhatsApp</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </span>
                </a>
              </div>
            </div>

            {/* Quick Response Notice */}
            <div className="border border-dashed border-nx-line-dark p-4 font-mono text-xs text-nx-stone-400 flex items-center gap-3">
              <span className="ui-point bg-nx-yellow-400 animate-ping" />
              <span>TYPICAL INQUIRY RESPONSE TIME: WITHIN 24 HOURS</span>
            </div>
          </div>

          {/* Right Column: Architectural Project Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="relative border border-dashed border-nx-line-dark p-8 sm:p-12 bg-nx-ink-950/80">
              {/* Corner Architectural Ticks */}
              <span className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-nx-yellow-400" />
              <span className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-nx-yellow-400" />
              <span className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-nx-yellow-400" />
              <span className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-nx-yellow-400" />

              <div className="flex items-center gap-3 mb-8">
                <span className="ui-point bg-nx-yellow-400" />
                <h3 className="font-mono text-xs uppercase tracking-widest text-nx-stone-300">
                  PROJECT SPECIFICATION INQUIRY FORM
                </h3>
              </div>

              {status === 'success' ? (
                <div className="py-12 text-center space-y-4 animate-fadeIn">
                  <CheckCircle2 className="w-12 h-12 text-nx-yellow-400 mx-auto" />
                  <h4 className="font-display font-bold uppercase text-2xl text-nx-paper-100">
                    Message Prepared &amp; Dispatched
                  </h4>
                  <p className="text-sm text-nx-stone-400 max-w-md mx-auto">
                    Your inquiry has been compiled. If your email client didn't open automatically, you can also send directly to {personalData.contact.email} or WhatsApp.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="nx-btn nx-btn--ghost mt-4"
                  >
                    <span>Send Another Inquiry</span>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="space-y-2">
                      <label className="block font-mono text-xs uppercase tracking-widest text-nx-stone-400">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-nx-ink-900 border border-dashed border-nx-line-dark px-4 py-3 text-sm text-nx-paper-100 placeholder:text-nx-stone-600 focus:outline-none focus:border-nx-yellow-400 transition-colors"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label className="block font-mono text-xs uppercase tracking-widest text-nx-stone-400">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-nx-ink-900 border border-dashed border-nx-line-dark px-4 py-3 text-sm text-nx-paper-100 placeholder:text-nx-stone-600 focus:outline-none focus:border-nx-yellow-400 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Project Type */}
                    <div className="space-y-2">
                      <label className="block font-mono text-xs uppercase tracking-widest text-nx-stone-400">
                        Project Scope
                      </label>
                      <select
                        value={formData.projectType}
                        onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                        className="w-full bg-nx-ink-900 border border-dashed border-nx-line-dark px-4 py-3 text-sm text-nx-paper-100 focus:outline-none focus:border-nx-yellow-400 transition-colors"
                      >
                        <option value="Web Development">Full Web Development</option>
                        <option value="3D Web Experience">3D Web / Three.js Experience</option>
                        <option value="Frontend Engineering">Custom React / Frontend</option>
                        <option value="Backend & APIs">Backend Architecture &amp; APIs</option>
                        <option value="Performance & Modernization">Website Performance Optimization</option>
                      </select>
                    </div>

                    {/* Budget Range */}
                    <div className="space-y-2">
                      <label className="block font-mono text-xs uppercase tracking-widest text-nx-stone-400">
                        Estimated Budget
                      </label>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full bg-nx-ink-900 border border-dashed border-nx-line-dark px-4 py-3 text-sm text-nx-paper-100 focus:outline-none focus:border-nx-yellow-400 transition-colors"
                      >
                        <option value="Under ₹25,000">Under ₹25,000</option>
                        <option value="₹25,000 – ₹50,000">₹25,000 – ₹50,000</option>
                        <option value="₹50,000 – ₹1,00,000">₹50,000 – ₹1,00,000</option>
                        <option value="₹1,00,000+">₹1,00,000+</option>
                        <option value="Flexible / Discussion">Flexible / Let's Discuss</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label className="block font-mono text-xs uppercase tracking-widest text-nx-stone-400">
                      Project Details &amp; Objectives *
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Outline your project timeline, requirements, or vision..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-nx-ink-900 border border-dashed border-nx-line-dark p-4 text-sm text-nx-paper-100 placeholder:text-nx-stone-600 focus:outline-none focus:border-nx-yellow-400 transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className="nx-btn nx-btn--primary w-full justify-center group"
                    >
                      <span className="nx-btn__icon">
                        <Send className="w-4 h-4" />
                      </span>
                      <span className="nx-btn__label flex items-center gap-2">
                        <span>{status === 'submitting' ? 'Processing...' : 'Send Message'}</span>
                        <span className="text-nx-ink-950 font-bold">↳</span>
                      </span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
