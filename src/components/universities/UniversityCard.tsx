'use client';

import React, { memo, useCallback } from 'react';
import Image from 'next/image';
import { oswald } from "@/lib/fonts";
import {
  BookOpen,
  CurrencyDollar,
  CheckCircle,
  Users,
  ArrowUpRight,
} from '@phosphor-icons/react';
import type { University } from './UniversityData';


interface UniversityCardProps {
  university: University;
  onSelect: (id: string) => void;
}

const flagMap: Record<string, string> = {
  CA: '🇨🇦',
  DE: '🇩🇪',
  AU: '🇦🇺',
  FR: '🇫🇷',
  SG: '🇸🇬',
  GB: '🇬🇧',
};

export const UniversityCard = memo(function UniversityCard({
  university,
  onSelect,
}: UniversityCardProps) {
  const flag = flagMap[university.countryCode] || '🌐';

  const handleClick = useCallback(() => onSelect(university.id), [onSelect, university.id]);
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onSelect(university.id);
      }
    },
    [onSelect, university.id]
  );

  return (
    <div
      className="uni-card group cursor-pointer relative"
      data-uni-card={university.id}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`Explore ${university.name}`}
    >
      {/* Campus Image & QS Rank Badge */}
      <div className="uni-card-image-wrap relative overflow-hidden rounded-t-2xl h-52">
        <Image
          src={university.image}
          alt={`${university.name} campus`}
          fill
          sizes="(max-width: 768px) 100vw, 380px"
          className="uni-card-image object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="uni-card-image-overlay absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
        
        {/* Gold QS Ranking Badge */}
        <div className={`uni-card-badge absolute top-4 left-4 ${oswald.className}`}>
          QS WORLD RANK #{university.qsRanking}
        </div>
      </div>

      {/* Card Content */}
      <div className="uni-card-body p-6 bg-white border-x border-b border-slate-200/80 rounded-b-2xl">
        <div className="uni-card-name-row flex items-start gap-4 mb-4">
          <div className={`uni-card-name-initials ${oswald.className}`}>
            {university.shortName.slice(0, 2)}
          </div>
          <div className="uni-card-name-info flex-1">
            <h3 className={`uni-card-name ${oswald.className} text-xl font-bold text-slate-900 leading-snug`}>
              {university.name}
            </h3>
            <span className="uni-card-country flex items-center gap-1.5 text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">
              <span>{flag}</span>
              <span>{university.country}</span>
            </span>
          </div>
        </div>

        {/* Key Stats Bar */}
        <div className="uni-card-stats grid grid-cols-2 gap-3 py-3 border-y border-slate-100 my-4 text-xs font-medium text-slate-600">
          <div className="uni-card-stat flex items-center gap-2">
            <BookOpen size={16} weight="bold" className="text-amber-600" />
            <span>{university.stats.programs}+ Programs</span>
          </div>
          <div className="uni-card-stat flex items-center gap-2">
            <CurrencyDollar size={16} weight="bold" className="text-emerald-600" />
            <span className="font-semibold text-slate-800">{university.stats.tuition}</span>
          </div>
          <div className="uni-card-stat flex items-center gap-2">
            <CheckCircle size={16} weight="fill" className="text-blue-600" />
            <span>{university.stats.acceptanceRate} Accept</span>
          </div>
          <div className="uni-card-stat flex items-center gap-2">
            <Users size={16} weight="bold" className="text-purple-600" />
            <span>{university.stats.studentPopulation} Students</span>
          </div>
        </div>

        {/* Explore Button */}
        <span className={`uni-card-cta flex items-center justify-between text-xs font-bold text-blue-900 uppercase tracking-wider pt-1 group-hover:text-amber-600 transition-colors ${oswald.className}`}>
          <span>EXPLORE ADMISSIONS & SCHOLARSHIPS</span>
          <ArrowUpRight size={16} weight="bold" className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
        </span>
      </div>
    </div>
  );
});
