export interface ProjectItem {
  id: string;
  number: string;
  title: string;
  tagline: string;
  category: string;
  description: string;
  technologies: string[];
  year: string;
  link?: string;
  isExternal?: boolean;
  featured?: boolean;
  badge?: string;
  previewType: 'webgl' | 'interactive' | 'visual';
  highlights: string[];
  metrics?: string;
}

export interface ServiceItem {
  number: string;
  title: string;
  description: string;
  technologies: string[];
  href: string;
}

export interface ActivityCategory {
  number: string;
  title: string;
  shortDesc: string;
  tags: string[];
  badge: string;
}

export interface SkillCategory {
  category: string;
  items: {
    name: string;
    level: string;
    description: string;
    tags: string[];
  }[];
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface MetricItem {
  number: string;
  suffix?: string;
  label: string;
  context: string;
}
