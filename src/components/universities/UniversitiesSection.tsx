'use client';

import React from 'react';
import { oswald } from "@/lib/fonts";
import { Globe } from "@/components/ui/cobe-globe";
import { GraduationCap, GlobeHemisphereWest, Airplane, BookOpen, Flag, Buildings } from '@phosphor-icons/react';
import './universities.css';

const AFRICA_LAGOS: [number, number] = [6.5244, 3.3792];
const CHINA_BEIJING: [number, number] = [39.9042, 116.4074];
const GERMANY_BERLIN: [number, number] = [52.52, 13.405];
const AFRICA_NAIROBI: [number, number] = [-1.2921, 36.8219];
const AFRICA_ADDIS: [number, number] = [9.032, 38.7469];
const AFRICA_CAIRO: [number, number] = [30.0444, 31.2357];

const GLOBE_MARKERS = [
  { id: 'lagos', location: AFRICA_LAGOS, size: 0.03, label: 'Lagos' },
  { id: 'nairobi', location: AFRICA_NAIROBI, size: 0.028, label: 'Nairobi' },
  { id: 'addis', location: AFRICA_ADDIS, size: 0.026, label: 'Addis Ababa' },
  { id: 'cairo', location: AFRICA_CAIRO, size: 0.028, label: 'Cairo' },
  { id: 'beijing', location: CHINA_BEIJING, size: 0.03, label: 'Beijing' },
  { id: 'berlin', location: GERMANY_BERLIN, size: 0.03, label: 'Berlin' },
];

const GLOBE_ARCS = [
  {
    id: 'africa-china',
    from: AFRICA_LAGOS,
    to: CHINA_BEIJING,
    color: [0.83, 0.68, 0.22] as [number, number, number],
  },
  {
    id: 'africa-germany',
    from: AFRICA_NAIROBI,
    to: GERMANY_BERLIN,
    color: [0.3, 0.6, 0.9] as [number, number, number],
  },
  {
    id: 'africa-china-2',
    from: AFRICA_CAIRO,
    to: CHINA_BEIJING,
    color: [0.83, 0.68, 0.22] as [number, number, number],
  },
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
              <Globe
                markers={GLOBE_MARKERS}
                arcs={GLOBE_ARCS}
                markerColor={[0.83, 0.68, 0.22]}
                arcColor={[0.3, 0.6, 0.9]}
                baseColor={[0.92, 0.92, 0.95]}
                glowColor={[0.9, 0.9, 0.95]}
                dark={0}
                mapBrightness={6}
                markerSize={0.03}
                markerElevation={0.015}
                arcWidth={1.4}
                arcHeight={1.5}
                diffuse={1.2}
                autoRotate
                rotationSpeed={0.003}
              />
            </div>

            <div className="uni-arc-legend">
              <div className="uni-arc-item">
                <span className="uni-arc-line uni-arc-line--china" />
                <span>Africa &rarr; China</span>
              </div>
              <div className="uni-arc-item">
                <span className="uni-arc-line uni-arc-line--germany" />
                <span>Africa &rarr; Germany</span>
              </div>
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
