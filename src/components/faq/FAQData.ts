export interface FAQItemData {
  id: string
  question: string
  answer: string
  category: string
}

export const faqItems: FAQItemData[] = [
  {
    id: "choose-university",
    question: "How do I choose the right university?",
    answer:
      "We guide you through a personalised selection process based on your academic profile, career aspirations, budget, and preferred destination. Our counsellors analyse ranking, course structure, faculty expertise, campus culture, and post-graduation opportunities to shortlist the best-fit institutions for your goals.",
    category: "admissions",
  },
  {
    id: "student-visa",
    question: "Can NexTrip help me obtain a student visa?",
    answer:
      "Absolutely. Our visa specialists provide end-to-end support, from document preparation and financial statement guidance to mock interview sessions and application review. We stay current with every country's visa policies to maximise your approval chances and help you navigate even the most complex requirements.",
    category: "visa",
  },
  {
    id: "scholarships",
    question: "Do you help with scholarships?",
    answer:
      "Yes. We identify merit-based, need-based, and country-specific scholarship opportunities that match your profile. Our team assists with application essays, recommendation letters, and deadline tracking. Many of our students have secured partial to full funding through the opportunities we identify.",
    category: "scholarships",
  },
  {
    id: "countries",
    question: "Which countries can I study in?",
    answer:
      "We partner with universities across the United States, Canada, the United Kingdom, Australia, New Zealand, Germany, France, Ireland, Switzerland, the Netherlands, Singapore, Japan, and the United Arab Emirates. Our network spans over 15 countries and 200+ institutions, giving you a wide range of choices.",
    category: "destinations",
  },
  {
    id: "admission-timeline",
    question: "How long does the admission process take?",
    answer:
      "The timeline varies by destination and institution, but generally ranges from 4 to 12 months. Our structured approach breaks down every milestone: university shortlisting (2–4 weeks), application preparation (4–8 weeks), visa processing (4–12 weeks), and pre-departure planning (4–6 weeks). We keep you on track with a custom timeline.",
    category: "admissions",
  },
  {
    id: "post-arrival",
    question: "Can you help after I arrive?",
    answer:
      "Of course. Our support extends well beyond admission. We assist with accommodation arrangements, airport pickup, local registration, bank account setup, health insurance, and orientation. Many of our offices abroad have local representatives who can help you settle in and address any concerns during your first months.",
    category: "support",
  },
  {
    id: "documents",
    question: "What documents are required?",
    answer:
      "Typical requirements include academic transcripts, standardised test scores (IELTS, TOEFL, GRE, GMAT, SAT), statement of purpose, letters of recommendation, passport copies, financial statements, and application essays. Our counsellors provide a personalised checklist and review every document before submission.",
    category: "admissions",
  },
  {
    id: "cost",
    question: "How much does it cost to study abroad?",
    answer:
      "Costs vary significantly by country, university, and programme. Tuition ranges from $8,000 to $55,000 per year, with living expenses adding $10,000 to $25,000 annually. We provide a transparent cost breakdown during your initial consultation, including scholarship opportunities and education loan assistance to make your dream affordable.",
    category: "financial",
  },
  {
    id: "consultation",
    question: "How do I book a consultation?",
    answer:
      "You can book a free consultation by clicking the 'Talk To An Advisor' button on this page, or by visiting our Contact page. Choose a convenient time slot, and one of our expert education counsellors will reach out to discuss your goals, answer your questions, and outline the next steps in your study abroad journey.",
    category: "support",
  },
]

export const faqCategories = [
  { id: "all", label: "All Questions" },
  { id: "admissions", label: "Admissions" },
  { id: "visa", label: "Visa" },
  { id: "scholarships", label: "Scholarships" },
  { id: "destinations", label: "Destinations" },
  { id: "financial", label: "Financial" },
  { id: "support", label: "Support" },
] as const
