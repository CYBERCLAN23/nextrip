'use client'

import { useRef, useEffect } from 'react'
import Link from 'next/link'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { animate } from 'animejs'
import { ArrowRight, Globe, GraduationCap, DollarSign, Users, Star, Zap, Building, Coffee, BookOpen, MapPin, Heart, Shield } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function StudyInChina() {
  const containerRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    // Hero Animations
    gsap.from('.hero-word', {
      y: 100,
      opacity: 0,
      stagger: 0.1,
      duration: 1.2,
      ease: 'power4.out',
      delay: 0.2
    })
    
    gsap.from('.hero-sub', {
      y: 30,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      delay: 0.8
    })

    gsap.from('.hero-cta', {
      y: 20,
      opacity: 0,
      stagger: 0.2,
      duration: 0.8,
      ease: 'power3.out',
      delay: 1.2
    })

    // Advantages Animations
    const advantages = gsap.utils.toArray('.advantage-row')
    advantages.forEach((adv: any) => {
      gsap.from(adv, {
        scrollTrigger: {
          trigger: adv,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      })
    })

    // Grid Animations
    gsap.from('.grid-item', {
      scrollTrigger: {
        trigger: '.student-life-grid',
        start: 'top 75%'
      },
      y: 40,
      opacity: 0,
      stagger: 0.1,
      duration: 0.8,
      ease: 'power2.out'
    })

  }, { scope: containerRef })

  useEffect(() => {
    // Anime.js counter animations triggered by ScrollTrigger
    const st = ScrollTrigger.create({
      trigger: statsRef.current,
      start: 'top 85%',
      onEnter: () => {
        const counters = document.querySelectorAll('.stat-counter')
        counters.forEach((el) => {
          const targetStr = el.getAttribute('data-target') || '0'
          const suffix = el.getAttribute('data-suffix') || ''
          const prefix = el.getAttribute('data-prefix') || ''
          const target = parseInt(targetStr.replace(/,/g, ''), 10)
          
          const obj = { val: 0 }
          animate(obj, {
            val: target,
            duration: 2500,
            ease: 'outExpo',
            onUpdate: () => {
              // Format with commas if needed
              let formatted = Math.floor(obj.val).toString()
              if (target >= 1000) {
                formatted = Math.floor(obj.val).toLocaleString()
              }
              el.innerHTML = `${prefix}${formatted}${suffix}`
            }
          })
        })
      },
      once: true
    })

    return () => st.kill()
  }, [])

  return (
    <div ref={containerRef} className="min-h-screen bg-[var(--atlas-ink)] text-[var(--atlas-paper)] overflow-hidden">
      
      {/* HERO SECTION */}
      <section className="relative min-h-[90vh] flex flex-col justify-center items-center text-center px-6 pt-24 pb-12 overflow-hidden">
        {/* Decorative Background Lines */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-1/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--atlas-gold)] to-transparent transform -rotate-6"></div>
          <div className="absolute top-2/3 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--atlas-jade)] to-transparent transform rotate-12"></div>
          <div className="absolute top-0 left-1/2 w-[1px] h-full bg-gradient-to-b from-transparent via-[var(--atlas-gold)] to-transparent transform -rotate-45"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">
          <span className="hero-word inline-block px-4 py-1.5 rounded-full border border-[var(--atlas-line)] bg-[var(--atlas-ink-soft)] text-[var(--atlas-gold)] text-sm font-medium mb-8 tracking-widest uppercase">
            中国 — Chine
          </span>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 leading-[1.1]">
            <div className="overflow-hidden"><span className="hero-word inline-block">La Chine,</span></div>
            <div className="overflow-hidden"><span className="hero-word inline-block">votre prochaine</span></div>
            <div className="overflow-hidden text-[var(--atlas-gold)]"><span className="hero-word inline-block">frontière académique</span></div>
          </h1>
          
          <p className="hero-sub text-lg md:text-xl text-gray-400 max-w-2xl mb-12">
            Découvrez une éducation de classe mondiale, des bourses généreuses et des opportunités de carrière incomparables au cœur de la puissance économique de demain.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link href="/admissions" className="hero-cta group relative px-8 py-4 bg-[var(--atlas-gold)] text-[var(--atlas-ink)] font-semibold rounded-lg overflow-hidden transition-transform hover:scale-105 active:scale-95">
              <span className="relative z-10 flex items-center justify-center gap-2">
                Postuler maintenant <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            <Link href="/scholarships" className="hero-cta group px-8 py-4 bg-[var(--atlas-ink-soft)] border border-[var(--atlas-line)] text-white font-semibold rounded-lg transition-all hover:bg-white/5 hover:border-[var(--atlas-jade)]">
              Voir les bourses
            </Link>
          </div>
        </div>
      </section>

      {/* STATS BAND */}
      <section ref={statsRef} className="py-16 border-y border-[var(--atlas-line)] bg-[var(--atlas-ink-soft)]/50 backdrop-blur-md relative z-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 text-center divide-x divide-[var(--atlas-line)]/50">
            <div className="flex flex-col items-center">
              <span className="stat-counter text-4xl font-bold text-[var(--atlas-gold)] mb-2" data-target="3000000" data-suffix="+">0</span>
              <span className="text-xs text-gray-400 uppercase tracking-wider">Étudiants intl</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="stat-counter text-4xl font-bold text-[var(--atlas-jade)] mb-2" data-target="500" data-suffix="+">0</span>
              <span className="text-xs text-gray-400 uppercase tracking-wider">Universités</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="stat-counter text-4xl font-bold text-[var(--atlas-paper)] mb-2" data-target="30" data-suffix="+">0</span>
              <span className="text-xs text-gray-400 uppercase tracking-wider">Types de bourses</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="stat-counter text-4xl font-bold text-[var(--atlas-gold)] mb-2" data-target="6">0</span>
              <span className="text-xs text-gray-400 uppercase tracking-wider">Top 100 QS</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="stat-counter text-4xl font-bold text-[var(--atlas-jade)] mb-2" data-target="2" data-prefix="#">0</span>
              <span className="text-xs text-gray-400 uppercase tracking-wider">Inv. R&D mondial</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="stat-counter text-4xl font-bold text-[var(--atlas-paper)] mb-2" data-target="100" data-suffix="%">0</span>
              <span className="text-xs text-gray-400 uppercase tracking-wider">Progs Anglais</span>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHINA - ADVANTAGES */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto space-y-32">
          
          {/* Advantage 1 */}
          <div className="advantage-row flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 space-y-6">
              <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-[var(--atlas-gold)]/10 text-[var(--atlas-gold)] mb-4">
                <GraduationCap size={32} />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold">Excellence académique mondiale</h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                La Chine abrite 6 universités dans le top 100 QS World University Rankings. Des infrastructures ultra-modernes, des professeurs de renommée internationale et des diplômes reconnus mondialement.
              </p>
            </div>
            <div className="flex-1 w-full relative">
              <div className="aspect-square md:aspect-[4/3] rounded-3xl bg-gradient-to-br from-[var(--atlas-ink-soft)] to-[var(--atlas-ink)] border border-[var(--atlas-line)] p-8 flex flex-col justify-end overflow-hidden group">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
                <div className="relative z-10 space-y-4">
                  {[98, 85, 76, 62].map((width, i) => (
                    <div key={i} className="w-full bg-[var(--atlas-ink)] rounded-full h-8 overflow-hidden flex items-center border border-[var(--atlas-line)]">
                      <div className="h-full bg-gradient-to-r from-[var(--atlas-gold)] to-[var(--atlas-jade)] rounded-full transition-all duration-1000 group-hover:opacity-100 opacity-80" style={{ width: `${width}%` }}></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Advantage 2 */}
          <div className="advantage-row flex flex-col lg:flex-row-reverse items-center gap-16">
            <div className="flex-1 space-y-6">
              <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-[var(--atlas-jade)]/10 text-[var(--atlas-jade)] mb-4">
                <DollarSign size={32} />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold">Bourses gouvernementales généreuses</h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                La bourse du gouvernement chinois (CSC) couvre les frais de scolarité, le logement et offre une allocation mensuelle. Plus de 95% de nos étudiants obtiennent un financement.
              </p>
            </div>
            <div className="flex-1 w-full">
              <div className="aspect-square md:aspect-[4/3] rounded-3xl bg-gradient-to-bl from-[var(--atlas-ink-soft)] to-[var(--atlas-ink)] border border-[var(--atlas-jade)]/30 p-8 flex flex-col justify-center gap-6">
                {['Frais de scolarité à 100%', 'Hébergement gratuit', 'Allocation mensuelle', 'Assurance médicale complète'].map((text, i) => (
                  <div key={i} className="flex items-center gap-4 bg-[var(--atlas-ink)] p-4 rounded-xl border border-[var(--atlas-line)]">
                    <div className="w-8 h-8 rounded-full bg-[var(--atlas-jade)]/20 flex items-center justify-center text-[var(--atlas-jade)]">
                      <Star size={16} />
                    </div>
                    <span className="font-medium">{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Advantage 3 */}
          <div className="advantage-row flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 space-y-6">
              <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-blue-500/10 text-blue-400 mb-4">
                <MapPin size={32} />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold">Coût de vie accessible</h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                Shanghai ou Pékin offrent une vie étudiante complète pour 400-600€/mois. Un rapport qualité-prix inégalé pour les destinations d'études internationales majeures.
              </p>
            </div>
            <div className="flex-1 w-full">
              <div className="aspect-square md:aspect-[4/3] rounded-3xl bg-[var(--atlas-ink-soft)] border border-[var(--atlas-line)] p-8 flex items-end gap-4">
                <div className="flex-1 flex flex-col items-center gap-4">
                  <div className="w-full bg-[var(--atlas-ink)] rounded-t-xl h-[40%] border-t border-x border-[var(--atlas-line)] relative overflow-hidden group">
                    <div className="absolute inset-0 bg-blue-500/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                  </div>
                  <span className="text-sm font-medium">Chine</span>
                </div>
                <div className="flex-1 flex flex-col items-center gap-4">
                  <div className="w-full bg-[var(--atlas-ink)] rounded-t-xl h-[75%] border-t border-x border-[var(--atlas-line)]"></div>
                  <span className="text-sm text-gray-500">Europe</span>
                </div>
                <div className="flex-1 flex flex-col items-center gap-4">
                  <div className="w-full bg-[var(--atlas-ink)] rounded-t-xl h-[90%] border-t border-x border-[var(--atlas-line)]"></div>
                  <span className="text-sm text-gray-500">USA</span>
                </div>
              </div>
            </div>
          </div>

          {/* Advantage 4 */}
          <div className="advantage-row flex flex-col lg:flex-row-reverse items-center gap-16">
            <div className="flex-1 space-y-6">
              <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-purple-500/10 text-purple-400 mb-4">
                <Zap size={32} />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold">Hub technologique mondial</h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                Alibaba, Huawei, ByteDance — étudier en Chine c'est être au cœur de l'innovation mondiale. Développez un réseau professionnel avec les leaders de la tech de demain.
              </p>
            </div>
            <div className="flex-1 w-full">
              <div className="aspect-square md:aspect-[4/3] rounded-3xl bg-gradient-to-br from-[var(--atlas-ink-soft)] to-purple-900/20 border border-purple-500/20 p-8 grid grid-cols-2 gap-4">
                {['Tencent', 'Alibaba', 'Huawei', 'ByteDance', 'DJI', 'Baidu'].map((company, i) => (
                  <div key={i} className="bg-[var(--atlas-ink)] border border-[var(--atlas-line)] rounded-2xl flex items-center justify-center p-6 hover:bg-[var(--atlas-ink-soft)] transition-colors cursor-default">
                    <span className="font-bold text-lg text-gray-300">{company}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* UNIVERSITY SPOTLIGHT CAROUSEL */}
      <section className="py-24 bg-[var(--atlas-ink-soft)] border-y border-[var(--atlas-line)]">
        <div className="max-w-7xl mx-auto px-6 mb-12 flex justify-between items-end">
          <div>
            <h2 className="text-4xl font-bold mb-4">Universités d'Élite</h2>
            <p className="text-gray-400">Le prestige académique à portée de main</p>
          </div>
          <div className="hidden md:flex gap-4">
            <button className="w-12 h-12 rounded-full border border-[var(--atlas-line)] flex items-center justify-center hover:bg-white/5 transition-colors">
              <ArrowRight size={20} className="rotate-180" />
            </button>
            <button className="w-12 h-12 rounded-full border border-[var(--atlas-line)] flex items-center justify-center hover:bg-white/5 transition-colors bg-[var(--atlas-ink)]">
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
        
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 px-6 pb-12 hide-scrollbar" style={{ scrollbarWidth: 'none' }}>
          {[
            { name: "Peking University", rank: "#17 QS", spec1: "Sciences H.", spec2: "Médecine", color: "from-red-900/80" },
            { name: "Tsinghua University", rank: "#25 QS", spec1: "Ingénierie", spec2: "Informatique", color: "from-purple-900/80" },
            { name: "Fudan University", rank: "#50 QS", spec1: "Finance", spec2: "Journalisme", color: "from-blue-900/80" },
            { name: "Zhejiang University", rank: "#44 QS", spec1: "Agriculture", spec2: "Business", color: "from-green-900/80" },
            { name: "Shanghai Jiao Tong", rank: "#51 QS", spec1: "Robotique", spec2: "Biotech", color: "from-orange-900/80" }
          ].map((uni, i) => (
            <div key={i} className="snap-center shrink-0 w-[85vw] md:w-[400px] bg-[var(--atlas-ink)] rounded-3xl border border-[var(--atlas-line)] overflow-hidden flex flex-col group">
              <div className={`h-48 bg-gradient-to-b ${uni.color} to-[var(--atlas-ink)] p-6 flex flex-col justify-between`}>
                <div className="self-end px-3 py-1 bg-black/40 backdrop-blur-md rounded-full text-sm font-semibold border border-white/10">
                  {uni.rank}
                </div>
                <h3 className="text-2xl font-bold">{uni.name}</h3>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between gap-6">
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1.5 bg-[var(--atlas-ink-soft)] rounded-lg text-sm text-gray-300">{uni.spec1}</span>
                  <span className="px-3 py-1.5 bg-[var(--atlas-ink-soft)] rounded-lg text-sm text-gray-300">{uni.spec2}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-[var(--atlas-gold)] pt-4 border-t border-[var(--atlas-line)]">
                  <Star size={16} fill="currentColor" />
                  <span className="font-medium">Éligible Bourse CSC</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* STUDENT LIFE GRID */}
      <section className="student-life-grid py-32 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Une expérience inoubliable</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">Au-delà des études, plongez dans une culture millénaire vibrante et ultra-moderne.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Building, title: "Logement", desc: "Résidences étudiantes modernes sur le campus" },
            { icon: Coffee, title: "Gastronomie", desc: "Cuisine variée et très abordable au quotidien" },
            { icon: Globe, title: "Transport", desc: "Réseau TGV et métro ultra-développé" },
            { icon: Users, title: "Communauté", desc: "Rencontrez des étudiants du monde entier" },
            { icon: BookOpen, title: "Académique", desc: "Bibliothèques 24/7 et campus gigantesques" },
            { icon: Zap, title: "Technologie", desc: "Paiement mobile, 5G, et campus connectés" },
            { icon: Heart, title: "Santé", desc: "Couverture médicale complète incluse" },
            { icon: Shield, title: "Sécurité", desc: "L'un des pays les plus sûrs au monde" }
          ].map((item, i) => (
            <div key={i} className="grid-item p-6 rounded-2xl bg-[var(--atlas-ink-soft)] border border-[var(--atlas-line)] hover:border-[var(--atlas-gold)]/50 transition-colors group">
              <item.icon size={32} className="text-[var(--atlas-jade)] mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIAL PULLOUT */}
      <section className="py-24 px-6 bg-gradient-to-b from-[var(--atlas-ink)] to-[var(--atlas-ink-soft)]">
        <div className="max-w-4xl mx-auto relative">
          <div className="absolute -top-12 -left-8 text-9xl text-[var(--atlas-gold)] opacity-20 font-serif leading-none">"</div>
          <div className="relative z-10 text-center space-y-8">
            <p className="text-2xl md:text-4xl font-medium leading-relaxed italic text-gray-200">
              Choisir la Chine avec NexTrip a été la meilleure décision de ma vie. Je suis en Master d'Ingénierie à Tsinghua avec une bourse complète, et je vis au centre de l'innovation mondiale.
            </p>
            <div className="flex items-center justify-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[var(--atlas-gold)] to-orange-500 flex items-center justify-center text-xl font-bold text-[var(--atlas-ink)]">
                AS
              </div>
              <div className="text-left">
                <h4 className="font-bold text-lg">Amadou Sow</h4>
                <p className="text-[var(--atlas-jade)]">Master, Tsinghua University (Bourse CSC)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-32 px-6 border-t border-[var(--atlas-line)] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-[var(--atlas-gold)]/10 via-[var(--atlas-ink)] to-[var(--atlas-ink)] pointer-events-none"></div>
        <div className="max-w-3xl mx-auto text-center relative z-10 space-y-8">
          <h2 className="text-5xl md:text-6xl font-bold">Prêt à commencer votre voyage?</h2>
          <p className="text-xl text-gray-400">Laissez NexTrip vous guider de la sélection de l'université jusqu'à votre arrivée en Chine.</p>
          <div className="pt-8">
            <Link href="/admissions" className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-[var(--atlas-gold)] text-[var(--atlas-ink)] font-bold rounded-xl text-lg hover:scale-105 transition-transform hover:shadow-[0_0_40px_rgba(228,176,79,0.3)]">
              Lancer ma candidature <ArrowRight size={24} />
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
