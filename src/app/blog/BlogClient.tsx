'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'
import Link from 'next/link'

const articles = [
  { slug: 'guide-bourse-csc-2025', title: 'Guide Complet: Bourse CSC 2025', excerpt: "La bourse du gouvernement chinois (CSC) est l'une des plus généreuses au monde. Frais de scolarité, logement, allocation mensuelle: tout est couvert.", date: '15 Jan 2025', readTime: '8 min', category: 'Bourses', featured: true, bg: 'linear-gradient(135deg,#1e3a5f,#2d5f9e)' },
  { slug: 'medecine-pekin-university', title: 'Étudier la Médecine à Pékin University: Guide 2025', excerpt: "MBBS en anglais, admissions, bourses CSC pour médecine: tout ce que vous devez savoir pour intégrer l'une des meilleures facultés de médecine au monde.", date: '10 Jan 2025', readTime: '12 min', category: 'Universités', featured: false, bg: 'linear-gradient(135deg,#4a1d5c,#6b2d82)' },
  { slug: 'vie-etudiante-shanghai', title: 'Vivre à Shanghai: Budget, Logement & Conseils Pratiques', excerpt: 'Combien coûte réellement la vie à Shanghai pour un étudiant africain? Nos alumni partagent leurs expériences et conseils pratiques.', date: '5 Jan 2025', readTime: '10 min', category: 'Vie étudiante', featured: false, bg: 'linear-gradient(135deg,#0d4034,#1a6354)' },
  { slug: 'admissions-2025-chine', title: 'Calendrier des Admissions 2025 en Chine: Toutes les Dates', excerpt: 'Ne manquez pas les délais. Retrouvez toutes les dates importantes pour postuler aux universités chinoises en 2025.', date: '28 Dec 2024', readTime: '6 min', category: 'Admissions', featured: false, bg: 'linear-gradient(135deg,#4a2800,#7a4200)' },
  { slug: 'tsinghua-ingenierie', title: 'Tsinghua University: Le Temple de l\'Ingénierie Mondiale', excerpt: "Classée dans les 30 meilleures mondiales pour l'ingénierie, Tsinghua est le choix ultime pour les futurs ingénieurs.", date: '20 Dec 2024', readTime: '9 min', category: 'Universités', featured: false, bg: 'linear-gradient(135deg,#4a0000,#7a1020)' },
  { slug: 'hsk-guide-debutants', title: 'Réussir le HSK: Guide Complet pour les Débutants', excerpt: 'HSK obligatoire? Niveaux requis? Comment se préparer en 3 mois? Toutes les réponses pour les étudiants qui commencent le mandarin.', date: '15 Dec 2024', readTime: '7 min', category: 'Conseils', featured: false, bg: 'linear-gradient(135deg,#003344,#005566)' },
]

const categories = ['Tout', 'Bourses', 'Universités', 'Admissions', 'Vie étudiante', 'Conseils']

export default function BlogClient() {
  const [activeCategory, setActiveCategory] = useState('Tout')
  const [search, setSearch] = useState('')

  const filteredArticles = articles.filter(a => {
    const matchCat = activeCategory === 'Tout' || a.category === activeCategory
    const matchSearch = a.title.toLowerCase().includes(search.toLowerCase()) || a.excerpt.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  const featuredArticle = filteredArticles.find(a => a.featured) || filteredArticles[0]
  const remainingArticles = filteredArticles.filter(a => a.slug !== featuredArticle?.slug)

  return (
    <div className="min-h-screen bg-[var(--atlas-ink)] text-white font-space pt-24 pb-0">
      
      {/* Hero */}
      <section className="px-6 py-16 text-center">
        <h1 className="text-5xl md:text-6xl font-playfair font-bold mb-4">Blog NexTrip — Conseils & Insights</h1>
        <p className="text-xl text-white/60">Actualités, guides et témoignages sur les études en Chine</p>
      </section>

      {/* Filters & Search */}
      <section className="max-w-6xl mx-auto px-6 mb-16 flex flex-col md:flex-row gap-6 justify-between items-center">
        <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 scrollbar-hide">
          {categories.map(c => (
            <button
              key={c}
              onClick={() => setActiveCategory(c)}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${activeCategory === c ? 'bg-[var(--atlas-gold)] text-black font-bold' : 'bg-white/5 text-white/70 hover:bg-white/10'}`}
            >
              {c}
            </button>
          ))}
        </div>
        
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 w-4 h-4" />
          <input
            type="text"
            placeholder="Rechercher..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-[var(--atlas-gold)] text-white"
          />
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 mb-24">
        {filteredArticles.length === 0 ? (
          <div className="text-center py-20 text-white/50">Aucun article trouvé.</div>
        ) : (
          <>
            {/* Featured Article */}
            {featuredArticle && (
              <Link href={`/blog/${featuredArticle.slug}`} className="group block mb-12 bg-white/5 rounded-3xl overflow-hidden border border-white/10 hover:-translate-y-2 transition-transform duration-300">
                <div className="flex flex-col md:flex-row h-full">
                  <div className="md:w-2/5 h-64 md:h-auto" style={{ background: featuredArticle.bg }} />
                  <div className="md:w-3/5 p-8 md:p-12 flex flex-col justify-center">
                    <span className="inline-block bg-white/10 text-[var(--atlas-gold)] px-3 py-1 rounded-full text-xs font-bold w-fit mb-6">
                      {featuredArticle.category}
                    </span>
                    <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4 group-hover:text-[var(--atlas-gold)] transition-colors">
                      {featuredArticle.title}
                    </h2>
                    <p className="text-white/70 text-lg mb-8 line-clamp-3">
                      {featuredArticle.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-white/50 font-medium">
                      <span>{featuredArticle.date}</span>
                      <span>•</span>
                      <span>{featuredArticle.readTime} de lecture</span>
                      <span className="ml-auto text-[var(--atlas-gold)] opacity-0 group-hover:opacity-100 transition-opacity">
                        Lire l\\'article →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            )}

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {remainingArticles.map(article => (
                <Link key={article.slug} href={`/blog/${article.slug}`} className="group bg-white/5 rounded-2xl overflow-hidden border border-white/10 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(228,176,79,0.1)] transition-all duration-300 flex flex-col">
                  <div className="h-[180px]" style={{ background: article.bg }} />
                  <div className="p-6 flex flex-col flex-1">
                    <span className="inline-block bg-white/10 text-[var(--atlas-gold)] px-3 py-1 rounded-full text-[10px] font-bold w-fit mb-4">
                      {article.category}
                    </span>
                    <h3 className="text-xl font-bold mb-3 line-clamp-2 leading-tight group-hover:text-[var(--atlas-gold)] transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-white/60 text-sm mb-6 line-clamp-3 flex-1">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-white/50 pt-4 border-t border-white/10 mt-auto">
                      <div className="flex gap-2">
                        <span>{article.date}</span>
                        <span>•</span>
                        <span>{article.readTime}</span>
                      </div>
                      <span className="text-[var(--atlas-gold)] font-medium">Lire →</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </section>

      {/* Newsletter */}
      <section className="bg-[#0a1628] py-24 px-6 text-center border-t border-white/5">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-playfair font-bold mb-4">Restez informé des dernières opportunités en Chine</h2>
          <p className="text-white/60 mb-8">Rejoignez notre newsletter pour recevoir les meilleures offres de bourses et conseils d\\'admission.</p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto" onSubmit={e => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Votre adresse email" 
              className="flex-1 bg-white/5 border border-white/10 rounded-full px-6 py-3 text-white focus:outline-none focus:border-[var(--atlas-gold)]"
              required
            />
            <button type="submit" className="bg-[var(--atlas-gold)] text-[#06101f] font-bold px-8 py-3 rounded-full hover:bg-[#f7d17a] transition-colors">
              S\\'abonner
            </button>
          </form>
        </div>
      </section>
      
    </div>
  )
}
