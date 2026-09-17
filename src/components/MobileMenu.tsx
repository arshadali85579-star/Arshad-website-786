import React, { useEffect } from 'react';
import { personalData } from '../data/personal';
import { projectsData } from '../data/projects';
import { X, ArrowUpRight } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  // Lock scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex justify-end bg-nx-ink-950/80 backdrop-blur-md overflow-y-auto animate-fadeIn"
      role="dialog"
      aria-modal="true"
    >
      <div className="w-full max-w-5xl my-4 sm:my-6 mx-4 sm:mx-6 space-y-3 flex flex-col justify-start">
        {/* Top Row: Project Discussion Box & Social/Close Box */}
        <div className="flex flex-col md:flex-row gap-3">
          {/* Discussion Box */}
          <div className="w-full md:w-3/5 bg-nx-paper-100 text-nx-ink-950 p-8 sm:p-10 flex flex-col justify-between border border-dashed border-nx-line-light min-h-[220px]">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="ui-point bg-nx-ink-950" />
                <p className="font-mono text-xs uppercase tracking-widest text-nx-stone-500">
                  DISCUSS A PROJECT
                </p>
              </div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-display font-bold uppercase leading-tight tracking-tight">
                How about we build something extraordinary together?
              </h2>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <a
                href={`mailto:${personalData.contact.email}`}
                className="font-display font-bold text-lg sm:text-xl underline decoration-nx-yellow-500 decoration-2 underline-offset-4 hover:text-nx-stone-600 transition-colors"
              >
                {personalData.contact.email}
              </a>
              <a
                href={personalData.contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-nx-ink-950 text-nx-paper-100 hover:bg-nx-yellow-400 hover:text-nx-ink-950 transition-colors font-mono text-xs uppercase tracking-widest px-4 py-2 inline-flex items-center gap-2"
              >
                <span>WhatsApp</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Social Box + Close Button */}
          <div className="w-full md:w-2/5 bg-nx-ink-800 text-nx-paper-100 p-6 sm:p-8 flex flex-col justify-between border border-dashed border-nx-line-dark min-h-[220px]">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <span className="ui-point bg-nx-yellow-400" />
                <p className="font-mono text-xs uppercase tracking-widest text-nx-stone-300">
                  Connect
                </p>
              </div>
              <button
                onClick={onClose}
                type="button"
                className="border border-dashed border-nx-line-dark px-3 py-1 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-nx-paper-100 hover:border-nx-yellow-400 hover:text-nx-yellow-400 transition-colors cursor-pointer"
                aria-label="Close menu"
              >
                <span>Close</span>
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <div>
              <ul className="grid grid-cols-2 gap-3 font-mono text-xs uppercase tracking-widest">
                {personalData.socials.map((social) => (
                  <li key={social.name}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-nx-yellow-400 transition-colors inline-flex items-center gap-1 text-nx-stone-300 hover:translate-x-0.5 transform duration-150"
                    >
                      <span>{social.name}</span>
                      <span className="text-[10px] text-nx-yellow-400">↗</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Row: Main Navigation Links + Selected Projects List */}
        <div className="flex flex-col md:flex-row gap-3">
          {/* Main Navigation Links */}
          <div className="w-full md:w-3/5 bg-nx-paper-100 text-nx-ink-950 p-8 sm:p-10 border border-dashed border-nx-line-light">
            <div className="flex items-center gap-3 mb-6">
              <span className="ui-point bg-nx-ink-950" />
              <p className="font-mono text-xs uppercase tracking-widest text-nx-stone-500">
                Navigation
              </p>
            </div>
            <ul className="font-display font-bold text-xl sm:text-2xl uppercase tracking-tight space-y-2">
              {[
                { label: 'Home', href: '#' },
                { label: 'Services', href: '#services' },
                { label: 'Portfolio', href: '#portfolio' },
                { label: 'About Sayyad Arshad', href: '#about' },
                { label: 'Expertise & Skills', href: '#expertise' },
                { label: 'Dedicated 3D Lab', href: '#3d-lab' },
                { label: 'FAQ', href: '#faq' },
                { label: 'Start A Project', href: '#contact' },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={onClose}
                    className="block hover:text-nx-yellow-600 hover:translate-x-2 transition-all duration-200"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Selected Work Quick Index */}
          <div className="w-full md:w-2/5 bg-nx-ink-800 text-nx-paper-100 p-6 sm:p-8 flex flex-col justify-between border border-dashed border-nx-line-dark">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="ui-point bg-nx-yellow-400" />
                <p className="font-mono text-xs uppercase tracking-widest text-nx-stone-300">
                  Featured Work
                </p>
              </div>
              <ul className="space-y-3 font-mono text-xs uppercase tracking-widest">
                {projectsData.slice(0, 5).map((proj) => (
                  <li key={proj.id}>
                    <a
                      href="#portfolio"
                      onClick={onClose}
                      className="group flex items-center justify-between hover:text-nx-yellow-400 transition-colors text-nx-stone-300"
                    >
                      <span className="truncate max-w-[200px]">{proj.title}</span>
                      <span className="text-[10px] text-nx-yellow-400 border border-dashed border-nx-yellow-400/40 px-1.5 py-0.5">
                        {proj.badge || 'PROJ'}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-8 pt-4 border-t border-dashed border-nx-line-dark font-mono text-[10px] uppercase tracking-widest text-nx-stone-400 flex justify-between">
              <span>B.E. AIDS — 4TH YEAR</span>
              <span className="text-nx-yellow-400">MAHARASHTRA, IN</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
