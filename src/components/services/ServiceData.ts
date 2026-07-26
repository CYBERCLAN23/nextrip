export interface ServiceItem {
  id: string
  icon: ServiceIconName
  title: string
  description: string
}

export type ServiceIconName =
  | 'graduationCap'
  | 'currencyCircleDollar'
  | 'identificationCard'
  | 'house'
  | 'airplaneTakeoff'
  | 'briefcase'

export const services: ServiceItem[] = [
  {
    id: 'svc-1',
    icon: 'graduationCap',
    title: 'University Admission',
    description:
      'Receive personalized guidance to choose and apply to the best universities for your goals.',
  },
  {
    id: 'svc-2',
    icon: 'currencyCircleDollar',
    title: 'Scholarship Assistance',
    description:
      'Discover scholarship opportunities and financial aid that match your academic profile.',
  },
  {
    id: 'svc-3',
    icon: 'identificationCard',
    title: 'Visa Support',
    description:
      'Expert assistance with documentation, applications and interview preparation.',
  },
  {
    id: 'svc-4',
    icon: 'house',
    title: 'Accommodation Assistance',
    description:
      'Find safe and comfortable housing before you arrive in your destination country.',
  },
  {
    id: 'svc-5',
    icon: 'airplaneTakeoff',
    title: 'Travel Preparation',
    description:
      'Guidance for flights, insurance, pre-departure orientation and arrival planning.',
  },
  {
    id: 'svc-6',
    icon: 'briefcase',
    title: 'Career & Student Success',
    description:
      'Receive continuous support throughout your academic journey and beyond graduation.',
  },
]
