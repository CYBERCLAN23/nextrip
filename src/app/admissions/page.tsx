'use client'

import { useRef, useState } from 'react'

import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { animate } from 'animejs'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { CheckCircle2, FileText, Globe, Clock, ChevronDown, Send, Loader2 } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const schema = z.object({
  prenom: z.string().min(2, 'Minimum 2 caractères'),
  nom: z.string().min(2, 'Minimum 2 caractères'),
  email: z.string().email('Email invalide'),
  pays: z.string().min(1, 'Veuillez sélectionner votre pays'),
  niveau: z.enum(['licence', 'master', 'doctorat']),
  domaine: z.string().min(1, 'Veuillez sélectionner un domaine'),
  message: z.string().min(10, 'Message trop court'),
})

type FormData = z.infer<typeof schema>

export default function AdmissionsPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [openAccordion, setOpenAccordion] = useState<number | null>(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const successIconRef = useRef<HTMLDivElement>(null)

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema)
  })

  useGSAP(() => {
    // Hero Word Reveal
    gsap.from('.hero-title-word', {
      y: 50,
      opacity: 0,
      stagger: 0.1,
      duration: 1,
      ease: 'power3.out'
    })

    // Timeline Animation
    const steps = gsap.utils.toArray('.timeline-step')
    steps.forEach((step: any, i) => {
      gsap.from(step, {
        scrollTrigger: {
          trigger: step,
          start: 'top 85%',
        },
        x: -50,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
        delay: i * 0.1
      })
    })
  }, { scope: containerRef })

  const onSubmit = async (_data: FormData) => {
    setIsSubmitting(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    setIsSuccess(true)
    
    // Anime.js success animation
    setTimeout(() => {
      if (successIconRef.current) {
        animate(successIconRef.current, {
          scale: [0, 1],
          rotate: ['-45deg', '0deg'],
          opacity: [0, 1],
          duration: 800,
          ease: 'outElastic(1, .5)'
        })
      }
    }, 100)
  }

  const toggleAccordion = (idx: number) => {
    setOpenAccordion(openAccordion === idx ? null : idx)
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-[var(--atlas-ink)] text-[var(--atlas-paper)]">
      
      {/* HERO SECTION */}
      <section className="pt-32 pb-20 px-6 border-b border-[var(--atlas-line)] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[var(--atlas-ink-soft)] to-transparent opacity-50"></div>
        <div className="max-w-5xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--atlas-ink-soft)] border border-[var(--atlas-line)] mb-8 text-[var(--atlas-jade)] text-sm font-medium">
            <Globe size={16} /> admissions internationales
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
            <span className="hero-title-word inline-block">Votre</span>{' '}
            <span className="hero-title-word inline-block">admission,</span>{' '}
            <span className="hero-title-word inline-block text-[var(--atlas-gold)]">notre</span>{' '}
            <span className="hero-title-word inline-block text-[var(--atlas-gold)]">expertise</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto hero-title-word">
            Un processus simplifié, transparent et guidé pour garantir votre place dans les meilleures universités chinoises.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* LEFT COLUMN: REQUIREMENTS & TIMELINE */}
        <div className="lg:col-span-7 space-y-24">
          
          {/* REQUIREMENTS ACCORDION */}
          <section>
            <h2 className="text-3xl font-bold mb-8">Critères d'Admission</h2>
            <div className="space-y-4">
              {[
                { title: "Niveau académique requis", content: "Pour un Bachelor: Baccalauréat avec moyenne de 12/20 minimum. Pour un Master: Licence validée avec mention. Un excellent dossier augmente vos chances de bourse CSC." },
                { title: "Documents obligatoires", content: "Passeport valide, diplômes traduits et notariés, relevés de notes, CV, lettre de motivation (Study Plan), 2 lettres de recommandation, certificat médical standardisé chinois." },
                { title: "Exigences linguistiques", content: "Programmes en Anglais: IELTS 6.0+ ou TOEFL 80+ (ou attestation d'études en anglais). Programmes en Chinois: HSK 4 minimum." },
                { title: "Conditions financières", content: "Relevé bancaire prouvant la capacité de couvrir au moins la première année (sauf si candidature avec bourse complète). Dépôt de garantie souvent requis." },
                { title: "Délais de candidature", content: "Rentrée de Septembre: Candidatures entre Novembre et Avril. Rentrée de Mars: Candidatures entre Septembre et Novembre. Les places avec bourses partent tôt!" }
              ].map((item, idx) => (
                <div key={idx} className="border border-[var(--atlas-line)] rounded-2xl overflow-hidden bg-[var(--atlas-ink-soft)]/50 backdrop-blur-sm transition-colors hover:border-[var(--atlas-line)]/80">
                  <button 
                    onClick={() => toggleAccordion(idx)}
                    className="w-full flex items-center justify-between p-6 text-left"
                  >
                    <span className="text-lg font-medium">{item.title}</span>
                    <ChevronDown size={20} className={`text-gray-400 transition-transform duration-300 ${openAccordion === idx ? 'rotate-180' : ''}`} />
                  </button>
                  <div 
                    className="overflow-hidden transition-all duration-500 ease-in-out"
                    style={{ maxHeight: openAccordion === idx ? '200px' : '0', opacity: openAccordion === idx ? 1 : 0 }}
                  >
                    <div className="p-6 pt-0 text-gray-400 leading-relaxed border-t border-[var(--atlas-line)]/50 mt-2">
                      {item.content}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* PROCESS TIMELINE */}
          <section>
            <h2 className="text-3xl font-bold mb-12">Le Processus NexTrip</h2>
            <div className="relative border-l border-[var(--atlas-line)] ml-6 space-y-12">
              {[
                { step: "01", title: "Consultation & Profil", time: "Jour 1-3", desc: "Analyse de votre dossier académique et définition de vos objectifs pour cibler les bonnes universités." },
                { step: "02", title: "Sélection & Correspondance", time: "Jour 4-10", desc: "Présentation des universités et bourses compatibles. Validation des choix finaux ensemble." },
                { step: "03", title: "Exécution & Soumission", time: "Semaine 2-6", desc: "Traduction, notarisation, rédaction de la lettre de motivation et soumission officielle des dossiers." },
                { step: "04", title: "Admission & Arrivée", time: "Phase finale", desc: "Réception de la lettre JW202, assistance pour le visa étudiant X1/X2, et préparation au départ." }
              ].map((item, i) => (
                <div key={i} className="timeline-step relative pl-10">
                  <div className="absolute -left-[17px] top-1 w-8 h-8 rounded-full bg-[var(--atlas-ink)] border-2 border-[var(--atlas-gold)] flex items-center justify-center text-xs font-bold text-[var(--atlas-gold)]">
                    {item.step}
                  </div>
                  <div className="bg-[var(--atlas-ink-soft)] border border-[var(--atlas-line)] p-6 rounded-2xl">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold">{item.title}</h3>
                      <span className="px-3 py-1 bg-[var(--atlas-ink)] rounded-full text-xs text-[var(--atlas-jade)] font-medium flex items-center gap-1 border border-[var(--atlas-line)]">
                        <Clock size={12} /> {item.time}
                      </span>
                    </div>
                    <p className="text-gray-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* DOCUMENTS CHECKLIST */}
          <section className="bg-[var(--atlas-ink-soft)] p-8 rounded-3xl border border-[var(--atlas-line)]">
            <div className="flex items-center gap-4 mb-6 border-b border-[var(--atlas-line)] pb-6">
              <div className="p-3 bg-[var(--atlas-gold)]/10 rounded-xl text-[var(--atlas-gold)]">
                <FileText size={24} />
              </div>
              <h2 className="text-2xl font-bold">Checklist Préparatoire</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {['Passeport valide (> 6 mois)', 'Photo format passeport (fond blanc)', 'Diplôme le plus élevé notarié', 'Relevés de notes officiels', 'Certificat médical (Foreigner Physical)', 'Extrait de casier judiciaire', 'Relevé bancaire', 'Lettre de motivation (Study Plan)'].map((doc, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 size={20} className="text-[var(--atlas-jade)] shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-300">{doc}</span>
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* RIGHT COLUMN: APPLICATION FORM */}
        <div className="lg:col-span-5 relative">
          <div className="sticky top-8 bg-gradient-to-b from-[var(--atlas-ink-soft)] to-[var(--atlas-ink)] border border-[var(--atlas-line)] rounded-3xl p-8 shadow-2xl">
            {isSuccess ? (
              <div className="py-12 flex flex-col items-center justify-center text-center">
                <div ref={successIconRef} className="w-24 h-24 bg-[var(--atlas-jade)]/20 rounded-full flex items-center justify-center mb-6 text-[var(--atlas-jade)] border border-[var(--atlas-jade)]/30">
                  <CheckCircle2 size={48} />
                </div>
                <h3 className="text-2xl font-bold mb-4">Demande Envoyée !</h3>
                <p className="text-gray-400 mb-8">
                  Un conseiller NexTrip analysera votre profil et vous contactera sous 24h ouvrées.
                </p>
                <button 
                  onClick={() => setIsSuccess(false)}
                  className="px-6 py-3 bg-[var(--atlas-ink)] border border-[var(--atlas-line)] rounded-xl text-sm font-medium hover:bg-white/5 transition-colors"
                >
                  Soumettre une autre demande
                </button>
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-bold mb-2">Évaluation Gratuite</h3>
                <p className="text-sm text-gray-400 mb-8">Remplissez ce formulaire pour qu'un expert évalue vos chances d'admission et de bourse.</p>
                
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative">
                      <input 
                        {...register('prenom')}
                        id="prenom"
                        type="text" 
                        placeholder=" "
                        className="peer w-full bg-[var(--atlas-ink)] border border-[var(--atlas-line)] rounded-xl px-4 pt-6 pb-2 text-[var(--atlas-paper)] focus:outline-none focus:border-[var(--atlas-gold)] transition-colors"
                      />
                      <label htmlFor="prenom" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3">
                        Prénom
                      </label>
                      {errors.prenom && <span className="text-xs text-red-400 mt-1 absolute -bottom-5 left-1">{errors.prenom.message}</span>}
                    </div>
                    <div className="relative">
                      <input 
                        {...register('nom')}
                        id="nom"
                        type="text" 
                        placeholder=" "
                        className="peer w-full bg-[var(--atlas-ink)] border border-[var(--atlas-line)] rounded-xl px-4 pt-6 pb-2 text-[var(--atlas-paper)] focus:outline-none focus:border-[var(--atlas-gold)] transition-colors"
                      />
                      <label htmlFor="nom" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3">
                        Nom
                      </label>
                      {errors.nom && <span className="text-xs text-red-400 mt-1 absolute -bottom-5 left-1">{errors.nom.message}</span>}
                    </div>
                  </div>

                  <div className="relative">
                    <input 
                      {...register('email')}
                      id="email"
                      type="email" 
                      placeholder=" "
                      className="peer w-full bg-[var(--atlas-ink)] border border-[var(--atlas-line)] rounded-xl px-4 pt-6 pb-2 text-[var(--atlas-paper)] focus:outline-none focus:border-[var(--atlas-gold)] transition-colors"
                    />
                    <label htmlFor="email" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3">
                      Adresse email
                    </label>
                    {errors.email && <span className="text-xs text-red-400 mt-1 absolute -bottom-5 left-1">{errors.email.message}</span>}
                  </div>

                  <div className="relative">
                    <select 
                      {...register('pays')}
                      className="w-full bg-[var(--atlas-ink)] border border-[var(--atlas-line)] rounded-xl px-4 py-4 text-[var(--atlas-paper)] appearance-none focus:outline-none focus:border-[var(--atlas-gold)] transition-colors"
                    >
                      <option value="">Sélectionnez votre pays...</option>
                      <option value="senegal">Sénégal</option>
                      <option value="cameroun">Cameroun</option>
                      <option value="civ">Côte d'Ivoire</option>
                      <option value="mali">Mali</option>
                      <option value="autre">Autre</option>
                    </select>
                    <ChevronDown size={20} className="absolute right-4 top-4 text-gray-500 pointer-events-none" />
                    {errors.pays && <span className="text-xs text-red-400 mt-1 absolute -bottom-5 left-1">{errors.pays.message}</span>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative">
                      <select 
                        {...register('niveau')}
                        className="w-full bg-[var(--atlas-ink)] border border-[var(--atlas-line)] rounded-xl px-4 py-4 text-[var(--atlas-paper)] appearance-none focus:outline-none focus:border-[var(--atlas-gold)] transition-colors"
                      >
                        <option value="licence">Bachelor / Licence</option>
                        <option value="master">Master</option>
                        <option value="doctorat">Doctorat / PhD</option>
                      </select>
                      <ChevronDown size={20} className="absolute right-4 top-4 text-gray-500 pointer-events-none" />
                    </div>
                    <div className="relative">
                      <select 
                        {...register('domaine')}
                        className="w-full bg-[var(--atlas-ink)] border border-[var(--atlas-line)] rounded-xl px-4 py-4 text-[var(--atlas-paper)] appearance-none focus:outline-none focus:border-[var(--atlas-gold)] transition-colors"
                      >
                        <option value="">Domaine...</option>
                        <option value="ingenierie">Ingénierie & Tech</option>
                        <option value="business">Business & Finance</option>
                        <option value="medecine">Médecine & Santé</option>
                        <option value="lettres">Lettres & Arts</option>
                      </select>
                      <ChevronDown size={20} className="absolute right-4 top-4 text-gray-500 pointer-events-none" />
                      {errors.domaine && <span className="text-xs text-red-400 mt-1 absolute -bottom-5 left-1">{errors.domaine.message}</span>}
                    </div>
                  </div>

                  <div className="relative">
                    <textarea 
                      {...register('message')}
                      id="message"
                      placeholder=" "
                      rows={4}
                      className="peer w-full bg-[var(--atlas-ink)] border border-[var(--atlas-line)] rounded-xl px-4 pt-6 pb-2 text-[var(--atlas-paper)] focus:outline-none focus:border-[var(--atlas-gold)] transition-colors resize-none"
                    ></textarea>
                    <label htmlFor="message" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3">
                      Parlez-nous de votre projet...
                    </label>
                    {errors.message && <span className="text-xs text-red-400 mt-1 absolute -bottom-5 left-1">{errors.message.message}</span>}
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-[var(--atlas-gold)] hover:bg-[var(--atlas-gold)]/90 text-[var(--atlas-ink)] font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <Loader2 size={20} className="animate-spin" />
                    ) : (
                      <>Envoyer mon dossier <Send size={18} /></>
                    )}
                  </button>
                  <p className="text-xs text-center text-gray-500">
                    Vos données sont sécurisées et ne seront jamais partagées avec des tiers.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}
