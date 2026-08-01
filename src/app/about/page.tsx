'use client'

import { useRef, useEffect } from 'react'
import Link from 'next/link'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { animate, utils } from 'animejs'
import { Target, Heart, Globe, Award, ArrowRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const timeline = [
  { year: '2020', title: 'Fondation', desc: 'NexTrip Global Limited est fondé avec une vision: combler le fossé entre les étudiants africains et les universités chinoises de classe mondiale.' },
  { year: '2021', title: 'Premiers Succès', desc: 'Nos 50 premiers étudiants obtiennent leur admission en Chine. Le taux de réussite: 100%.' },
  { year: '2022', title: 'Croissance Rapide', desc: '500 étudiants placés dans 8 pays. Expansion vers 3 nouvelles universités partenaires.' },
  { year: '2023', title: 'Expansion Continentale', desc: 'NexTrip représente maintenant 40+ nationalités africaines et internationales.' },
  { year: '2024', title: '2 000+ Placements', desc: "Un milestone historique. 2,000 étudiants placés, 95% de taux d'approbation de bourses." },
]

const values = [
  { icon: Target, title: 'Excellence', desc: "Nous ne faisons pas les choses à moitié. Chaque candidature est traitée comme si c'était la nôtre." },
  { icon: Heart, title: 'Transparence', desc: 'Pas de frais cachés, pas de promesses vides. Vous savez exactement ce que vous obtenez.' },
  { icon: Globe, title: 'Impact', desc: 'Chaque placement change une vie, une famille, et parfois toute une communauté.' },
  { icon: Award, title: 'Innovation', desc: "Nous utilisons les données et la technologie pour maximiser vos chances d'admission." },
]

export default function AboutPage() {
  const statsRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const valuesRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    // Timeline animation
    if (timelineRef.current) {
      const items = timelineRef.current.querySelectorAll('.timeline-item')
      items.forEach((item, i) => {
        gsap.fromTo(item, 
          { opacity: 0, x: i % 2 === 0 ? -50 : 50 },
          { opacity: 1, x: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: item, start: 'top 85%' } }
        )
      })
    }

    // Values animation
    if (valuesRef.current) {
      const cards = valuesRef.current.children
      gsap.fromTo(cards,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: 'power3.out', scrollTrigger: { trigger: valuesRef.current, start: 'top 80%' } }
      )
    }
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const numbers = entry.target.querySelectorAll('.stat-number')
          numbers.forEach(num => {
            const finalVal = parseFloat(num.getAttribute('data-val') || '0')
            animate(num, {
              innerHTML: [0, finalVal],
              modifier: utils.round(finalVal % 1 === 0 ? 0 : 1),
              ease: 'outExpo',
              duration: 2000
            })
          })
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.5 })

    if (statsRef.current) {
      observer.observe(statsRef.current)
    }
    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-[var(--atlas-ink)] text-white font-space overflow-x-hidden">
      
      {/* Hero */}
      <section className="pt-32 pb-20 px-6 text-center" style={{ background: 'linear-gradient(180deg, #06101f 0%, #0d1d33 100%)' }}>
        <div className="max-w-4xl mx-auto">
          <span className="text-[var(--atlas-gold)] text-sm font-bold tracking-widest uppercase mb-6 block">
            À PROPOS DE NOUS
          </span>
          <h1 className="text-5xl md:text-7xl font-playfair font-bold mb-6">NexTrip Global Limited</h1>
          <h2 className="text-2xl md:text-3xl font-playfair text-white/80 mb-8 italic">
            Une mission. Un impact. Des vies transformées.
          </h2>
          <p className="text-lg text-white/60 leading-relaxed max-w-3xl mx-auto">
            Depuis 2020, NexTrip Global Limited accompagne des étudiants africains et internationaux vers les meilleures universités chinoises. Nous croyons que le talent est universel, mais que les opportunités ne le sont pas. Notre but est de changer cela.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24 px-6 bg-[#0a1628]">
        <div className="max-w-4xl mx-auto text-center">
          <blockquote className="text-3xl md:text-4xl font-playfair italic leading-relaxed text-white">
            "Notre mission est simple: rendre l\\'éducation internationale accessible à tout étudiant ambitieux, quelle que soit son origine."
          </blockquote>
          <p className="mt-8 text-[var(--atlas-gold)] font-bold tracking-widest uppercase">— Fondateur, NexTrip Global Limited</p>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-32 px-6 max-w-5xl mx-auto" ref={timelineRef}>
        <h3 className="text-4xl font-playfair font-bold text-center mb-20">Notre Histoire</h3>
        <div className="relative border-l border-white/10 md:border-none">
          {/* Central line desktop */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2" />
          
          <div className="flex flex-col gap-16 md:gap-24">
            {timeline.map((item, i) => (
              <div key={item.year} className={`timeline-item relative flex flex-col md:flex-row items-start ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                <div className="md:w-1/2" />
                
                {/* Dot */}
                <div className="absolute left-[-5px] md:left-1/2 top-2 md:top-6 w-[10px] h-[10px] bg-[var(--atlas-gold)] rounded-full md:-translate-x-1/2 z-10 shadow-[0_0_15px_rgba(228,176,79,0.5)]" />
                
                <div className={`pl-8 md:pl-0 md:w-1/2 ${i % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16'}`}>
                  <span className="text-5xl md:text-6xl font-playfair font-bold text-[var(--atlas-gold)] block mb-4 opacity-50">{item.year}</span>
                  <h4 className="text-2xl font-bold mb-3">{item.title}</h4>
                  <p className="text-white/60 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-24 px-6 bg-[#0a1628]">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-4xl font-playfair font-bold text-center mb-16">Nos Valeurs</h3>
          <div ref={valuesRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((val, i) => {
              const Icon = val.icon
              return (
                <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-10 flex flex-col items-start hover:bg-white/10 transition-colors">
                  <div className="w-14 h-14 rounded-full bg-[var(--atlas-gold)]/10 flex items-center justify-center mb-6">
                    <Icon size={28} className="text-[var(--atlas-gold)]" />
                  </div>
                  <h4 className="text-2xl font-playfair font-bold mb-4">{val.title}</h4>
                  <p className="text-white/60 leading-relaxed">{val.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 px-6" ref={statsRef}>
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="pl-6 border-l-2 border-[var(--atlas-gold)]">
            <div className="text-4xl md:text-5xl font-playfair font-bold text-[var(--atlas-gold)] mb-2 flex items-baseline">
              <span className="stat-number" data-val="2000">0</span>
              <span>+</span>
            </div>
            <p className="text-sm tracking-widest text-white/50 uppercase">Étudiants placés</p>
          </div>
          <div className="pl-6 border-l-2 border-[var(--atlas-gold)]">
            <div className="text-4xl md:text-5xl font-playfair font-bold text-[var(--atlas-gold)] mb-2 flex items-baseline">
              <span className="stat-number" data-val="40">0</span>
              <span>+</span>
            </div>
            <p className="text-sm tracking-widest text-white/50 uppercase">Pays représentés</p>
          </div>
          <div className="pl-6 border-l-2 border-[var(--atlas-gold)]">
            <div className="text-4xl md:text-5xl font-playfair font-bold text-[var(--atlas-gold)] mb-2 flex items-baseline">
              <span className="stat-number" data-val="95">0</span>
              <span>%</span>
            </div>
            <p className="text-sm tracking-widest text-white/50 uppercase">Taux de bourses</p>
          </div>
          <div className="pl-6 border-l-2 border-[var(--atlas-gold)]">
            <div className="text-4xl md:text-5xl font-playfair font-bold text-[var(--atlas-gold)] mb-2 flex items-baseline">
              <span className="stat-number" data-val="4.9">0</span>
              <span>★</span>
            </div>
            <p className="text-sm tracking-widest text-white/50 uppercase">Note moyenne</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 bg-[#0a1628] text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-6">Rejoignez la famille NexTrip</h2>
          <p className="text-xl text-white/60 mb-10">
            Prêt à commencer votre aventure académique en Chine ?
          </p>
          <Link href="/contact" className="inline-flex items-center gap-2 bg-[var(--atlas-gold)] text-[#06101f] font-bold px-8 py-4 rounded-full hover:bg-[#f7d17a] transition-transform hover:scale-105">
            Démarrer mon projet <ArrowRight size={20} />
          </Link>
        </div>
      </section>
      
    </div>
  )
}
