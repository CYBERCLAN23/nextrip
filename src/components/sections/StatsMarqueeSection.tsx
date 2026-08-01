'use client';

import React from 'react';

export default function StatsMarqueeSection() {
  return (
    <section className="w-full bg-[#0d1d33] py-8 border-y border-[rgba(218,233,255,0.15)] overflow-hidden">
      <div className="relative flex overflow-hidden">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-16">
          {[...Array(2)].map((_, i) => (
            <React.Fragment key={i}>
              <div className="flex items-center gap-3 text-[#f6f2ea]/70">
                <span className="font-bold text-[#e4b04f]">95%</span>
                <span className="text-sm uppercase tracking-wider">Taux d'obtention de bourses</span>
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-[rgba(218,233,255,0.15)]" />
              <div className="flex items-center gap-3 text-[#f6f2ea]/70">
                <span className="font-bold text-[#e4b04f]">1er</span>
                <span className="text-sm uppercase tracking-wider">Choix pour l'Asie</span>
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-[rgba(218,233,255,0.15)]" />
              <div className="flex items-center gap-3 text-[#f6f2ea]/70">
                <span className="font-bold text-[#e4b04f]">40+</span>
                <span className="text-sm uppercase tracking-wider">Universités Partenaires</span>
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-[rgba(218,233,255,0.15)]" />
              <div className="flex items-center gap-3 text-[#f6f2ea]/70">
                <span className="font-bold text-[#e4b04f]">24/7</span>
                <span className="text-sm uppercase tracking-wider">Support Étudiant</span>
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-[rgba(218,233,255,0.15)]" />
            </React.Fragment>
          ))}
        </div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
      `}} />
    </section>
  );
}
