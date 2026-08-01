'use client';
import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { animate } from 'animejs';
import { Check, ChevronDown, Award, MapPin, Landmark, Search, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function ScholarshipsClient() {
  const container = useRef<HTMLDivElement>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showResults, setShowResults] = useState(false);

  useGSAP(() => {
    gsap.fromTo('.hero-anim',
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: 'power3.out' }
    );

    gsap.utils.toArray('.scholarship-card').forEach((card: any) => {
      gsap.fromTo(card,
        { opacity: 0, scale: 0.95, y: 30 },
        {
          opacity: 1, scale: 1, y: 0, duration: 0.6, ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
          }
        }
      );
    });
  }, { scope: container });

  const toggleFaq = (index: number) => {
    const isCurrentlyOpen = openFaq === index;
    setOpenFaq(isCurrentlyOpen ? null : index);
  };

  useEffect(() => {
    document.querySelectorAll('.faq-body').forEach((el, i) => {
      const htmlEl = el as HTMLElement;
      if (openFaq === i) {
        htmlEl.style.display = 'block';
        animate(htmlEl, { height: [0, htmlEl.scrollHeight], opacity: [0, 1], duration: 300, ease: 'outQuad' });
      } else {
        animate(htmlEl, { height: 0, opacity: 0, duration: 300, ease: 'inQuad', onComplete: () => { htmlEl.style.display = 'none'; } });
      }
    });
  }, [openFaq]);

  const handleCheckEligibility = (e: React.FormEvent) => {
    e.preventDefault();
    setShowResults(true);
  };

  const scholarships = [
    {
      title: "Bourse du Gouvernement Chinois (CSC)",
      icon: Landmark,
      color: "from-[#e4b04f]/20 to-[#e4b04f]/5",
      borderColor: "border-[#e4b04f]/50",
      iconColor: "text-[#e4b04f]",
      coverage: ["Frais de scolarité à 100%", "Hébergement gratuit (campus)", "Allocation mensuelle (2500-3500 RMB)", "Assurance médicale complète"],
      criteria: "Excellence académique, HSK (optionnel selon le programme), Âge limite (Licence < 25 ans, Master < 35 ans)",
      value: "Complète (Type A / Type B)"
    },
    {
      title: "Bourses Provinciales / Municipales",
      icon: MapPin,
      color: "from-[#75d4bc]/20 to-[#75d4bc]/5",
      borderColor: "border-[#75d4bc]/50",
      iconColor: "text-[#75d4bc]",
      coverage: ["Couverture partielle ou totale des frais", "Parfois allocation de subsistance", "Soutien local à l'intégration"],
      criteria: "Bons résultats scolaires, Choix d'université dans la province spécifique, Compétition moins rude que CSC",
      value: "Partielle à Complète"
    },
    {
      title: "Bourses Universitaires",
      icon: Award,
      color: "from-white/10 to-transparent",
      borderColor: "border-[var(--atlas-line)]",
      iconColor: "text-white",
      coverage: ["Réduction des frais de scolarité (50-100%)", "Hébergement gratuit (selon université)", "Prix d'excellence annuels"],
      criteria: "Décision interne de l'université, Entretien possible, Dossier solide lors de l'admission",
      value: "Réduction des frais"
    }
  ];

  const faqs = [
    { q: "Quelle est la date limite pour postuler à la bourse CSC ?", a: "Généralement entre janvier et début avril de chaque année pour la rentrée de septembre. Il est conseillé de commencer la préparation dès novembre." },
    { q: "Puis-je cumuler plusieurs bourses ?", a: "Non, en général, il n'est pas possible de cumuler la bourse gouvernementale (CSC) avec d'autres bourses complètes. Cependant, quelques aides ponctuelles universitaires peuvent parfois s'ajouter." },
    { q: "L'allocation mensuelle est-elle suffisante pour vivre ?", a: "Oui, une allocation de 2500 RMB (Licence) à 3500 RMB (Doctorat) est très confortable en Chine puisque l'hébergement et la scolarité sont déjà couverts." },
    { q: "Dois-je payer des frais d'agence si je n'obtiens pas la bourse ?", a: "NexTrip propose des forfaits avec garantie ou remboursement partiel. Nous évaluons vos chances avant de commencer le processus complet." },
    { q: "Les étudiants de tous les pays africains sont-ils éligibles ?", a: "Oui, la Chine a des accords bilatéraux avec la quasi-totalité des pays africains. Les quotas varient selon le pays (Bourse Type A via l'ambassade)." }
  ];

  return (
    <main ref={container} className="bg-[var(--atlas-ink)] min-h-screen text-white pt-24 pb-20 overflow-hidden">
      {/* Hero */}
      <section className="relative px-6 py-24 text-center max-w-5xl mx-auto">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[300px] bg-[var(--atlas-gold)]/10 blur-[120px] rounded-full -z-10"></div>
        <div className="hero-anim inline-block bg-[var(--atlas-jade)]/10 text-[var(--atlas-jade)] px-4 py-1.5 rounded-full text-sm font-semibold mb-6 border border-[var(--atlas-jade)]/20">
          Financement & Aides
        </div>
        <h1 className="hero-anim text-5xl md:text-7xl font-bold mb-6 text-[var(--atlas-paper)]">
          Étudiez sans <span className="text-[var(--atlas-gold)]">limites financières</span>
        </h1>
        <p className="hero-anim text-xl text-[var(--atlas-paper)]/70 max-w-2xl mx-auto">
          Plus de 95% de nos étudiants obtiennent une forme de financement. Découvrez les opportunités qui s'offrent à vous en Chine.
        </p>
      </section>

      {/* Eligibility Checker */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto bg-[var(--atlas-ink-soft)] p-8 md:p-10 rounded-[2rem] border border-[var(--atlas-line)] shadow-xl relative z-10">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Search className="text-[var(--atlas-jade)]" /> Vérifier l'éligibilité
          </h2>
          <form onSubmit={handleCheckEligibility} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <select className="bg-[var(--atlas-ink)] border border-[var(--atlas-line)] rounded-xl px-4 py-3 focus:border-[var(--atlas-gold)] outline-none" required>
              <option value="">Niveau d'études</option>
              <option value="bachelor">Licence</option>
              <option value="master">Master</option>
              <option value="phd">Doctorat</option>
            </select>
            <select className="bg-[var(--atlas-ink)] border border-[var(--atlas-line)] rounded-xl px-4 py-3 focus:border-[var(--atlas-gold)] outline-none" required>
              <option value="">Nationalité</option>
              <option value="africa">Afrique (Général)</option>
              <option value="europe">Europe</option>
              <option value="other">Autre</option>
            </select>
            <button type="submit" className="bg-[var(--atlas-gold)] text-[var(--atlas-ink)] font-bold py-3 rounded-xl hover:bg-white transition-colors">
              Rechercher
            </button>
          </form>

          {showResults && (
            <div className="mt-8 p-6 bg-[var(--atlas-jade)]/10 border border-[var(--atlas-jade)]/30 rounded-xl animate-fade-in">
              <h3 className="text-xl font-bold text-[var(--atlas-jade)] mb-2">Bonne nouvelle !</h3>
              <p className="text-[var(--atlas-paper)]/80">Vous êtes potentiellement éligible à la <strong>Bourse CSC (Type B)</strong> et aux <strong>Bourses Provinciales</strong>. Contactez-nous pour une évaluation approfondie.</p>
            </div>
          )}
        </div>
      </section>

      {/* Scholarships Grid */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">Types de Bourses</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {scholarships.map((sch, i) => (
            <div key={i} className={`scholarship-card bg-[var(--atlas-ink-soft)] rounded-[2rem] border ${sch.borderColor} overflow-hidden flex flex-col h-full relative group`}>
              <div className={`p-8 bg-gradient-to-b ${sch.color}`}>
                <sch.icon className={`w-12 h-12 mb-4 ${sch.iconColor}`} />
                <h3 className="text-2xl font-bold">{sch.title}</h3>
                <div className="mt-4 inline-block bg-[var(--atlas-ink)]/50 px-3 py-1 rounded-full text-sm font-medium border border-white/10 backdrop-blur-sm">
                  {sch.value}
                </div>
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <div className="mb-6 flex-1">
                  <h4 className="text-sm uppercase tracking-wider text-[var(--atlas-paper)]/50 font-bold mb-4">Ce qui est couvert</h4>
                  <ul className="space-y-3">
                    {sch.coverage.map((cov, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <Check size={18} className="text-[var(--atlas-jade)] mt-0.5 shrink-0" />
                        <span className="text-[var(--atlas-paper)]/80 text-sm">{cov}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm uppercase tracking-wider text-[var(--atlas-paper)]/50 font-bold mb-2">Critères clés</h4>
                  <p className="text-sm text-[var(--atlas-paper)]/70 mb-8">{sch.criteria}</p>
                  <button className="w-full py-3 rounded-xl border border-[var(--atlas-line)] hover:border-[var(--atlas-gold)] text-[var(--atlas-gold)] font-semibold transition-colors group-hover:bg-[var(--atlas-gold)] group-hover:text-[var(--atlas-ink)]">
                    En savoir plus
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6 max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-10 text-center">Foire Aux Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-[var(--atlas-line)] rounded-xl bg-[var(--atlas-ink-soft)] overflow-hidden">
              <button 
                onClick={() => toggleFaq(i)}
                className="w-full text-left px-6 py-5 font-semibold flex justify-between items-center hover:bg-white/5 transition-colors"
              >
                <span className="pr-4">{faq.q}</span>
                <ChevronDown className={`transform transition-transform shrink-0 ${openFaq === i ? 'rotate-180' : ''}`} />
              </button>
              <div className="faq-body overflow-hidden px-6" style={{ display: 'none', height: 0 }}>
                <div className="pb-5 text-[var(--atlas-paper)]/70 leading-relaxed">{faq.a}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 text-center">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-[#06101f] to-[#1a365d] border border-[var(--atlas-gold)]/30 rounded-[3rem] p-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(228,176,79,0.15)_0,transparent_70%)]"></div>
          <h2 className="text-4xl font-bold mb-6 relative z-10">Maximisez vos chances de bourse</h2>
          <p className="text-lg text-[var(--atlas-paper)]/80 mb-8 max-w-2xl mx-auto relative z-10">
            Ne laissez pas une erreur administrative compromettre votre financement. Nos experts montent votre dossier pour vous assurer le succès.
          </p>
          <button className="bg-[var(--atlas-gold)] text-[var(--atlas-ink)] px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform duration-300 flex items-center gap-2 mx-auto relative z-10">
            Contacter un expert <ArrowRight size={20} />
          </button>
        </div>
      </section>
    </main>
  );
}
