'use client';

import React, { useEffect, useCallback } from 'react';
import Image from 'next/image';
import { oswald } from "@/lib/fonts";
import { X, BookOpen, CurrencyDollar, CheckCircle, Users, MapPin, ArrowRight } from '@phosphor-icons/react';
import { getUniversityById } from './UniversityData';


interface UniversityModalProps {
  universityId: string | null;
  onClose: () => void;
}

export function UniversityModal({ universityId, onClose }: UniversityModalProps) {
  const university = universityId ? getUniversityById(universityId) : null;

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (!universityId) return;
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [universityId, handleKeyDown]);

  if (!university) return null;

  return (
    <div
      className="uni-modal-backdrop fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md transition-opacity duration-300"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${university.name} details`}
    >
      <div
        className="uni-modal bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto relative shadow-2xl border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          className="uni-modal-close absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-slate-900/60 text-white flex items-center justify-center backdrop-blur-md hover:bg-slate-900 transition-colors"
          onClick={onClose}
          aria-label="Close modal"
        >
          <X size={20} weight="bold" />
        </button>

        {/* Hero Section */}
        <div className="uni-modal-hero relative h-64 sm:h-80 w-full overflow-hidden rounded-t-3xl">
          <Image
            src={university.image}
            alt={`${university.name} campus`}
            fill
            sizes="900px"
            className="uni-modal-hero-image object-cover"
          />
          <div className="uni-modal-hero-overlay absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
          <div className="uni-modal-hero-content absolute bottom-6 left-6 right-6 text-white">
            <span className={`uni-modal-badge inline-block px-3 py-1 bg-amber-500 text-slate-950 font-bold text-xs rounded-full uppercase tracking-wider mb-2 ${oswald.className}`}>
              QS WORLD RANKING #{university.qsRanking}
            </span>
            <h2 className={`uni-modal-title ${oswald.className} text-3xl sm:text-4xl font-bold uppercase tracking-tight`}>
              {university.name}
            </h2>
            <p className="uni-modal-subtitle flex items-center gap-1.5 text-slate-300 text-sm mt-1">
              <MapPin size={16} weight="fill" className="text-amber-400" />
              <span>{university.location}</span>
            </p>
          </div>
        </div>

        {/* Modal Body */}
        <div className="uni-modal-body p-6 sm:p-8 space-y-8">
          <p className="uni-modal-description text-slate-700 leading-relaxed text-base">
            {university.description}
          </p>

          {/* Key Metrics Grid */}
          <div className="uni-modal-stats-grid grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <div className="uni-modal-stat-item flex items-center gap-3">
              <BookOpen size={24} weight="bold" className="text-blue-600" />
              <div>
                <span className={`uni-modal-stat-value block text-lg font-bold text-slate-900 ${oswald.className}`}>
                  {university.stats.programs}+
                </span>
                <span className="uni-modal-stat-label text-xs text-slate-500 font-medium uppercase">Programs</span>
              </div>
            </div>
            <div className="uni-modal-stat-item flex items-center gap-3">
              <CurrencyDollar size={24} weight="bold" className="text-emerald-600" />
              <div>
                <span className={`uni-modal-stat-value block text-lg font-bold text-slate-900 ${oswald.className}`}>
                  {university.stats.tuition}
                </span>
                <span className="uni-modal-stat-label text-xs text-slate-500 font-medium uppercase">Tuition/Yr</span>
              </div>
            </div>
            <div className="uni-modal-stat-item flex items-center gap-3">
              <CheckCircle size={24} weight="fill" className="text-amber-600" />
              <div>
                <span className={`uni-modal-stat-value block text-lg font-bold text-slate-900 ${oswald.className}`}>
                  {university.stats.acceptanceRate}
                </span>
                <span className="uni-modal-stat-label text-xs text-slate-500 font-medium uppercase">Acceptance</span>
              </div>
            </div>
            <div className="uni-modal-stat-item flex items-center gap-3">
              <Users size={24} weight="bold" className="text-purple-600" />
              <div>
                <span className={`uni-modal-stat-value block text-lg font-bold text-slate-900 ${oswald.className}`}>
                  {university.stats.studentPopulation}
                </span>
                <span className="uni-modal-stat-label text-xs text-slate-500 font-medium uppercase">Students</span>
              </div>
            </div>
          </div>

          {/* Programs Offered */}
          <div className="uni-modal-section">
            <h3 className={`uni-modal-section-title ${oswald.className} text-xl font-bold uppercase text-slate-900 mb-3`}>
              Available Degree Programs
            </h3>
            <div className="uni-modal-tags flex flex-wrap gap-2">
              {university.programsOffered.map((p) => (
                <span
                  key={p}
                  className="uni-modal-tag px-3 py-1.5 bg-blue-50 text-blue-900 border border-blue-200/60 rounded-lg text-xs font-semibold"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>

          {/* Admission Requirements */}
          <div className="uni-modal-section">
            <h3 className={`uni-modal-section-title ${oswald.className} text-xl font-bold uppercase text-slate-900 mb-2`}>
              Admission Criteria
            </h3>
            <p className="uni-modal-section-text text-slate-600 text-sm leading-relaxed">
              {university.requirements}
            </p>
          </div>

          {/* Scholarships */}
          <div className="uni-modal-section">
            <h3 className={`uni-modal-section-title ${oswald.className} text-xl font-bold uppercase text-slate-900 mb-2`}>
              Scholarship Opportunities
            </h3>
            <p className="uni-modal-section-text text-slate-600 text-sm leading-relaxed">
              {university.scholarships}
            </p>
          </div>

          {/* Action CTA */}
          <button className={`uni-modal-apply w-full py-4 bg-blue-900 hover:bg-blue-950 text-white rounded-xl font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg ${oswald.className}`}>
            <span>INITIATE APPLICATION TO {university.shortName}</span>
            <ArrowRight size={18} weight="bold" />
          </button>
        </div>
      </div>
    </div>
  );
}
