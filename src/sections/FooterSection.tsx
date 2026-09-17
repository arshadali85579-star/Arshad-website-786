import React from 'react';
import { personalData } from '../data/personal';
import { DashedRail } from '../components/DashedRail';

export const FooterSection: React.FC = () => {
  return (
    <footer className="bg-nx-ink-950 text-nx-paper-100 pt-20 pb-12 relative nx-grain border-t border-dashed border-nx-line-dark">
      <DashedRail dark />

      <div className="ui-cont relative z-10">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-dashed border-nx-line-dark">
          {/* Brand & Positioning */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8 text-nx-yellow-400 shrink-0">
                <rect width="40" height="40" fill="#0e1216" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
                <path d="M12 28L20 12L28 28" stroke="#f7f4ee" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M15 23H25" stroke="#fbe052" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx="20" cy="18" r="1.5" fill="#fbe052" />
              </svg>
              <h3 className="font-display font-black uppercase text-xl tracking-tight text-nx-paper-100">
                {personalData.name}
              </h3>
            </div>

            <p className="font-mono text-xs uppercase tracking-wide text-nx-stone-400 max-w-sm leading-relaxed">
              Creative web developer engineering interactive 3D WebGL experiences, scalable frontend platforms, and modern digital products.
            </p>

            <div className="pt-2">
              <span className="font-mono text-[10px] uppercase tracking-widest text-nx-yellow-400 border border-dashed border-nx-yellow-400/40 px-2.5 py-1">
                B.E. AIDS — 4th Year
              </span>
            </div>
          </div>

          {/* Quick Sitemap */}
          <div className="lg:col-span-3 space-y-4">
            <div className="font-mono text-xs uppercase tracking-widest text-nx-stone-500">
              // Navigation
            </div>
            <ul className="space-y-2.5 font-mono text-xs uppercase tracking-wide">
              {['Services', 'Portfolio', 'About', 'Expertise', '3D Lab', 'FAQ', 'Contact'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase().replace(' ', '-')}`}
                    className="hover:text-nx-yellow-400 transition-colors inline-block hover:translate-x-1 duration-150"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect / Socials */}
          <div className="lg:col-span-2 space-y-4">
            <div className="font-mono text-xs uppercase tracking-widest text-nx-stone-500">
              // Connect
            </div>
            <ul className="space-y-2.5 font-mono text-xs uppercase tracking-wide">
              {personalData.socials.map((social) => (
                <li key={social.name}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-nx-yellow-400 transition-colors inline-flex items-center gap-1.5 hover:translate-x-1 duration-150"
                  >
                    <span>{social.name}</span>
                    <span className="text-[10px] text-nx-yellow-400">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Regional Details & Organization */}
          <div className="lg:col-span-3 space-y-4 font-mono text-xs uppercase tracking-wide">
            <div className="text-nx-stone-500">// Location &amp; Impact</div>
            <p className="text-nx-stone-300 leading-relaxed">
              {personalData.location.street}
              <br />
              {personalData.location.state} {personalData.location.pincode}
              <br />
              {personalData.location.country}
            </p>
            <p className="text-nx-yellow-400 text-[11px] pt-2">
              Collaborator:{' '}
              <a
                href={personalData.organizationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-nx-paper-100 transition-colors"
              >
                {personalData.organization} ↗
              </a>
            </p>
          </div>
        </div>

        {/* Bottom Technical Credit Line */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-xs uppercase tracking-widest text-nx-stone-400">
          <div className="flex items-center gap-2">
            <span>© 2026 SAYYAD ARSHAD</span>
            <span>·</span>
            <span className="text-nx-stone-500">ALL RIGHTS RESERVED</span>
          </div>

          <div className="flex items-center gap-2 text-nx-stone-400">
            <span className="text-nx-yellow-400">↳</span>
            <span>DESIGNED + DEVELOPED BY SAYYAD ARSHAD</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
