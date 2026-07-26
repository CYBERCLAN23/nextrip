export interface TestimonialStory {
  id: string
  name: string
  initials: string
  portraitGradient: string
  country: string
  countryCode: string
  university: string
  universityInitials: string
  universityColor: string
  degree: string
  program: string
  quote: string
  journeySummary: string
  beforeNexTrip: string
  challenges: string
  applicationJourney: string
  visaExperience: string
  arrivalExperience: string
  currentLife: string
  careerAspirations: string
  enrollmentYear: number
  programDuration: string
  graduateStatus: string
  successMetric: string
  isVerified: boolean
}

export const featuredStory: TestimonialStory = {
  id: "maria-silva",
  name: "Maria Silva",
  initials: "MS",
  portraitGradient: "linear-gradient(135deg, #0A3D91 0%, #1D5FD1 50%, #00D9FF 100%)",
  country: "Brazil",
  countryCode: "BR",
  university: "University of Toronto",
  universityInitials: "UofT",
  universityColor: "#002A5C",
  degree: "MSc Computer Science",
  program: "Artificial Intelligence",
  quote: "NexTrip didn't just help me apply to a university. They helped me believe that a girl from a public school in São Paulo could belong at one of the world's top research institutions.",
  journeySummary:
    "From a public school in São Paulo to a research assistant at the Vector Institute. Maria's journey proves that talent is universal, but opportunity needs a bridge.",
  beforeNexTrip:
    "I was working as a teaching assistant at a local university in São Paulo, saving whatever I could. I had dreams of pursuing AI research but the application process for Canadian universities felt impossible. I didn't know where to start with SOPs, recommendation letters, or funding applications.",
  challenges:
    "The biggest challenge was the information gap. I didn't have family members who had studied abroad. Every step — from IELTS preparation to credential evaluation — felt like I was navigating in the dark. The costs were overwhelming, and I nearly gave up when I saw the tuition fees.",
  applicationJourney:
    "NexTrip assigned me a mentor who had actually studied at UofT. They helped me identify professors whose research aligned with my interests. My application essay went through seven drafts. Each time, my mentor pushed me to go deeper — not just what I did, but why it mattered.",
  visaExperience:
    "The visa process was stressful. NexTrip's team reviewed my documents three times before submission. They prepared me for the interview with mock sessions. When my visa was approved, I cried on the phone with my counselor.",
  arrivalExperience:
    "Landing at Pearson Airport in January was a shock — literally. It was -20°C and I had never seen snow. But there was a NexTrip-affiliated student buddy waiting for me at the airport. They helped me get my SIM card, bank account, and even showed me where to find Brazilian groceries.",
  currentLife:
    "I'm in my second year now, working as a research assistant at the Vector Institute. I've co-authored a paper on reinforcement learning that got accepted at NeurIPS. I also mentor new Brazilian students through NexTrip's alumni network.",
  careerAspirations:
    "I want to build AI systems that work for underserved communities. After my PhD, I plan to start a nonprofit that brings AI education to public schools in Latin America.",
  enrollmentYear: 2023,
  programDuration: "2 years",
  graduateStatus: "In Progress",
  successMetric: "Research Assistant at Vector Institute",
  isVerified: true,
}

export const supportingStories: TestimonialStory[] = [
  {
    id: "ahmed-hassan",
    name: "Ahmed Hassan",
    initials: "AH",
    portraitGradient: "linear-gradient(135deg, #D4AF37 0%, #8B6914 50%, #F5E6B8 100%)",
    country: "Egypt",
    countryCode: "EG",
    university: "University of Melbourne",
    universityInitials: "UoM",
    universityColor: "#003F6B",
    degree: "BEng Civil Engineering",
    program: "Structural Engineering",
    quote: "I'm the first person in my family to leave Egypt. NexTrip made that possible.",
    journeySummary:
      "First in his family to study abroad. From Cairo to Melbourne, Ahmed turned a dream into a blueprint for his siblings.",
    beforeNexTrip:
      "Growing up in Cairo, I always loved building things. I would help my father, a mason, on weekends. Engineering was my path, but studying abroad felt like a luxury reserved for others.",
    challenges:
      "Finances were the biggest barrier. My family of six lived on my father's income alone. Even the application fees seemed impossible. I worked as a tutor for two years to save enough.",
    applicationJourney:
      "NexTrip helped me find scholarships I didn't even know existed. They guided me through the Australia Awards application and helped me articulate why I deserved it. When I got the scholarship, I couldn't believe it.",
    visaExperience:
      "The Australian visa process was straightforward with NexTrip's preparation. They had a checklist that made everything clear. No surprises.",
    arrivalExperience:
      "Melbourne felt like another planet. The greenery, the quiet, the organization. My first week was overwhelming, but the NexTrip orientation program connected me with other Egyptian students.",
    currentLife:
      "I just completed my first year with a Dean's List commendation. I'm leading a student team designing affordable housing solutions for developing countries.",
    careerAspirations:
      "I want to return to Egypt and start a construction company that uses sustainable materials. I want to build homes that my father would be proud of.",
    enrollmentYear: 2024,
    programDuration: "4 years",
    graduateStatus: "In Progress",
    successMetric: "Dean's List, First Year",
    isVerified: true,
  },
  {
    id: "yuki-tanaka",
    name: "Yuki Tanaka",
    initials: "YT",
    portraitGradient: "linear-gradient(135deg, #E63946 0%, #A8DADC 50%, #457B9D 100%)",
    country: "Japan",
    countryCode: "JP",
    university: "King's College London",
    universityInitials: "KCL",
    universityColor: "#1D2D5E",
    degree: "LLM International Law",
    program: "Human Rights Law",
    quote: "I went from never leaving Tokyo to arguing mock trials at The Hague. Language was my barrier. NexTrip was my bridge.",
    journeySummary:
      "Overcame language barriers and cultural hesitation to study international law in London. Now a UN internship candidate.",
    beforeNexTrip:
      "I had never left Japan. My English was textbook-perfect but I was terrified of speaking. I didn't think I could survive in a British academic environment.",
    challenges:
      "The language barrier was real. I could read legal English, but speaking in seminars paralyzed me. Culturally, Japanese education doesn't encourage the debate-heavy style of British law schools.",
    applicationJourney:
      "NexTrip connected me with a Japanese alum who had studied at King's. She told me about the Language for Law program. My counselor helped me prepare a personal statement that framed my bilingual perspective as a strength, not a weakness.",
    visaExperience:
      "The UK visa process was well-organized. NexTrip's document checklist was thorough. I was nervous for the credibility interview but their mock session prepared me well.",
    arrivalExperience:
      "London was overwhelming — the diversity, the pace, the accents. But I joined the Japanese Society within my first week and found my community. NexTrip's local coordinator checked in regularly.",
    currentLife:
      "I've just completed my first year with distinction. I was selected for the Jessup Moot Court team, and we're heading to the international rounds in Washington D.C.",
    careerAspirations:
      "I want to work in international humanitarian law, specifically on issues affecting the Asia-Pacific region. A UN internship is my next goal.",
    enrollmentYear: 2023,
    programDuration: "1 year",
    graduateStatus: "Graduated",
    successMetric: "Jessup Moot Court Team Member",
    isVerified: true,
  },
  {
    id: "priya-sharma",
    name: "Priya Sharma",
    initials: "PS",
    portraitGradient: "linear-gradient(135deg, #FF6B35 0%, #F7C59F 50%, #004E89 100%)",
    country: "India",
    countryCode: "IN",
    university: "University of British Columbia",
    universityInitials: "UBC",
    universityColor: "#002145",
    degree: "MBA",
    program: "Global Strategy",
    quote: "My father built a small business. NexTrip helped me build the skills to scale it globally.",
    journeySummary:
      "From Mumbai's family-run textile shop to UBC's Sauder School of Business. Priya is transforming her family's legacy.",
    beforeNexTrip:
      "I was managing operations for my family's textile business in Mumbai. I knew we could grow beyond local markets, but I lacked the strategic framework. An MBA abroad was the answer, but I had no idea how to navigate the process.",
    challenges:
      "The GMAT was my mountain. I failed twice. Each time, I wanted to give up. The applications were expensive, and taking time off from the family business felt like I was letting everyone down.",
    applicationJourney:
      "NexTrip found MBA programs that valued my family business experience. My counselor helped me frame my failures as growth stories. The essay about running the business during my father's illness became the centerpiece of my application.",
    visaExperience:
      "The Canadian student visa process was smooth. NexTrip's team helped me prepare financial documents and a study plan. The visa officer actually smiled when I explained how I planned to bring Canadian business practices back to India.",
    arrivalExperience:
      "Vancouver is breathtaking. The mountains meeting the ocean — I had never seen anything like it. The first month was a blur of orientation, networking events, and imposter syndrome. But the NexTrip alumni network here is incredibly welcoming.",
    currentLife:
      "I'm in my second year, specializing in Global Strategy. I won the regional case competition and have a summer internship with a Vancouver-based textile export firm. I'm also advising my family business remotely on their digital transformation.",
    careerAspirations:
      "After graduation, I'll return to Mumbai for two years to expand our family business into sustainable textiles for export. Long-term, I want to launch a fund for women entrepreneurs in manufacturing.",
    enrollmentYear: 2023,
    programDuration: "2 years",
    graduateStatus: "In Progress",
    successMetric: "Regional Case Competition Winner",
    isVerified: true,
  },
]
