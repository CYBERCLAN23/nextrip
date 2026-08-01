'use client'

import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MessageCircle, Mail, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const schema = z.object({
  prenom: z.string().min(2, 'Minimum 2 caractères'),
  nom: z.string().min(2, 'Minimum 2 caractères'),
  email: z.string().email('Email invalide'),
  whatsapp: z.string().optional(),
  pays: z.string().min(1, 'Sélectionnez votre pays'),
  sujet: z.string().min(1, 'Sélectionnez un sujet'),
  message: z.string().min(20, 'Message trop court (minimum 20 caractères)'),
})

type FormData = z.infer<typeof schema>

const contactInfo = [
  { icon: MessageCircle, color: '#25D366', bg: 'rgba(37,211,102,0.1)', title: 'WhatsApp', value: 'Chat instantané', desc: 'Réponse en moins de 2h', action: 'Écrire sur WhatsApp', href: 'https://wa.me/nextrip' },
  { icon: Mail, color: '#e4b04f', bg: 'rgba(228,176,79,0.1)', title: 'Email', value: 'contact@nextrip-global.com', desc: 'Réponse sous 24h', action: 'Envoyer un email', href: 'mailto:contact@nextrip-global.com' },
  { icon: MapPin, color: '#75d4bc', bg: 'rgba(117,212,188,0.1)', title: 'Bureau', value: 'NexTrip Global Limited', desc: 'Consultations sur rendez-vous', action: 'Voir sur la carte', href: '#' },
  { icon: Clock, color: '#a78bfa', bg: 'rgba(167,139,250,0.1)', title: 'Horaires', value: 'Lun – Sam · 8h – 19h', desc: "Heure d'Afrique de l'Ouest (GMT)", action: null, href: null },
]

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  
  const heroRef = useRef<HTMLDivElement>(null)
  const leftColRef = useRef<HTMLDivElement>(null)
  const rightColRef = useRef<HTMLDivElement>(null)

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema)
  })

  useGSAP(() => {
    gsap.fromTo(heroRef.current, 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    )

    gsap.fromTo(leftColRef.current,
      { opacity: 0, x: -40 },
      { opacity: 1, x: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: leftColRef.current, start: 'top 80%' } }
    )

    gsap.fromTo(rightColRef.current,
      { opacity: 0, x: 40 },
      { opacity: 1, x: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: rightColRef.current, start: 'top 80%' } }
    )
  }, [])

  const onSubmit = async (_data: FormData) => {
    setIsSubmitting(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setIsSuccess(true)
  }

  return (
    <div className="min-h-screen bg-[#06101f] text-white font-space pb-0">
      <style dangerouslySetInnerHTML={{__html: `
        .form-field { position: relative; margin-bottom: 1.5rem; }
        .form-field input, .form-field textarea, .form-field select {
          width: 100%; padding: 1.5rem 1rem 0.5rem;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(228,176,79,0.2);
          border-radius: 8px; color: white;
          transition: border-color 200ms;
        }
        .form-field select { padding-top: 1rem; }
        .form-field label {
          position: absolute; left: 1rem; top: 1rem;
          color: rgba(255,255,255,0.5); font-size: 0.9rem;
          transition: all 200ms; pointer-events: none;
        }
        .form-field input:focus ~ label,
        .form-field input:not(:placeholder-shown) ~ label,
        .form-field textarea:focus ~ label,
        .form-field textarea:not(:placeholder-shown) ~ label {
          top: 0.25rem; font-size: 0.7rem; color: #e4b04f;
        }
      `}} />

      {/* Hero */}
      <section ref={heroRef} className="pt-[8rem] pb-[4rem] text-center px-6">
        <span className="text-[var(--atlas-gold)] text-sm font-bold tracking-widest uppercase mb-4 block">
          CONTACT
        </span>
        <h1 className="text-5xl md:text-6xl font-playfair mb-4">
          Parlons de votre avenir
        </h1>
        <p className="text-white/60 max-w-lg mx-auto">
          Notre équipe est disponible 6j/7 pour répondre à toutes vos questions.
        </p>
      </section>

      {/* Main Content */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Left Column - Form */}
          <div ref={leftColRef} className="flex-[1.6]">
            {isSuccess ? (
              <div className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center h-full flex flex-col items-center justify-center">
                <CheckCircle2 size={64} color="#75d4bc" className="mb-6" />
                <h3 className="text-3xl font-playfair mb-2">Message envoyé !</h3>
                <p className="text-white/60">Nous vous contactons dans les 24 heures.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-field">
                    <input type="text" id="prenom" placeholder=" " {...register('prenom')} />
                    <label htmlFor="prenom">Prénom</label>
                    {errors.prenom && <span className="text-red-400 text-xs mt-1 absolute -bottom-5 left-0">{errors.prenom.message}</span>}
                  </div>
                  <div className="form-field">
                    <input type="text" id="nom" placeholder=" " {...register('nom')} />
                    <label htmlFor="nom">Nom</label>
                    {errors.nom && <span className="text-red-400 text-xs mt-1 absolute -bottom-5 left-0">{errors.nom.message}</span>}
                  </div>
                </div>

                <div className="form-field mt-6">
                  <input type="email" id="email" placeholder=" " {...register('email')} />
                  <label htmlFor="email">Email</label>
                  {errors.email && <span className="text-red-400 text-xs mt-1 absolute -bottom-5 left-0">{errors.email.message}</span>}
                </div>

                <div className="form-field mt-6">
                  <input type="text" id="whatsapp" placeholder=" " {...register('whatsapp')} />
                  <label htmlFor="whatsapp">WhatsApp (Optionnel)</label>
                </div>

                <div className="form-field mt-6">
                  <select id="pays" {...register('pays')} defaultValue="">
                    <option value="" disabled hidden></option>
                    <option value="Senegal">Sénégal</option>
                    <option value="Mali">Mali</option>
                    <option value="Cote-d-ivoire">Côte d\\'Ivoire</option>
                    <option value="Cameroun">Cameroun</option>
                    <option value="Maroc">Maroc</option>
                    <option value="Algérie">Algérie</option>
                    <option value="Tunisie">Tunisie</option>
                    <option value="Burkina Faso">Burkina Faso</option>
                    <option value="Niger">Niger</option>
                    <option value="Gabon">Gabon</option>
                    <option value="Congo">Congo</option>
                    <option value="RDC">RDC</option>
                    <option value="Bénin">Bénin</option>
                    <option value="Togo">Togo</option>
                    <option value="Guinée">Guinée</option>
                    <option value="Autre">Autre pays</option>
                  </select>
                  <label htmlFor="pays" className="!top-2 !text-[0.7rem] !text-[#e4b04f]">Pays de résidence</label>
                  {errors.pays && <span className="text-red-400 text-xs mt-1 absolute -bottom-5 left-0">{errors.pays.message}</span>}
                </div>

                <div className="form-field mt-6">
                  <select id="sujet" {...register('sujet')} defaultValue="">
                    <option value="" disabled hidden></option>
                    <option value="Admissions">Admissions</option>
                    <option value="Bourses">Bourses</option>
                    <option value="Universites">Universités</option>
                    <option value="Visa">Visa</option>
                    <option value="Autre">Autre</option>
                  </select>
                  <label htmlFor="sujet" className="!top-2 !text-[0.7rem] !text-[#e4b04f]">Sujet</label>
                  {errors.sujet && <span className="text-red-400 text-xs mt-1 absolute -bottom-5 left-0">{errors.sujet.message}</span>}
                </div>

                <div className="form-field mt-6">
                  <textarea id="message" rows={4} placeholder=" " {...register('message')} />
                  <label htmlFor="message">Message</label>
                  {errors.message && <span className="text-red-400 text-xs mt-1 absolute -bottom-5 left-0">{errors.message.message}</span>}
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full mt-6 bg-[var(--atlas-gold)] text-[#06101f] font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-[#f7d17a] transition-colors disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <div className="w-6 h-6 border-2 border-[#06101f] border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>Envoyer mon message <Send size={18} /></>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Right Column - Info Cards */}
          <div ref={rightColRef} className="flex-1 flex flex-col gap-4">
            {contactInfo.map((info, i) => {
              const Icon = info.icon
              return (
                <div key={i} className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-6 flex items-start gap-4 transition-transform hover:-translate-y-1">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
                    style={{ backgroundColor: info.bg }}
                  >
                    <Icon size={24} color={info.color} />
                  </div>
                  <div>
                    <h4 className="text-white/50 text-sm mb-1">{info.title}</h4>
                    <p className="font-bold text-lg mb-1">{info.value}</p>
                    <p className="text-white/40 text-sm mb-3">{info.desc}</p>
                    {info.action && info.href && (
                      <a href={info.href} className="text-sm font-medium" style={{ color: info.color }}>
                        {info.action} →
                      </a>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

        </div>
      </section>

      {/* WhatsApp CTA */}
      <section className="w-full" style={{ background: 'linear-gradient(135deg, #075E54, #128C7E)', padding: '3rem 1.5rem' }}>
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-6">
          <div className="flex items-center gap-4 flex-col md:flex-row">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center shrink-0">
              <MessageCircle size={32} color="white" />
            </div>
            <div>
              <h2 className="text-3xl font-playfair font-bold text-white mb-2">Besoin d\\'une réponse rapide?</h2>
              <p className="text-white/80 font-space">Notre équipe WhatsApp est réactive.</p>
            </div>
          </div>
          <a 
            href="https://wa.me/nextrip" 
            className="bg-white text-[#075E54] font-bold px-8 py-4 rounded-full hover:bg-white/90 transition-colors whitespace-nowrap"
          >
            Contactez-nous sur WhatsApp
          </a>
        </div>
      </section>
    </div>
  )
}
