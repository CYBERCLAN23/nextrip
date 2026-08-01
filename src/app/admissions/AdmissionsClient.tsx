'use client';
import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { animate } from 'animejs';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Check, ChevronDown, Send, FileText, UserCheck, Plane, Building } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const formSchema = z.object({
  firstName: z.string().min(2, "Le prénom est requis"),
  lastName: z.string().min(2, "Le nom est requis"),
  email: z.string().email("Email invalide"),
  country: z.string().min(1, "Pays requis"),
  level: z.string().min(1, "Niveau requis"),
  field: z.string().min(1, "Domaine requis"),
  message: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function AdmissionsClient() {
  const container = useRef<HTMLDivElement>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema)
  });

  useGSAP(() => {
    gsap.fromTo('.hero-text', 
      { opacity: 0, y: 30 }, 
      { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: 'power3.out' }
    );

    gsap.utils.toArray('.timeline-step').forEach((step: any) => {
      gsap.fromTo(step,
        { opacity: 0, x: -50 },
        {
          opacity: 1, x: 0, duration: 0.8,
          scrollTrigger: {
            trigger: step,
            start: 'top 80%',
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
    // Basic Anime.js height animation for the accordions
    document.querySelectorAll('.faq-content').forEach((el, i) => {
      const htmlEl = el as HTMLElement;
      if (openFaq === i) {
        htmlEl.style.display = 'block';
        animate(htmlEl, { height: [0, htmlEl.scrollHeight], opacity: [0, 1], duration: 300, ease: 'outQuad' });
      } else {
        animate(htmlEl, { height: 0, opacity: 0, duration: 300, ease: 'inQuad', onComplete: () => { htmlEl.style.display = 'none'; } });
      }
    });
  }, [openFaq]);

  const onSubmit = (_data: FormData) => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Candidature envoyée avec succès !');
    }, 2000);
  };

  const steps = [
    { icon: UserCheck, title: "Évaluation Initiale", desc: "Nous analysons votre profil, vos notes et vos objectifs." },
    { icon: FileText, title: "Préparation du Dossier", desc: "Traduction, certification et optimisation de vos documents." },
    { icon: Building, title: "Soumission aux Universités", desc: "Envoi ciblé vers nos universités partenaires." },
    { icon: Plane, title: "Visa & Départ", desc: "Accompagnement pour l'obtention du visa X1/X2 et préparation au voyage." }
  ];

  const faqs = [
    { q: "Quels sont les documents de base requis ?", a: "Passeport valide, diplôme le plus élevé, relevés de notes traduits, certificat médical, extrait de casier judiciaire." },
    { q: "Dois-je parler chinois pour postuler ?", a: "Non, 100% de nos universités partenaires proposent des programmes entièrement en anglais." },
    { q: "Quel est le délai de traitement ?", a: "L'admission prend généralement entre 4 et 8 semaines selon l'université et la période de l'année." }
  ];

  return (
    <main ref={container} className="bg-[var(--atlas-ink)] min-h-screen text-white pt-24 pb-20">
      {/* Hero */}
      <section className="text-center py-20 px-6">
        <h1 className="hero-text text-5xl md:text-7xl font-bold mb-6">
          Votre admission, <span className="text-[var(--atlas-gold)]">notre expertise</span>
        </h1>
        <p className="hero-text text-xl text-[var(--atlas-paper)]/70 max-w-2xl mx-auto">
          Un processus simplifié, transparent et optimisé pour maximiser vos chances d'acceptation et de bourse.
        </p>
      </section>

      {/* Timeline */}
      <section className="py-20 px-6 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">Processus en 4 étapes</h2>
        <div className="relative border-l-2 border-[var(--atlas-jade)]/30 ml-6 md:ml-0 md:left-1/2 md:-translate-x-1/2">
          {steps.map((step, i) => (
            <div key={i} className="timeline-step mb-12 relative flex items-center w-full md:justify-between">
              <div className="hidden md:block w-5/12"></div>
              <div className="absolute left-[-31px] md:left-1/2 md:-translate-x-1/2 bg-[var(--atlas-ink)] border-2 border-[var(--atlas-jade)] text-[var(--atlas-jade)] w-14 h-14 rounded-full flex items-center justify-center z-10">
                <step.icon size={24} />
              </div>
              <div className={`w-full ml-10 md:ml-0 md:w-5/12 bg-[var(--atlas-ink-soft)] p-6 rounded-2xl border border-[var(--atlas-line)] ${i % 2 === 0 ? 'md:text-right md:mr-auto' : 'md:text-left md:ml-auto'}`}>
                <h3 className="text-xl font-bold text-[var(--atlas-gold)] mb-2">{step.title}</h3>
                <p className="text-[var(--atlas-paper)]/70">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Checklist & FAQ */}
      <section className="py-20 px-6 max-w-7xl mx-auto grid md:grid-cols-2 gap-16">
        <div>
          <h2 className="text-3xl font-bold mb-8">Exigences Communes</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-[var(--atlas-line)] rounded-xl bg-[var(--atlas-ink-soft)] overflow-hidden">
                <button 
                  onClick={() => toggleFaq(i)}
                  className="w-full text-left px-6 py-4 font-semibold flex justify-between items-center hover:bg-white/5 transition-colors"
                >
                  {faq.q}
                  <ChevronDown className={`transform transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                <div className="faq-content overflow-hidden px-6" style={{ display: 'none', height: 0 }}>
                  <div className="pb-4 text-[var(--atlas-paper)]/70">{faq.a}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-8">Checklist des Documents</h2>
          <ul className="space-y-3">
            {['Passeport (validité > 6 mois)', 'Photo format passeport (fond blanc)', 'Diplôme le plus élevé (légalisé)', 'Relevés de notes officiels', 'Certificat médical (Formulaire étranger)', 'Casier judiciaire vierge', 'Lettre de motivation / Plan d\'études', '2 Lettres de recommandation'].map((doc, i) => (
              <li key={i} className="flex items-center gap-3">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="w-6 h-6 rounded border-2 border-[var(--atlas-line)] flex items-center justify-center group-hover:border-[var(--atlas-jade)] transition-colors relative overflow-hidden">
                    <input type="checkbox" className="peer sr-only" />
                    <div className="absolute inset-0 bg-[var(--atlas-jade)] scale-0 peer-checked:scale-100 transition-transform flex items-center justify-center">
                      <Check size={16} className="text-[var(--atlas-ink)]" />
                    </div>
                  </div>
                  <span className="text-[var(--atlas-paper)]/80 select-none">{doc}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto bg-gradient-to-br from-[var(--atlas-ink-soft)] to-[#0a1628] p-8 md:p-12 rounded-[2rem] border border-[var(--atlas-line)] shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--atlas-jade)]/10 rounded-full blur-[100px]"></div>
          
          <h2 className="text-3xl font-bold mb-2">Déposer votre candidature</h2>
          <p className="text-[var(--atlas-paper)]/60 mb-8">Remplissez ce formulaire et un conseiller vous contactera sous 24h.</p>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[var(--atlas-paper)]/80 mb-2">Prénom</label>
                <input {...register("firstName")} className="w-full bg-[var(--atlas-ink)] border border-[var(--atlas-line)] rounded-lg px-4 py-3 focus:outline-none focus:border-[var(--atlas-gold)] transition-colors" placeholder="Jean" />
                {errors.firstName && <p className="text-red-400 text-sm mt-1">{errors.firstName.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--atlas-paper)]/80 mb-2">Nom</label>
                <input {...register("lastName")} className="w-full bg-[var(--atlas-ink)] border border-[var(--atlas-line)] rounded-lg px-4 py-3 focus:outline-none focus:border-[var(--atlas-gold)] transition-colors" placeholder="Dupont" />
                {errors.lastName && <p className="text-red-400 text-sm mt-1">{errors.lastName.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[var(--atlas-paper)]/80 mb-2">Email</label>
                <input type="email" {...register("email")} className="w-full bg-[var(--atlas-ink)] border border-[var(--atlas-line)] rounded-lg px-4 py-3 focus:outline-none focus:border-[var(--atlas-gold)] transition-colors" placeholder="jean@example.com" />
                {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--atlas-paper)]/80 mb-2">Pays de résidence</label>
                <select {...register("country")} className="w-full bg-[var(--atlas-ink)] border border-[var(--atlas-line)] rounded-lg px-4 py-3 focus:outline-none focus:border-[var(--atlas-gold)] transition-colors">
                  <option value="">Sélectionnez un pays</option>
                  <option value="FR">France</option>
                  <option value="CI">Côte d'Ivoire</option>
                  <option value="SN">Sénégal</option>
                  <option value="CM">Cameroun</option>
                  <option value="MA">Maroc</option>
                  <option value="OTHER">Autre</option>
                </select>
                {errors.country && <p className="text-red-400 text-sm mt-1">{errors.country.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[var(--atlas-paper)]/80 mb-2">Niveau visé</label>
                <select {...register("level")} className="w-full bg-[var(--atlas-ink)] border border-[var(--atlas-line)] rounded-lg px-4 py-3 focus:outline-none focus:border-[var(--atlas-gold)] transition-colors">
                  <option value="">Sélectionnez le niveau</option>
                  <option value="bachelor">Licence (Bachelor)</option>
                  <option value="master">Master</option>
                  <option value="phd">Doctorat (PhD)</option>
                  <option value="language">Année de langue</option>
                </select>
                {errors.level && <p className="text-red-400 text-sm mt-1">{errors.level.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--atlas-paper)]/80 mb-2">Domaine d'études</label>
                <select {...register("field")} className="w-full bg-[var(--atlas-ink)] border border-[var(--atlas-line)] rounded-lg px-4 py-3 focus:outline-none focus:border-[var(--atlas-gold)] transition-colors">
                  <option value="">Sélectionnez le domaine</option>
                  <option value="engineering">Ingénierie & Tech</option>
                  <option value="business">Business & Management</option>
                  <option value="medicine">Médecine & Santé</option>
                  <option value="arts">Arts & Design</option>
                  <option value="other">Autre</option>
                </select>
                {errors.field && <p className="text-red-400 text-sm mt-1">{errors.field.message}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--atlas-paper)]/80 mb-2">Message (Optionnel)</label>
              <textarea {...register("message")} rows={4} className="w-full bg-[var(--atlas-ink)] border border-[var(--atlas-line)] rounded-lg px-4 py-3 focus:outline-none focus:border-[var(--atlas-gold)] transition-colors" placeholder="Parlez-nous de votre projet..."></textarea>
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-[var(--atlas-gold)] text-[var(--atlas-ink)] font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-white transition-colors disabled:opacity-70"
            >
              {isSubmitting ? (
                <div className="w-6 h-6 border-2 border-[var(--atlas-ink)] border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>Envoyer la candidature <Send size={20} /></>
              )}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
