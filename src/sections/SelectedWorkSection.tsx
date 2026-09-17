import React, { useState } from 'react';
import { projectsData } from '../data/projects';
import { PortfolioCanvas } from '../three/PortfolioCanvas';
import { DashedRail } from '../components/DashedRail';
import { ProjectItem } from '../types';
import { Check, Eye, ExternalLink } from 'lucide-react';

export const SelectedWorkSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectItem>(projectsData[0]);
  const [inspectModalOpen, setInspectModalOpen] = useState(false);

  return (
    <section id="portfolio" className="bg-nx-ink-900 text-nx-paper-100 py-24 md:py-32 relative nx-grain border-b border-dashed border-nx-line-dark">
      <DashedRail dark />

      <div className="ui-cont relative z-10">
        {/* Section Header */}
        <div className="grid lg:grid-cols-5 items-end gap-6 lg:gap-16 mb-16">
          <div className="lg:col-span-3">
            <div className="flex items-center gap-3 mb-6">
              <span className="ui-point bg-nx-yellow-400 shrink-0" />
              <p className="font-mono text-xs uppercase tracking-widest text-nx-stone-300">
                03 // Selected Work
              </p>
            </div>
            <h2 className="font-display font-bold uppercase leading-[0.95] tracking-tight text-3xl sm:text-4xl md:text-5xl">
              Custom-crafted digital platforms &amp; interactive systems.
            </h2>
          </div>

          <div className="lg:col-span-2 flex flex-col justify-end items-start lg:items-end">
            <div className="font-mono text-xs uppercase tracking-widest text-nx-stone-400 border border-dashed border-nx-line-dark px-4 py-2">
              <span className="text-nx-yellow-400 font-bold">{projectsData.length}</span> PROJECTS ARCHIVED
            </div>
          </div>
        </div>

        {/* Real-time 3D Perspective Stage */}
        <div className="mb-20">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-4 font-mono text-xs uppercase tracking-widest text-nx-stone-400">
            <div className="flex items-center gap-2">
              <span className="ui-point bg-nx-yellow-400 animate-pulse" />
              <span>INTERACTIVE 3D STAGE // SELECT ANY WORK BELOW TO LOAD PERSPECTIVE</span>
            </div>
            <span className="text-nx-yellow-400 hidden sm:inline">WebGL ACCELERATED</span>
          </div>

          <PortfolioCanvas activeProject={selectedProject} />
        </div>

        {/* Editorial Project Showcase List (Asymmetric Layouts) */}
        <div className="space-y-12">
          {projectsData.map((project, index) => {
            const isSelected = selectedProject.id === project.id;
            const isEven = index % 2 === 0;

            return (
              <div
                key={project.id}
                data-cursor="project"
                onClick={() => setSelectedProject(project)}
                className={`border border-dashed transition-all duration-300 p-8 md:p-12 cursor-pointer ${
                  isSelected
                    ? 'border-nx-yellow-400 bg-nx-ink-800/90 shadow-2xl shadow-nx-yellow-400/5'
                    : 'border-nx-line-dark bg-nx-ink-950/60 hover:bg-nx-ink-800/40 hover:border-nx-stone-400'
                }`}
              >
                <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${isEven ? '' : 'lg:flex-row-reverse'}`}>
                  {/* Left Column: Number, Title, Tagline, Highlights */}
                  <div className="lg:col-span-7 space-y-6">
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-sm font-bold text-nx-yellow-400">
                        {`// ${project.number}`}
                      </span>
                      <span className="font-mono text-[11px] uppercase tracking-widest text-nx-stone-400 border border-dashed border-nx-line-dark px-2.5 py-1">
                        {project.category}
                      </span>
                      <span className="font-mono text-[11px] uppercase tracking-widest text-nx-stone-400">
                        {project.year}
                      </span>
                    </div>

                    <h3 className="font-display font-extrabold uppercase text-2xl sm:text-3xl md:text-4xl tracking-tight leading-tight text-nx-paper-100">
                      {project.title}
                    </h3>

                    <p className="font-mono text-xs uppercase tracking-widest text-nx-yellow-400">
                      {project.tagline}
                    </p>

                    <p className="text-sm md:text-base text-nx-stone-300 leading-relaxed max-w-2xl">
                      {project.description}
                    </p>

                    {/* Key Highlights Bulletpoints */}
                    <div className="space-y-2 pt-2">
                      {project.highlights.map((highlight, hIdx) => (
                        <div key={hIdx} className="flex items-start gap-2.5 text-xs text-nx-stone-400">
                          <Check className="w-3.5 h-3.5 text-nx-yellow-400 shrink-0 mt-0.5" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>

                    {/* Technologies Tags */}
                    <div className="flex flex-wrap gap-2 pt-4">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="font-mono text-[10px] uppercase tracking-wide border border-dashed border-nx-line-dark px-2.5 py-1 text-nx-stone-300 bg-nx-ink-900"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Interactive Card & Quick Action */}
                  <div className="lg:col-span-5 flex flex-col justify-between h-full bg-nx-ink-900 border border-dashed border-nx-line-dark p-6 sm:p-8">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <span className="font-mono text-[10px] uppercase tracking-widest text-nx-stone-500">
                          STATUS
                        </span>
                        <p className="font-mono text-xs font-bold uppercase text-nx-yellow-400">
                          {project.badge || 'VERIFIED CODEBASE'}
                        </p>
                      </div>
                      <div className="font-mono text-[11px] text-nx-stone-400">
                        {project.metrics}
                      </div>
                    </div>

                    <div className="my-8 py-8 border-y border-dashed border-nx-line-dark/60">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-nx-yellow-400 animate-pulse" />
                        <span className="font-mono text-xs uppercase tracking-widest text-nx-stone-300">
                          {isSelected ? 'ACTIVE ON 3D STAGE' : 'CLICK TO LOAD 3D PERSPECTIVE'}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-2.5">
                      {project.link && project.link !== '#' && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="nx-btn nx-btn--primary w-full sm:flex-1 justify-center group"
                        >
                          <span className="nx-btn__icon">
                            <ExternalLink className="w-4 h-4" />
                          </span>
                          <span className="nx-btn__label flex items-center gap-1">
                            <span>Live Website</span>
                            <span className="text-xs">↗</span>
                          </span>
                        </a>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProject(project);
                          setInspectModalOpen(true);
                        }}
                        type="button"
                        className={`nx-btn ${project.link && project.link !== '#' ? 'nx-btn--ghost' : 'nx-btn--primary'} w-full ${project.link && project.link !== '#' ? 'sm:w-auto' : ''} justify-center group`}
                      >
                        <span className="nx-btn__icon">
                          <Eye className="w-4 h-4" />
                        </span>
                        <span className="nx-btn__label">{project.link && project.link !== '#' ? 'Specs' : 'Inspect Specification'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Inspect Project Modal */}
      {inspectModalOpen && (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-nx-ink-950/85 backdrop-blur-md animate-fadeIn"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-nx-ink-900 border border-dashed border-nx-yellow-400 text-nx-paper-100 max-w-2xl w-full p-8 md:p-10 space-y-6 relative shadow-2xl">
            <div className="flex justify-between items-start border-b border-dashed border-nx-line-dark pb-4">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-nx-yellow-400">
                  {`// SPECIFICATION SHEET [${selectedProject.number}]`}
                </span>
                <h4 className="font-display font-black uppercase text-2xl tracking-tight text-nx-paper-100 mt-1">
                  {selectedProject.title}
                </h4>
              </div>
              <button
                onClick={() => setInspectModalOpen(false)}
                className="border border-dashed border-nx-line-dark px-3 py-1 font-mono text-xs uppercase tracking-widest hover:border-nx-yellow-400 hover:text-nx-yellow-400 transition-colors"
              >
                CLOSE [ESC]
              </button>
            </div>

            <div className="space-y-4">
              <p className="text-sm md:text-base text-nx-stone-300 leading-relaxed">
                {selectedProject.description}
              </p>

              <div className="space-y-2 pt-2">
                <p className="font-mono text-xs uppercase tracking-widest text-nx-yellow-400">
                  Architectural Deliverables:
                </p>
                {selectedProject.highlights.map((h: string, i: number) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-nx-stone-400">
                    <span className="text-nx-yellow-400">↳</span>
                    <span>{h}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <p className="font-mono text-xs uppercase tracking-widest text-nx-stone-400 mb-2">
                  Integrated Stack:
                </p>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map((t: string) => (
                    <span key={t} className="font-mono text-xs uppercase border border-dashed border-nx-line-dark px-2.5 py-1 text-nx-yellow-400">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-dashed border-nx-line-dark flex flex-wrap justify-between items-center gap-4">
              <div className="flex flex-wrap items-center gap-3">
                {selectedProject.link && selectedProject.link !== '#' && (
                  <a
                    href={selectedProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="nx-btn nx-btn--primary"
                  >
                    <span className="nx-btn__icon">
                      <ExternalLink className="w-4 h-4" />
                    </span>
                    <span className="nx-btn__label">Launch Live Website ↗</span>
                  </a>
                )}
                <a
                  href="#contact"
                  onClick={() => setInspectModalOpen(false)}
                  className={`nx-btn ${selectedProject.link && selectedProject.link !== '#' ? 'nx-btn--ghost' : 'nx-btn--primary'}`}
                >
                  <span className="nx-btn__icon">↳</span>
                  <span className="nx-btn__label">Inquire Similar Project</span>
                </a>
              </div>
              <span className="font-mono text-xs uppercase text-nx-stone-500">
                Crafted by Sayyad Arshad
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
