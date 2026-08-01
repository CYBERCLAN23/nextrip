'use client';
import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { BookOpen, GraduationCap, Building2, Wallet, Users, Globe2, ArrowRight, CheckCircle2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function StudyInChinaClient() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo('.hero-title', 
      { opacity: 0, y: 50 }, 
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out', stagger: 0.2 }
    );
    
    gsap.utils.toArray('.stat-card').forEach((card: any) => {
      gsap.fromTo(card, 
        { opacity: 0, y: 30 },
        {
          opacity: 1, 
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    gsap.utils.toArray('.adv-section').forEach((sec: any) => {
      gsap.fromTo(sec, 
        { opacity: 0, x: sec.classList.contains('reverse') ? 50 : -50 },
        {
          opacity: 1, x: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: {
            trigger: sec,
            start: 'top 80%',
          }
        }
      );
    });
  }, { scope: container });

  const stats = [
    { title: "500+", desc: "Universités partenaires", icon: Building2 },
    { title: "3.5M+", desc: "Étudiants internationaux", icon: Users },
    { title: "30+", desc: "Types de bourses", icon: Wallet },
    { title: "#2", desc: "Investissement R&D mondial", icon: Globe2 },
    { title: "6", desc: "Universités top 100 QS", icon: GraduationCap },
    { title: "100%", desc: "Programmes en anglais", icon: BookOpen }
  ];

  return (
    <main ref={container} className="bg-[var(--atlas-ink)] min-h-screen text-white pt-24 pb-20 overflow-hidden">
      <section className="relative px-6 py-20 md:py-32 max-w-7xl mx-auto flex flex-col items-center text-center">
        <div className="absolute inset-0 overflow-hidden -z-10 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(45deg,transparent_25%,rgba(228,176,79,0.1)_50%,transparent_75%,transparent_100%)] bg-[length:20px_20px]"></div>
        </div>
        <h1 className="hero-title text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-[var(--atlas-paper)]">
          La Chine, votre prochaine <br/> <span className="text-[var(--atlas-gold)]">frontière académique</span>
        </h1>
        <p className="hero-title text-lg md:text-xl max-w-2xl text-[var(--atlas-paper)]/80 mb-10">
          Rejoignez la destination éducative à la croissance la plus rapide au monde. Technologie de pointe, bourses généreuses et culture millénaire.
        </p>
        <button className="hero-title bg-[var(--atlas-gold)] text-[var(--atlas-ink)] px-8 py-4 rounded-full font-semibold flex items-center gap-2 hover:scale-105 transition-transform duration-300">
          Commencer l'aventure <ArrowRight size={20} />
        </button>
      </section>

      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Pourquoi Choisir la Chine ?</h2>
          <p className="text-[var(--atlas-paper)]/70">Des opportunités sans précédent pour les étudiants internationaux.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <div key={i} className="stat-card bg-[var(--atlas-ink-soft)] p-8 rounded-2xl border border-[var(--atlas-line)] hover:border-[var(--atlas-gold)]/50 transition-colors group">
              <stat.icon className="text-[var(--atlas-jade)] mb-6 w-12 h-12 group-hover:scale-110 transition-transform" />
              <h3 className="text-4xl font-bold text-[var(--atlas-gold)] mb-2">{stat.title}</h3>
              <p className="text-lg text-[var(--atlas-paper)]/80">{stat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 px-6 max-w-7xl mx-auto space-y-32">
        <div className="adv-section flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-1/2 aspect-video rounded-3xl bg-gradient-to-tr from-[#06101f] to-[#1a365d] border border-[var(--atlas-line)] shadow-2xl relative overflow-hidden group">
             <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(117,212,188,0.2)_50%,transparent_75%,transparent_100%)] bg-[length:40px_40px] opacity-30"></div>
          </div>
          <div className="w-full md:w-1/2 space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--atlas-paper)]">Qualité académique de <span className="text-[var(--atlas-gold)]">classe mondiale</span></h2>
            <p className="text-[var(--atlas-paper)]/70 text-lg leading-relaxed">
              Les universités chinoises grimpent rapidement dans les classements mondiaux. Profitez d'infrastructures de recherche ultra-modernes et de professeurs de renommée internationale.
            </p>
            <ul className="space-y-3">
              {['Laboratoires à la pointe de la technologie', 'Partenariats avec l\'industrie', 'Diplômes reconnus mondialement'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-[var(--atlas-paper)]/90">
                  <CheckCircle2 className="text-[var(--atlas-jade)] w-5 h-5" /> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="adv-section reverse flex flex-col md:flex-row-reverse items-center gap-12">
          <div className="w-full md:w-1/2 aspect-video rounded-3xl bg-gradient-to-bl from-[#0d1d33] to-[#2c1808] border border-[var(--atlas-gold)]/30 shadow-2xl relative overflow-hidden">
             <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_center,rgba(228,176,79,0.3)_0,transparent_100%)]"></div>
          </div>
          <div className="w-full md:w-1/2 space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--atlas-paper)]">Coût de la vie <span className="text-[var(--atlas-gold)]">abordable</span></h2>
            <p className="text-[var(--atlas-paper)]/70 text-lg leading-relaxed">
              Comparé à l'Occident, la Chine offre un coût de la vie très attractif sans compromis sur la qualité. Des logements modernes aux transports ultra-rapides.
            </p>
            <button className="text-[var(--atlas-gold)] font-semibold flex items-center gap-2 hover:gap-4 transition-all">
              Découvrir le guide financier <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 relative max-w-5xl mx-auto text-center">
        <div className="absolute inset-0 bg-[var(--atlas-ink-soft)] rounded-[3rem] -z-10 transform -rotate-1 scale-105 border border-[var(--atlas-line)]"></div>
        <h2 className="text-4xl md:text-5xl font-bold mb-6">Prêt à transformer votre avenir ?</h2>
        <p className="text-xl text-[var(--atlas-paper)]/70 mb-10 max-w-2xl mx-auto">
          Nos experts sont là pour vous guider à chaque étape, de la sélection de l'université à l'obtention de votre visa.
        </p>
        <button className="bg-[var(--atlas-jade)] text-[var(--atlas-ink)] px-10 py-4 rounded-full font-bold text-lg hover:bg-[var(--atlas-paper)] transition-colors duration-300">
          Évaluation gratuite de profil
        </button>
      </section>
    </main>
  );
}
