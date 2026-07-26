export interface CountryInfo {
  id: string
  name: string
  flag: string
  code: string
  description: string
  universities: number
  popularPrograms: string[]
  avgTuition: string
  image: string
  quickFacts: string[]
  popularCities: string[]
  visaDifficulty: string
  language: string
  avgLivingCost: string
  topUniversities: string[]
  mapX: number
  mapY: number
}

export const destinations: CountryInfo[] = [
  {
    id: 'germany',
    name: 'Germany',
    flag: 'https://flagcdn.com/w160/de.png',
    code: 'de',
    description: 'World-class engineering and innovation at public universities with minimal tuition fees.',
    universities: 430,
    popularPrograms: ['Engineering', 'Computer Science', 'Business', 'Medicine'],
    avgTuition: '$500/semester',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=85',
    quickFacts: [
      'Home to top-ranked public universities',
      'Strong focus on research & development',
      'Thriving startup ecosystem in Berlin',
      'Central location in Europe',
      'Rich cultural heritage',
    ],
    popularCities: ['Berlin', 'Munich', 'Hamburg', 'Frankfurt', 'Heidelberg'],
    visaDifficulty: 'Moderate',
    language: 'German / English',
    avgLivingCost: '$12,000/year',
    topUniversities: ['LMU Munich', 'TU Munich', 'Heidelberg University', 'Humboldt Berlin'],
    mapX: 510,
    mapY: 105,
  },
  {
    id: 'canada',
    name: 'Canada',
    flag: 'https://flagcdn.com/w160/ca.png',
    code: 'ca',
    description: 'World-leading research universities in one of the most welcoming countries for international students.',
    universities: 240,
    popularPrograms: ['Computer Science', 'Business', 'Engineering', 'Health Sciences'],
    avgTuition: '$35,000/year',
    image: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=800&q=85',
    quickFacts: [
      'High quality of life & safety',
      'Post-graduation work permits available',
      'Pathway to permanent residency',
      'Multicultural society',
      'World-class healthcare',
    ],
    popularCities: ['Toronto', 'Vancouver', 'Montreal', 'Calgary', 'Ottawa'],
    visaDifficulty: 'Low',
    language: 'English / French',
    avgLivingCost: '$18,000/year',
    topUniversities: ['University of Toronto', 'UBC', 'McGill', 'University of Alberta'],
    mapX: 180,
    mapY: 78,
  },
  {
    id: 'france',
    name: 'France',
    flag: 'https://flagcdn.com/w160/fr.png',
    code: 'fr',
    description: 'Prestigious Grandes Écoles and affordable tuition at the heart of European culture.',
    universities: 350,
    popularPrograms: ['Fashion & Luxury', 'Business', 'Engineering', 'Arts & Design'],
    avgTuition: '$4,000/year',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=85',
    quickFacts: [
      'Prestigious Grandes Écoles system',
      'Affordable public university tuition',
      'Strong in business & engineering',
      'Rich cultural & artistic history',
      'Central European location',
    ],
    popularCities: ['Paris', 'Lyon', 'Marseille', 'Toulouse', 'Bordeaux'],
    visaDifficulty: 'Moderate',
    language: 'French / English',
    avgLivingCost: '$14,000/year',
    topUniversities: ['Sorbonne', 'HEC Paris', 'École Polytechnique', 'Sciences Po'],
    mapX: 485,
    mapY: 125,
  },
  {
    id: 'uk',
    name: 'United Kingdom',
    flag: 'https://flagcdn.com/w160/gb.png',
    code: 'gb',
    description: 'Historic world-renowned universities with short degree programs and a global academic reputation.',
    universities: 390,
    popularPrograms: ['Law', 'Business', 'Engineering', 'Arts & Humanities'],
    avgTuition: '$25,000/year',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=85',
    quickFacts: [
      'Three-year undergraduate degrees',
      'Four of the top 10 universities globally',
      'Strong research output',
      'Global career opportunities',
      'Diverse international community',
    ],
    popularCities: ['London', 'Manchester', 'Edinburgh', 'Birmingham', 'Glasgow'],
    visaDifficulty: 'Moderate',
    language: 'English',
    avgLivingCost: '$20,000/year',
    topUniversities: ['Oxford', 'Cambridge', 'Imperial College', 'UCL', 'LSE'],
    mapX: 470,
    mapY: 82,
  },
  {
    id: 'china',
    name: 'China',
    flag: 'https://flagcdn.com/w160/cn.png',
    code: 'cn',
    description: 'Rapidly rising global powerhouse with massive investment in world-class university infrastructure.',
    universities: 500,
    popularPrograms: ['Engineering', 'Medicine', 'Business', 'Computer Science'],
    avgTuition: '$6,000/year',
    image: 'https://images.unsplash.com/photo-1510076857177-7470076d4098?w=800&q=85',
    quickFacts: [
      'Massive investment in higher education',
      'Rapidly rising global rankings',
      'Scholarships for international students',
      'Growing job market for graduates',
      'Unique cultural experience',
    ],
    popularCities: ['Beijing', 'Shanghai', 'Hong Kong', 'Shenzhen', 'Guangzhou'],
    visaDifficulty: 'Moderate',
    language: 'Mandarin / English',
    avgLivingCost: '$10,000/year',
    topUniversities: ['Tsinghua', 'Peking University', 'Fudan', 'Shanghai Jiao Tong'],
    mapX: 720,
    mapY: 175,
  },
  {
    id: 'us',
    name: 'United States',
    flag: 'https://flagcdn.com/w160/us.png',
    code: 'us',
    description: 'Home to the world\'s most prestigious universities with unparalleled research opportunities.',
    universities: 600,
    popularPrograms: ['Computer Science', 'Business', 'Engineering', 'Medicine'],
    avgTuition: '$40,000/year',
    image: 'https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?w=800&q=85',
    quickFacts: [
      'Most prestigious universities globally',
      'Unparalleled research funding',
      'Diverse campus communities',
      'Strong alumni networks',
      'International career opportunities',
    ],
    popularCities: ['New York', 'Boston', 'San Francisco', 'Los Angeles', 'Chicago'],
    visaDifficulty: 'High',
    language: 'English',
    avgLivingCost: '$25,000/year',
    topUniversities: ['Harvard', 'Stanford', 'MIT', 'Yale', 'Columbia'],
    mapX: 230,
    mapY: 170,
  },
]

export function getDestinationById(id: string) {
  return destinations.find((d) => d.id === id) ?? null
}

export type DestinationId = (typeof destinations)[number]['id']
