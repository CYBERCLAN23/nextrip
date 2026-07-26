'use client';

import React from 'react';
import { oswald } from "@/lib/fonts";
import { GlobePolaroids } from "@/components/ui/cobe-globe";
import { GraduationCap, GlobeHemisphereWest, Airplane, BookOpen, Flag, Buildings } from '@phosphor-icons/react';
import './universities.css';

const GLOBE_POLAROIDS = [
  { id: 'polaroid-lagos', location: [6.52, 3.38] as [number, number], image: 'https://images.unsplash.com/photo-1579003593419-98f949b9398f?w=120&h=120&fit=crop', caption: 'Lagos', rotate: -4 },
  { id: 'polaroid-nairobi', location: [-1.29, 36.82] as [number, number], image: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=120&h=120&fit=crop', caption: 'Nairobi', rotate: 3 },
  { id: 'polaroid-cairo', location: [30.04, 31.24] as [number, number], image: 'https://images.unsplash.com/photo-1572252009286-268acec5ca0a?w=120&h=120&fit=crop', caption: 'Cairo', rotate: -5 },
  { id: 'polaroid-beijing', location: [39.90, 116.41] as [number, number], image: 'https://images.unsplash.com/photo-1534256958596-7b2270dbb523?w=120&h=120&fit=crop', caption: 'Beijing', rotate: 6 },
  { id: 'polaroid-berlin', location: [52.52, 13.41] as [number, number], image: 'https://images.unsplash.com/photo-1560969184-10fe8719e047?w=120&h=120&fit=crop', caption: 'Berlin', rotate: -3 },
  { id: 'polaroid-shanghai', location: [31.23, 121.47] as [number, number], image: 'https://images.unsplash.com/photo-1537531383490-cc03e6f7f0e7?w=120&h=120&fit=crop', caption: 'Shanghai', rotate: 4 },
];

const STATS_DATA = [
  { icon: GraduationCap, value: '500+', label: 'Partner Universities' },
  { icon: GlobeHemisphereWest, value: '30+', label: 'Countries Connected' },
  { icon: Airplane, value: '12,000+', label: 'Students Placed' },
  { icon: BookOpen, value: '98%', label: 'Visa Success Rate' },
];

const REGION_DATA = [
  {
    icon: Flag,
    region: 'Africa Hubs',
    desc: 'Lagos, Nairobi, Cairo, Addis Ababa',
    color: '#D4AF37',
  },
  {
    icon: Buildings,
    region: 'China Destinations',
    desc: 'Beijing, Shanghai, Hong Kong',
    color: '#e8563a',
  },
  {
    icon: Flag,
    region: 'Germany Destinations',
    desc: 'Berlin, Munich, Frankfurt',
    color: '#4d8bf7',
  },
];

const DiamondTerminal = ({ className }: { className: string }) => (
  <svg className={`uni-terminal ${className}`} width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M8 0L9.8 6.2L16 8L9.8 9.8L8 16L6.2 9.8L0 8L6.2 6.2L8 0Z" fill="currentColor" />
  </svg>
);

export function UniversitiesSection() {
  return (
    <section className="uni-section relative py-24 overflow-hidden" aria-label="Universities">
      <div className="uni-bg-noise" />

      <div className="uni-crosshair-top">
        <DiamondTerminal className="uni-terminal--left" />
        <div className="uni-line-h" />
        <DiamondTerminal className="uni-terminal--right" />
      </div>

      <div className="uni-container max-w-7xl mx-auto px-6 relative z-10">
        {/* Editorial Header */}
        <header className="uni-header text-center max-w-3xl mx-auto mb-14">
          <span className={`uni-eyebrow ${oswald.className}`} data-animate-slide-l>
            05 / GLOBAL CAMPUS CATALOG & ADMISSIONS
          </span>
          <h2 className={`uni-heading ${oswald.className}`} data-animate-heading>
            EXPLORE 500+ ACCREDITED UNIVERSITIES
          </h2>
          <div className="uni-header-divider" data-animate-clip />
          <p className="uni-subheading" data-animate-fade>
            Direct admission channels, verified program criteria, and guaranteed scholarship waivers.
          </p>
        </header>

        {/* Globe + Content Layout */}
        <div className="uni-globe-layout">
          {/* Left: Globe */}
          <div className="uni-globe-side" data-animate-pop>
            <div className="uni-globe-wrap">
              <GlobePolaroids
                markers={GLOBE_POLAROIDS}
                speed={0.004}
              />
            </div>

          </div>

          {/* Right: Content */}
          <div className="uni-content-side" data-animate-fade>
            <h3 className={`uni-globe-title ${oswald.className}`}>
              Your Gateway to 500+ Global Universities
            </h3>
            <p className="uni-globe-text">
              NexTrip connects African students with premier universities across China and Germany. 
              Our verified admission channels and scholarship partnerships open doors to world-class education.
            </p>

            {/* Stats Grid */}
            <div className="uni-stats-grid">
              {STATS_DATA.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="uni-stat-card">
                    <Icon size={20} weight="bold" className="uni-stat-icon" />
                    <span className={`uni-stat-value ${oswald.className}`}>{item.value}</span>
                    <span className="uni-stat-label">{item.label}</span>
                  </div>
                );
              })}
            </div>

            {/* Region Connections */}
            <div className="uni-regions">
              {REGION_DATA.map((r) => {
                const Icon = r.icon;
                return (
                  <div key={r.region} className="uni-region-item">
                    <Icon size={18} weight="bold" style={{ color: r.color }} />
                    <div>
                      <span className="uni-region-name">{r.region}</span>
                      <span className="uni-region-desc">{r.desc}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default UniversitiesSection;
