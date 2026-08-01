'use client'

import { useState, useMemo, useEffect, useRef } from 'react'
import { MapPin, Search } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { animate, stagger } from 'animejs'

gsap.registerPlugin(ScrollTrigger)

const universitiesData = [
  { id: 1, abbr: 'PKU', name: 'Université de Pékin', en: 'Peking University', city: 'Pékin', rank: 14, fields: ['Médecine', 'Sciences', 'Droit'], scholarship: true, tuition: '3 200–4 400 €/an', founded: 1898, bg: 'linear-gradient(135deg,#1e3a5f,#2d5f9e)' },
  { id: 2, abbr: 'THU', name: 'Université Tsinghua', en: 'Tsinghua University', city: 'Pékin', rank: 25, fields: ['Ingénierie', 'Informatique', 'Architecture'], scholarship: true, tuition: '3 200–4 800 €/an', founded: 1911, bg: 'linear-gradient(135deg,#4a1d5c,#6b2d82)' },
  { id: 3, abbr: 'FDN', name: 'Université Fudan', en: 'Fudan University', city: 'Shanghai', rank: 39, fields: ['Commerce', 'Médecine', 'Sciences'], scholarship: true, tuition: '3 000–4 600 €/an', founded: 1905, bg: 'linear-gradient(135deg,#0d4034,#1a6354)' },
  { id: 4, abbr: 'ZJU', name: 'Université Zhejiang', en: 'Zhejiang University', city: 'Hangzhou', rank: 67, fields: ['Ingénierie', 'Médecine', 'Agriculture'], scholarship: true, tuition: '2 800–4 200 €/an', founded: 1897, bg: 'linear-gradient(135deg,#4a2800,#7a4200)' },
  { id: 5, abbr: 'SJTU', name: 'SJTU', en: 'Shanghai Jiao Tong University', city: 'Shanghai', rank: 51, fields: ['Ingénierie', 'Commerce', 'Informatique'], scholarship: true, tuition: '3 400–5 000 €/an', founded: 1896, bg: 'linear-gradient(135deg,#4a0000,#7a1020)' },
  { id: 6, abbr: 'SYS', name: 'Université Sun Yat-sen', en: 'Sun Yat-sen University', city: 'Guangzhou', rank: 285, fields: ['Médecine', 'Sciences', 'Commerce'], scholarship: true, tuition: '2 400–3 800 €/an', founded: 1924, bg: 'linear-gradient(135deg,#003344,#005566)' },
  { id: 7, abbr: 'WHU', name: 'Université de Wuhan', en: 'Wuhan University', city: 'Wuhan', rank: 306, fields: ['Droit', 'Commerce', 'Ingénierie'], scholarship: true, tuition: '2 200–3 600 €/an', founded: 1893, bg: 'linear-gradient(135deg,#2d0a4e,#451570)' },
  { id: 8, abbr: 'TJU', name: 'Université Tongji', en: 'Tongji University', city: 'Shanghai', rank: 336, fields: ['Architecture', 'Ingénierie', 'Environnement'], scholarship: true, tuition: '2 800–4 400 €/an', founded: 1907, bg: 'linear-gradient(135deg,#1a2030,#2a3040)' },
  { id: 9, abbr: 'NKU', name: 'Université Nankai', en: 'Nankai University', city: 'Tianjin', rank: 351, fields: ['Commerce', 'Sciences', 'Histoire'], scholarship: false, tuition: '2 000–3 200 €/an', founded: 1919, bg: 'linear-gradient(135deg,#0a3010,#1a5020)' },
  { id: 10, abbr: 'BNU', name: 'BNU', en: 'Beijing Normal University', city: 'Pékin', rank: 284, fields: ['Sciences', 'Éducation', 'Psychologie'], scholarship: true, tuition: '2 600–4 000 €/an', founded: 1902, bg: 'linear-gradient(135deg,#4a0a30,#7a1a50)' },
  { id: 11, abbr: 'NJU', name: 'Université de Nanjing', en: 'Nanjing University', city: 'Nanjing', rank: 131, fields: ['Sciences', 'Commerce', 'Ingénierie'], scholarship: true, tuition: '2 400–3 800 €/an', founded: 1902, bg: 'linear-gradient(135deg,#3a2000,#5a3500)' },
  { id: 12, abbr: 'UESTC', name: 'UESTC', en: 'Univ. Electronic Sci. & Tech. of China', city: 'Chengdu', rank: 490, fields: ['Informatique', 'Ingénierie', 'Sciences'], scholarship: false, tuition: '1 800–2 800 €/an', founded: 1956, bg: 'linear-gradient(135deg,#004040,#006060)' },
]

const specialties = ['Toutes', 'Ingénierie', 'Médecine', 'Sciences', 'Commerce', 'Informatique', 'Architecture', 'Droit', 'Environnement', 'Histoire', 'Éducation', 'Psychologie', 'Agriculture']
const cities = ['Toutes', 'Pékin', 'Shanghai', 'Hangzhou', 'Guangzhou', 'Wuhan', 'Tianjin', 'Nanjing', 'Chengdu']

export default function UniversitiesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSpecialty, setSelectedSpecialty] = useState('Toutes')
  const [selectedCity, setSelectedCity] = useState('Toutes')
  const [visibleCount, setVisibleCount] = useState(6)
  
  const heroRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    if (!titleRef.current) return
    const words = titleRef.current.innerText.split(' ')
    titleRef.current.innerHTML = ''
    words.forEach(word => {
      const span = document.createElement('span')
      span.innerText = word + ' '
      span.style.opacity = '0'
      span.style.display = 'inline-block'
      span.style.transform = 'translateY(20px)'
      titleRef.current?.appendChild(span)
    })
    
    gsap.to(titleRef.current.children, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out',
      delay: 0.2
    })
  }, [])
  
  const filteredUniversities = useMemo(() => {
    return universitiesData.filter(uni => {
      const matchesSearch = uni.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            uni.en.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            uni.abbr.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesSpecialty = selectedSpecialty === 'Toutes' || uni.fields.includes(selectedSpecialty)
      const matchesCity = selectedCity === 'Toutes' || uni.city === selectedCity
      return matchesSearch && matchesSpecialty && matchesCity
    })
  }, [searchTerm, selectedSpecialty, selectedCity])

  const displayedUniversities = filteredUniversities.slice(0, visibleCount)

  useEffect(() => {
    if (cardsRef.current) {
      animate(cardsRef.current.children, {
        opacity: [0, 1],
        translateY: [40, 0],
        delay: stagger(60),
        duration: 800,
        ease: 'outCubic',
      })
    }
  }, [filteredUniversities, visibleCount])

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 6)
  }

  return (
    <div className="min-h-screen bg-[var(--atlas-ink)] text-white pt-24 pb-20">
      {/* Hero Section */}
      <section ref={heroRef} className="px-6 py-20 max-w-7xl mx-auto text-center">
        <h1 ref={titleRef} className="text-5xl md:text-7xl font-playfair mb-6 tracking-tight">
          Explorez 500+ Universités chinoises
        </h1>
        <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto font-space opacity-0 animate-fade-in-up" style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}>
          12 partenaires sélectionnés · Classements QS · Bourses disponibles
        </p>
      </section>

      {/* Filters */}
      <section className="px-6 max-w-7xl mx-auto mb-12">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white/5 p-4 rounded-2xl border border-white/10">
          <div className="relative w-full md:w-1/3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Rechercher une université..." 
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-[var(--atlas-gold)] transition-colors font-space"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-4 w-full md:w-auto">
            <select 
              className="w-full md:w-auto bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[var(--atlas-gold)] transition-colors font-space appearance-none cursor-pointer"
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
            >
              <option value="" disabled className="text-gray-900">Spécialité</option>
              {specialties.map(spec => (
                <option key={spec} value={spec} className="text-gray-900">{spec}</option>
              ))}
            </select>

            <select 
              className="w-full md:w-auto bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[var(--atlas-gold)] transition-colors font-space appearance-none cursor-pointer"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
            >
              <option value="" disabled className="text-gray-900">Ville</option>
              {cities.map(city => (
                <option key={city} value={city} className="text-gray-900">{city}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Cards Grid */}
      <section className="px-6 max-w-7xl mx-auto">
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedUniversities.map(uni => (
            <div 
              key={uni.id} 
              className="group relative bg-white/5 rounded-2xl overflow-hidden border border-white/10 flex flex-col transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-[6px] hover:shadow-[0_20px_60px_rgba(228,176,79,0.15)] cursor-pointer"
            >
              {/* Header */}
              <div 
                className="h-[160px] relative p-6 flex items-end justify-between"
                style={{ background: uni.bg }}
              >
                <div className="absolute inset-0 bg-black/20" />
                <span className="relative z-10 text-6xl font-playfair font-bold text-white/20 select-none -mb-4 -ml-2 tracking-tighter">
                  {uni.abbr}
                </span>
                
                {/* QS Rank Badge */}
                <div className="absolute top-4 right-4 z-10 bg-[var(--atlas-gold)] text-black text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1">
                  <span>QS</span>
                  <span>#{uni.rank}</span>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-xl leading-tight font-space">{uni.name}</h3>
                  {uni.scholarship && (
                    <span className="bg-[var(--atlas-jade)]/20 text-[var(--atlas-jade)] text-xs font-medium px-2 py-1 rounded-md whitespace-nowrap ml-3">
                      Bourse CSC
                    </span>
                  )}
                </div>
                
                <p className="text-sm text-white/50 font-space mb-4">{uni.en}</p>
                
                <div className="flex items-center gap-1.5 text-white/70 text-sm mb-6 font-space">
                  <MapPin size={16} />
                  <span>{uni.city}</span>
                  <span className="mx-2 opacity-30">•</span>
                  <span>Fondée en {uni.founded}</span>
                </div>

                {/* Fields */}
                <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                  {uni.fields.map(field => (
                    <span key={field} className="text-xs border border-white/20 text-white/80 px-2.5 py-1 rounded-full font-space">
                      {field}
                    </span>
                  ))}
                </div>

                {/* Footer */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between mt-auto">
                  <div className="flex flex-col">
                    <span className="text-xs text-white/40 font-space">Frais de scolarité</span>
                    <span className="text-sm font-medium font-space">{uni.tuition}</span>
                  </div>
                  <span className="text-[var(--atlas-gold)] text-sm font-medium font-space group-hover:translate-x-1 transition-transform">
                    Voir le détail →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        {visibleCount < filteredUniversities.length && (
          <div className="mt-12 flex justify-center">
            <button 
              onClick={handleLoadMore}
              className="px-8 py-3 rounded-full bg-white/5 border border-white/10 text-white font-space hover:bg-white/10 transition-colors"
            >
              Charger plus
            </button>
          </div>
        )}
        
        {filteredUniversities.length === 0 && (
          <div className="text-center py-20 text-white/50 font-space">
            Aucune université ne correspond à vos critères.
          </div>
        )}
      </section>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
      `}} />
    </div>
  )
}
