export interface StepTheme {
  bgColor: string
  accent: string
  accentLight: string
  textDark: string
  textMuted: string
  blob1: string
  blob2: string
}

export interface JourneyStepItem {
  id: string
  number: string
  icon: JourneyIcon
  title: string
  subtitle: string
  description: string
  duration: string
  tag: string
  deliverables: string[]
  image: string
  theme: StepTheme
}

export type JourneyIcon =
  | 'magnifyingGlass'
  | 'chatCircle'
  | 'fileText'
  | 'identificationCard'
  | 'airplaneTakeoff'
  | 'graduationCap'

export const journeySteps: JourneyStepItem[] = [
  {
    id: 'step-1',
    number: '01',
    icon: 'magnifyingGlass',
    title: 'Discovery & Matching',
    subtitle: 'Global AI Program Finder',
    description:
      'Explore over 1,500+ top-ranked universities, scholarship databases, and career-aligned degree programs across 30+ countries.',
    duration: 'Week 1 - 2',
    tag: 'Exploration',
    deliverables: ['Personalized shortlist of 5-8 universities', 'Scholarship eligibility audit', 'Budget & cost planner'],
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
    theme: {
      bgColor: '#F3E8FA',
      accent: '#6027A1',
      accentLight: 'rgba(96, 39, 161, 0.1)',
      textDark: '#311152',
      textMuted: '#9C88B8',
      blob1: '#EADAF7',
      blob2: '#E2CEF5',
    },
  },
  {
    id: 'step-2',
    number: '02',
    icon: 'chatCircle',
    title: 'Strategic Consultation',
    subtitle: '1-on-1 Senior Advisory',
    description:
      'Partner with a dedicated global education strategist to evaluate your profile, refine program choices, and build a winning strategy.',
    duration: 'Week 2 - 3',
    tag: 'Advisory',
    deliverables: ['Custom admission roadmap', 'Profile enhancement recommendations', 'Timeline & deadline checklist'],
    image: 'https://images.unsplash.com/photo-1531497865144-0464ef8fb9a9?auto=format&fit=crop&w=800&q=80',
    theme: {
      bgColor: '#EBF7F4',
      accent: '#0D9488',
      accentLight: 'rgba(13, 148, 136, 0.1)',
      textDark: '#064E3B',
      textMuted: '#5FA99B',
      blob1: '#CCFBF1',
      blob2: '#99F6E4',
    },
  },
  {
    id: 'step-3',
    number: '03',
    icon: 'fileText',
    title: 'Dossier & Application',
    subtitle: 'Precision File Submission',
    description:
      'Craft compelling Personal Statements, Statements of Purpose, and polished portfolios with multi-tier editorial review.',
    duration: 'Week 4 - 6',
    tag: 'Execution',
    deliverables: ['Edited SOP & Recommendation Letters', 'Certified document translations', 'Verified application submissions'],
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
    theme: {
      bgColor: '#EEF2FF',
      accent: '#4338CA',
      accentLight: 'rgba(67, 56, 202, 0.1)',
      textDark: '#1E1B4B',
      textMuted: '#818CF8',
      blob1: '#E0E7FF',
      blob2: '#C7D2FE',
    },
  },
  {
    id: 'step-4',
    number: '04',
    icon: 'identificationCard',
    title: 'Visa & Legal Approval',
    subtitle: 'Consulate Readiness',
    description:
      'Seamless visa application guidance with mock consular interviews, financial proof verification, and expedited filing.',
    duration: 'Week 7 - 10',
    tag: 'Compliance',
    deliverables: ['Consular interview simulation', 'Financial proof verification', 'Approved student visa & permit'],
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80',
    theme: {
      bgColor: '#FFFBEB',
      accent: '#D97706',
      accentLight: 'rgba(217, 119, 6, 0.1)',
      textDark: '#78350F',
      textMuted: '#D99B38',
      blob1: '#FEF3C7',
      blob2: '#FDE68A',
    },
  },
  {
    id: 'step-5',
    number: '05',
    icon: 'airplaneTakeoff',
    title: 'Pre-Departure Logistics',
    subtitle: 'Global Concierge',
    description:
      'Secure vetted university housing, arrange flight itineraries, student health insurance, and international banking.',
    duration: 'Week 11 - 12',
    tag: 'Logistics',
    deliverables: ['Guaranteed housing contract', 'Student healthcare coverage', 'Airport pickup & orientation briefing'],
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
    theme: {
      bgColor: '#FFF1F2',
      accent: '#E11D48',
      accentLight: 'rgba(225, 29, 72, 0.1)',
      textDark: '#881337',
      textMuted: '#E37894',
      blob1: '#FFE4E6',
      blob2: '#FECDD3',
    },
  },
  {
    id: 'step-6',
    number: '06',
    icon: 'graduationCap',
    title: 'Campus Arrival & Integration',
    subtitle: 'On-Ground Support',
    description:
      'Step onto campus with total confidence. Access 24/7 student support, alumni networking, and local community integration.',
    duration: 'Day 1 & Beyond',
    tag: 'Success',
    deliverables: ['Local mentor introduction', 'Campus orientation kit', 'Alumni network access'],
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80',
    theme: {
      bgColor: '#F0F9FF',
      accent: '#0284C7',
      accentLight: 'rgba(2, 132, 199, 0.1)',
      textDark: '#0C4A6E',
      textMuted: '#58B3DF',
      blob1: '#E0F2FE',
      blob2: '#BAE6FD',
    },
  },
]

export const VIEWBOX = { w: 1000, h: 2400 } as const

export function getStepY(index: number): number {
  return 280 + index * 320
}

export function getStepX(index: number): number {
  return index % 2 === 0 ? 300 : 700
}

export function buildPathD(): string {
  const segments: string[] = []
  for (let i = 0; i < 6; i++) {
    const x = getStepX(i)
    const y = getStepY(i)
    if (i === 0) {
      segments.push(`M ${x} ${y}`)
    } else {
      const prevX = getStepX(i - 1)
      const prevY = getStepY(i - 1)
      const midY = (prevY + y) / 2
      segments.push(`C ${prevX},${midY} ${x},${midY} ${x},${y}`)
    }
  }
  return segments.join(' ')
}
