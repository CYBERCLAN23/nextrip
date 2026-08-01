'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { animate } from 'animejs'
import { CheckCircle2, ArrowRight, Star, DollarSign, Users, ChevronDown, Award, BookOpen, Search } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function ScholarshipsPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const resultsRef = useRef<HTMLDivElement>(null)
  
  // Eligibility states
  const [level, setLevel] = useState('')
  const [nationality, setNationality] = useState('')
  const [field, setField] = useState('')
  const [showResults, setShowResults] = useState(false)
  const [activeFaq, setActiveFaq] = useState<number | null>(null)

  useGSAP(() => {
    // Hero Anim
    gsap.from('.hero-badge', { y: -20, opacity: 0, duration: 0.8, ease: 'back.out(1.7)' })
    gsap.from('.hero-title', { y: 30, opacity: 0, duration: 1, delay: 0.2, ease: 'power3.out' })
    
    // Cards Anim
    const cards = gsap.utils.toArray('.scholarship-card')
    cards.forEach((card: any, i) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 85%'
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: i * 0.2
      })
    })

    // Timeline Anim
    gsap.from('.timeline-item', {
      scrollTrigger: {
        trigger: '.timeline-container',
        start: 'top 80%'
      },
      x: -30,
      opacity: 0,
      stagger: 0.2,
      duration: 0.8,
      ease: 'power2.out'
    })

  }, { scope: containerRef })

  const handleCheckEligibility = (e: React.FormEvent) => {
    e.preventDefault()
    if (!level || !nationality || !field) return

    setShowResults(false)
    
    // Fake processing time
    setTimeout(() => {
      setShowResults(true)
      if (resultsRef.current) {
        animate(resultsRef.current.children, {
          translateY: [20, 0],
          opacity: [0, 1],
          delay: (_: any, i = 0) => i * 150,
          duration: 800,
          ease: 'outExpo'
        })
      }
    }, 600)
  }

  const toggleFaq = (idx: number) => {
    setActiveFaq(activeFaq === idx ? null : idx)
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-[var(--atlas-ink)] text-[var(--atlas-paper)]">
      
      {/* HERO */}
      <section className="relative pt-32 pb-20 px-6 flex flex-col items-center text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[var(--atlas-gold)]/10 blur-[120px] rounded-full"></div>
        </div>
        
        <div className="hero-badge inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--atlas-gold)]/10 border border-[var(--atlas-gold)]/30 text-[var(--atlas-gold)] text-sm font-semibold mb-8">
          <Award size={16} /> Bourses 2024-2025 Ouvertes
        </div>
        
        <h1 className="hero-title text-5xl md:text-7xl font-bold max-w-4xl tracking-tight leading-[1.1] mb-6">
          Trouvez votre <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--atlas-gold)] to-orange-400">bourse d'études</span> en Chine
        </h1>
        <p className="hero-title text-xl text-gray-400 max-w-2xl">
          Plus de 95% de nos étudiants obtiennent un financement. Découvrez quelle bourse correspond à votre profil.
        </p>
      </section>

      {/* MAIN SCHOLARSHIP CARDS */}
      <section className="py-16 px-6 max-w-7xl mx-auto space-y-8">
        
        {/* CSC Card */}
        <div className="scholarship-card rounded-3xl border border-[var(--atlas-line)] bg-[var(--atlas-ink-soft)] overflow-hidden flex flex-col lg:flex-row relative">
          <div className="absolute top-0 right-0 p-8 opacity-5 text-[var(--atlas-gold)] pointer-events-none">
            <Award size={200} />
          </div>
          <div className="lg:w-2/5 bg-gradient-to-br from-[var(--atlas-ink)] to-[var(--atlas-ink-soft)] border-r border-[var(--atlas-line)] p-10 flex flex-col justify-between relative z-10">
            <div>
              <span className="text-xs font-bold tracking-widest uppercase text-[var(--atlas-gold)] mb-4 block">Gouvernementale</span>
              <h2 className="text-3xl font-bold mb-4">Bourse du Gouvernement Chinois (CSC)</h2>
              <div className="inline-block px-4 py-2 bg-[var(--atlas-gold)]/10 border border-[var(--atlas-gold)]/30 text-[var(--atlas-gold)] rounded-lg font-semibold mb-6">
                Couverture Totale Type A & B
              </div>
              <p className="text-gray-400">La bourse la plus prestigieuse, offrant un financement complet pour la durée totale de vos études en Chine.</p>
            </div>
            <Link href="/admissions" className="mt-8 inline-flex items-center gap-2 text-[var(--atlas-gold)] font-medium hover:gap-4 transition-all">
              Postuler via NexTrip <ArrowRight size={18} />
            </Link>
          </div>
          <div className="lg:w-3/5 p-10 grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
            <div>
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <DollarSign size={20} className="text-[var(--atlas-jade)]" /> Ce qui est inclus
              </h3>
              <ul className="space-y-3">
                {['Frais de scolarité à 100%', 'Hébergement en résidence', 'Allocation 2500-3500 CNY/mois', 'Assurance médicale complète', 'Exonération des frais d\'inscription'].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-[var(--atlas-jade)] mt-0.5 shrink-0" />
                    <span className="text-gray-300 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <Users size={20} className="text-blue-400" /> Éligibilité
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-sm text-gray-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0"></div>
                  Nationalité non-chinoise
                </li>
                <li className="flex items-start gap-3 text-sm text-gray-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0"></div>
                  Bachelor: -25 ans, Master: -35 ans, PhD: -40 ans
                </li>
                <li className="flex items-start gap-3 text-sm text-gray-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0"></div>
                  Excellent dossier académique
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Provincial Card */}
          <div className="scholarship-card rounded-3xl border border-[var(--atlas-line)] bg-[var(--atlas-ink-soft)] overflow-hidden flex flex-col">
            <div className="h-2 w-full bg-gradient-to-r from-[var(--atlas-jade)] to-teal-500"></div>
            <div className="p-8 flex-1 flex flex-col">
              <span className="text-xs font-bold tracking-widest uppercase text-[var(--atlas-jade)] mb-4 block">Régionale</span>
              <h2 className="text-2xl font-bold mb-4">Bourses Provinciales & Municipales</h2>
              <div className="inline-block px-3 py-1 bg-[var(--atlas-jade)]/10 border border-[var(--atlas-jade)]/30 text-[var(--atlas-jade)] rounded-lg font-semibold text-sm mb-6 w-fit">
                Couverture Partielle à Totale
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                <li className="flex items-start gap-3 text-sm text-gray-300"><CheckCircle2 size={18} className="text-[var(--atlas-jade)] shrink-0" /> Frais de scolarité complets ou partiels</li>
                <li className="flex items-start gap-3 text-sm text-gray-300"><CheckCircle2 size={18} className="text-[var(--atlas-jade)] shrink-0" /> Logement parfois inclus (selon province)</li>
                <li className="flex items-start gap-3 text-sm text-gray-300"><CheckCircle2 size={18} className="text-[var(--atlas-jade)] shrink-0" /> Idéal comme option de secours au CSC</li>
              </ul>
              <Link href="/admissions" className="inline-flex items-center gap-2 text-white font-medium hover:text-[var(--atlas-jade)] transition-colors">
                En savoir plus <ArrowRight size={18} />
              </Link>
            </div>
          </div>

          {/* University Card */}
          <div className="scholarship-card rounded-3xl border border-[var(--atlas-line)] bg-[var(--atlas-ink-soft)] overflow-hidden flex flex-col">
            <div className="h-2 w-full bg-gradient-to-r from-blue-400 to-indigo-500"></div>
            <div className="p-8 flex-1 flex flex-col">
              <span className="text-xs font-bold tracking-widest uppercase text-blue-400 mb-4 block">Institutionnelle</span>
              <h2 className="text-2xl font-bold mb-4">Bourses d'Universités (Presidential)</h2>
              <div className="inline-block px-3 py-1 bg-blue-500/10 border border-blue-500/30 text-blue-400 rounded-lg font-semibold text-sm mb-6 w-fit">
                Réduction 20-100% Scolarité
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                <li className="flex items-start gap-3 text-sm text-gray-300"><CheckCircle2 size={18} className="text-blue-400 shrink-0" /> Moins compétitive que le CSC</li>
                <li className="flex items-start gap-3 text-sm text-gray-300"><CheckCircle2 size={18} className="text-blue-400 shrink-0" /> Souvent accordée pour l'excellence (1ère année)</li>
                <li className="flex items-start gap-3 text-sm text-gray-300"><CheckCircle2 size={18} className="text-blue-400 shrink-0" /> Allocation mensuelle parfois incluse</li>
              </ul>
              <Link href="/admissions" className="inline-flex items-center gap-2 text-white font-medium hover:text-blue-400 transition-colors">
                En savoir plus <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ELIGIBILITY CHECKER */}
      <section className="py-24 px-6 border-y border-[var(--atlas-line)] bg-[var(--atlas-ink)]/50 relative">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Vérificateur d'Éligibilité</h2>
            <p className="text-gray-400">Découvrez en 1 minute à quelles bourses vous pouvez prétendre.</p>
          </div>

          <div className="bg-[var(--atlas-ink-soft)] border border-[var(--atlas-line)] rounded-3xl p-8 shadow-2xl">
            <form onSubmit={handleCheckEligibility} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="relative">
                <label className="block text-xs font-medium text-gray-400 uppercase mb-2">Niveau d'études visé</label>
                <select 
                  required
                  value={level}
                  onChange={e => setLevel(e.target.value)}
                  className="w-full bg-[var(--atlas-ink)] border border-[var(--atlas-line)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[var(--atlas-gold)] appearance-none"
                >
                  <option value="">Sélectionner...</option>
                  <option value="bachelor">Bachelor / Licence</option>
                  <option value="master">Master</option>
                  <option value="phd">Doctorat / PhD</option>
                </select>
                <ChevronDown size={16} className="absolute right-4 bottom-3.5 text-gray-500 pointer-events-none" />
              </div>
              <div className="relative">
                <label className="block text-xs font-medium text-gray-400 uppercase mb-2">Nationalité</label>
                <select 
                  required
                  value={nationality}
                  onChange={e => setNationality(e.target.value)}
                  className="w-full bg-[var(--atlas-ink)] border border-[var(--atlas-line)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[var(--atlas-gold)] appearance-none"
                >
                  <option value="">Sélectionner...</option>
                  <option value="afrique">Pays d'Afrique</option>
                  <option value="europe">Pays d'Europe</option>
                  <option value="autre">Autre</option>
                </select>
                <ChevronDown size={16} className="absolute right-4 bottom-3.5 text-gray-500 pointer-events-none" />
              </div>
              <div className="relative">
                <label className="block text-xs font-medium text-gray-400 uppercase mb-2">Domaine</label>
                <select 
                  required
                  value={field}
                  onChange={e => setField(e.target.value)}
                  className="w-full bg-[var(--atlas-ink)] border border-[var(--atlas-line)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[var(--atlas-gold)] appearance-none"
                >
                  <option value="">Sélectionner...</option>
                  <option value="stem">STEM (Ingénierie, Tech)</option>
                  <option value="business">Business / Management</option>
                  <option value="medicine">Médecine / Santé</option>
                  <option value="arts">Arts & Humanités</option>
                </select>
                <ChevronDown size={16} className="absolute right-4 bottom-3.5 text-gray-500 pointer-events-none" />
              </div>
              <div className="md:col-span-3 flex justify-center mt-4">
                <button type="submit" className="px-8 py-4 bg-[var(--atlas-paper)] text-[var(--atlas-ink)] font-bold rounded-xl flex items-center gap-2 hover:bg-white transition-colors">
                  <Search size={18} /> Lancer la recherche
                </button>
              </div>
            </form>

            {/* RESULTS */}
            {showResults && (
              <div ref={resultsRef} className="pt-8 border-t border-[var(--atlas-line)] space-y-4">
                <div className="p-4 bg-[var(--atlas-gold)]/10 border border-[var(--atlas-gold)]/30 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-[var(--atlas-gold)]/20 flex items-center justify-center text-[var(--atlas-gold)]">
                      <Star size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-[var(--atlas-gold)]">Bourse CSC (Gouvernementale)</h4>
                      <p className="text-xs text-gray-400">Forte probabilité pour votre profil</p>
                    </div>
                  </div>
                  <Link href="/admissions" className="px-4 py-2 bg-[var(--atlas-gold)] text-[var(--atlas-ink)] text-sm font-semibold rounded-lg hover:scale-105 transition-transform">
                    Postuler
                  </Link>
                </div>

                <div className="p-4 bg-[var(--atlas-jade)]/10 border border-[var(--atlas-jade)]/30 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-[var(--atlas-jade)]/20 flex items-center justify-center text-[var(--atlas-jade)]">
                      <BookOpen size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-[var(--atlas-jade)]">Bourses Provinciales</h4>
                      <p className="text-xs text-gray-400">Excellente option alternative</p>
                    </div>
                  </div>
                  <Link href="/admissions" className="px-4 py-2 bg-[var(--atlas-jade)] text-[var(--atlas-ink)] text-sm font-semibold rounded-lg hover:scale-105 transition-transform">
                    Postuler
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="py-24 px-6 max-w-5xl mx-auto timeline-container">
        <h2 className="text-3xl font-bold mb-16 text-center">Le calendrier des bourses</h2>
        <div className="relative border-l-2 border-[var(--atlas-line)] ml-4 md:ml-1/2 space-y-12">
          {[
            { date: "Sept - Nov", title: "Préparation", desc: "Collecte des documents, traductions, notarisations et rédaction du plan d'études." },
            { date: "Dec - Fev", title: "Soumission CSC", desc: "La majorité des candidatures pour la bourse gouvernementale se fait à cette période." },
            { date: "Mars - Mai", title: "Bourses Universitaires", desc: "Ouverture et clôture des candidatures pour les bourses internes des universités." },
            { date: "Juin - Juillet", title: "Résultats", desc: "Annonce officielle des admissions et envois des lettres JW201/JW202 pour le visa." }
          ].map((step, i) => (
            <div key={i} className="timeline-item relative pl-8 md:pl-0 md:w-1/2 md:even:ml-auto md:odd:pr-12 md:even:pl-12">
              {/* Dot */}
              <div className="absolute top-0 -left-[9px] md:left-auto md:right-[-9px] md:even:left-[-9px] w-4 h-4 rounded-full bg-[var(--atlas-gold)] ring-4 ring-[var(--atlas-ink)]"></div>
              
              <div className="bg-[var(--atlas-ink-soft)] p-6 rounded-2xl border border-[var(--atlas-line)]">
                <span className="text-sm font-bold text-[var(--atlas-gold)] mb-2 block">{step.date}</span>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-gray-400 text-sm">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6 bg-[var(--atlas-ink-soft)]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Questions Fréquentes</h2>
            <p className="text-gray-400">Tout ce que vous devez savoir sur le financement de vos études.</p>
          </div>
          
          <div className="space-y-4">
            {[
              { q: "Quelle est la différence entre CSC et bourses universitaires?", a: "La bourse CSC (Gouvernementale) est généralement complète (scolarité, logement, allocation). Les bourses universitaires varient de 20% à 100% de réduction sur la scolarité et incluent rarement une allocation mensuelle." },
              { q: "Puis-je postuler à plusieurs bourses simultanément?", a: "Oui, nous vous conseillons fortement de candidater au CSC (Type A/B) ainsi qu'à des bourses provinciales/universitaires comme plans de secours pour maximiser vos chances." },
              { q: "Quelle est la date limite de candidature?", a: "Pour la rentrée de septembre, les délais du CSC se situent souvent entre fin février et début avril selon les universités. Il faut commencer son dossier dès novembre." },
              { q: "La bourse couvre-t-elle les frais de visa et billets d'avion?", a: "Généralement non. Même avec une bourse CSC complète, les billets d'avion, les frais de visa et le dépôt de garantie du logement restent souvent à la charge de l'étudiant (sauf exceptions bilatérales rares)." },
              { q: "NexTrip m'aide-t-il avec tous les documents?", a: "Absolument. Notre accompagnement inclut la révision de votre Study Plan, l'aide à l'obtention des lettres de recommandation, et les directives pour les notarisations légales." }
            ].map((faq, i) => (
              <div key={i} className="border border-[var(--atlas-line)] rounded-xl overflow-hidden bg-[var(--atlas-ink)]">
                <button 
                  onClick={() => toggleFaq(i)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
                >
                  <span className="font-semibold pr-8">{faq.q}</span>
                  <ChevronDown size={20} className={`shrink-0 text-gray-500 transition-transform duration-300 ${activeFaq === i ? 'rotate-180' : ''}`} />
                </button>
                <div 
                  className="overflow-hidden transition-all duration-300"
                  style={{ maxHeight: activeFaq === i ? '200px' : '0', opacity: activeFaq === i ? 1 : 0 }}
                >
                  <p className="p-6 pt-0 text-gray-400 text-sm leading-relaxed border-t border-[var(--atlas-line)] mt-2">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 text-center">
        <h2 className="text-4xl font-bold mb-6">Prêt à trouver votre bourse?</h2>
        <p className="text-gray-400 mb-10 max-w-xl mx-auto">Laissez nos experts évaluer votre dossier et vous orienter vers les meilleurs financements disponibles en Chine.</p>
        <Link href="/admissions" className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--atlas-gold)] text-[var(--atlas-ink)] font-bold rounded-xl hover:scale-105 transition-transform">
          Commencer l'évaluation gratuite <ArrowRight size={20} />
        </Link>
      </section>

    </div>
  )
}
