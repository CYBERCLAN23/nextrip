export interface University {
  id: string
  name: string
  shortName: string
  country: string
  countryCode: string
  qsRanking: number
  image: string
  description: string
  stats: {
    programs: number
    tuition: string
    acceptanceRate: string
    studentPopulation: string
  }
  programsOffered: string[]
  requirements: string
  scholarships: string
  location: string
}

export interface FilterOption {
  id: string
  label: string
}

export const filterGroups = {
  country: { label: 'Country', options: ['Canada', 'Germany', 'Australia', 'France', 'Singapore', 'United Kingdom'] },
  program: { label: 'Program', options: ['Engineering', 'Medicine', 'Law', 'Business', 'Arts', 'Computer Science'] },
  tuition: { label: 'Tuition', options: ['Under $20k', '$20k – $40k', '$40k – $60k', '$60k+'] },
  language: { label: 'Language', options: ['English', 'German', 'French'] },
  degree: { label: 'Degree', options: ["Bachelor's", "Master's", 'PhD', 'Exchange'] },
}

export const universities: University[] = [
  {
    id: 'uoft',
    name: 'University of Toronto',
    shortName: 'U of T',
    country: 'Canada',
    countryCode: 'CA',
    qsRanking: 21,
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80',
    description:
      'The University of Toronto is a public research university in Toronto, Ontario, Canada. Founded in 1827, it is consistently ranked among the top universities in the world, known for its groundbreaking research, diverse academic programs, and vibrant campus life.',
    stats: {
      programs: 700,
      tuition: '$40,000 – $60,000',
      acceptanceRate: '43%',
      studentPopulation: '65,000',
    },
    programsOffered: ['Engineering', 'Computer Science', 'Medicine', 'Law', 'Business', 'Arts & Humanities'],
    requirements: 'High school diploma with strong academic standing, English proficiency (IELTS 6.5+), letters of recommendation, and a personal statement.',
    scholarships: 'U of T offers the Lester B. Pearson International Scholarship, merit-based entrance awards, and need-based financial aid for international students.',
    location: 'Toronto, Ontario, Canada',
  },
  {
    id: 'tum',
    name: 'Technical University of Munich',
    shortName: 'TUM',
    country: 'Germany',
    countryCode: 'DE',
    qsRanking: 37,
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=80',
    description:
      'The Technical University of Munich is a world-class research university with a strong focus on engineering, technology, and innovation. Founded in 1868, TUM has produced numerous Nobel laureates and is a leading destination for science and technology education in Europe.',
    stats: {
      programs: 180,
      tuition: '$0 – $3,000',
      acceptanceRate: '38%',
      studentPopulation: '48,000',
    },
    programsOffered: ['Mechanical Engineering', 'Computer Science', 'Electrical Engineering', 'Physics', 'Chemistry', 'Architecture'],
    requirements: 'Secondary school certificate (Abitur or equivalent), academic transcripts, language proficiency (German or English depending on program), and motivation letter.',
    scholarships: 'TUM offers Deutschlandstipendium, DAAD scholarships, and various merit-based awards for international students.',
    location: 'Munich, Bavaria, Germany',
  },
  {
    id: 'unimelb',
    name: 'University of Melbourne',
    shortName: 'Melbourne',
    country: 'Australia',
    countryCode: 'AU',
    qsRanking: 33,
    image: 'https://images.unsplash.com/photo-1560440021-33f9b867899d?w=800&q=80',
    description:
      'The University of Melbourne is Australia\'s leading university, renowned for its research excellence and comprehensive curriculum. Established in 1853, it offers a distinctive Melbourne curriculum that combines depth in a chosen field with breadth across disciplines.',
    stats: {
      programs: 400,
      tuition: '$35,000 – $50,000',
      acceptanceRate: '42%',
      studentPopulation: '54,000',
    },
    programsOffered: ['Medicine', 'Law', 'Engineering', 'Commerce', 'Arts', 'Science'],
    requirements: 'Completion of secondary education equivalent to Australian Year 12, English proficiency (IELTS 6.5+), personal statement, and references.',
    scholarships: 'Melbourne International Undergraduate Scholarship, Graduate Research Scholarships, and country-specific awards.',
    location: 'Melbourne, Victoria, Australia',
  },
  {
    id: 'sorbonne',
    name: 'Sorbonne University',
    shortName: 'Sorbonne',
    country: 'France',
    countryCode: 'FR',
    qsRanking: 59,
    image: 'https://images.unsplash.com/photo-1562778612-e1e0cda9915c?w=800&q=80',
    description:
      'Sorbonne University is a prestigious public research university in Paris, formed from the merger of Paris-Sorbonne University and Pierre and Marie Curie University. With roots dating back to 1257, it is one of the oldest and most respected universities in the world.',
    stats: {
      programs: 300,
      tuition: '$3,000 – $5,000',
      acceptanceRate: '35%',
      studentPopulation: '55,000',
    },
    programsOffered: ['Humanities', 'Science & Engineering', 'Medicine', 'Law', 'Economics', 'Art History'],
    requirements: 'French Baccalaureate or equivalent, proficiency in French (DELF/DALF) or English depending on program, interview, and academic portfolio.',
    scholarships: 'Eiffel Excellence Scholarship, Erasmus+ grants, and Sorbonne\'s own financial aid program for international students.',
    location: 'Paris, Île-de-France, France',
  },
  {
    id: 'nus',
    name: 'National University of Singapore',
    shortName: 'NUS',
    country: 'Singapore',
    countryCode: 'SG',
    qsRanking: 8,
    image: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=800&q=80',
    description:
      'The National University of Singapore is Singapore\'s flagship university, consistently ranked among the top universities in Asia and the world. Known for its cutting-edge research, global partnerships, and innovative approach to education, NUS offers an unparalleled learning experience in the heart of Southeast Asia.',
    stats: {
      programs: 250,
      tuition: '$25,000 – $45,000',
      acceptanceRate: '12%',
      studentPopulation: '42,000',
    },
    programsOffered: ['Engineering', 'Business', 'Computer Science', 'Law', 'Medicine', 'Design & Environment'],
    requirements: 'High school diploma with excellent grades, English proficiency (IELTS 7.0+), admission test (varies by program), and interview.',
    scholarships: 'NUS Global Merit Scholarship, Singapore Government Scholarships, ASEAN Undergraduate Scholarships, and sports/arts awards.',
    location: 'Queenstown, Singapore',
  },
  {
    id: 'oxford',
    name: 'University of Oxford',
    shortName: 'Oxford',
    country: 'United Kingdom',
    countryCode: 'GB',
    qsRanking: 3,
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80',
    description:
      'The University of Oxford is the oldest university in the English-speaking world, with teaching dating back to 1096. Consistently ranked among the top universities globally, Oxford is renowned for its tutorial system, world-leading research, and historic colleges.',
    stats: {
      programs: 350,
      tuition: '$35,000 – $55,000',
      acceptanceRate: '17%',
      studentPopulation: '25,000',
    },
    programsOffered: ['Philosophy', 'Law', 'Medicine', 'Economics', 'Computer Science', 'English Literature'],
    requirements: 'Exceptional academic record (A*AA or equivalent), interview performance, admissions test (varies by subject), personal statement, and references.',
    scholarships: 'Rhodes Scholarship, Clarendon Fund scholarships, Oxford-Weidenfeld and Hoffmann scholarships, and college-specific awards.',
    location: 'Oxford, England, United Kingdom',
  },
]

export function getUniversityById(id: string): University | undefined {
  return universities.find((u) => u.id === id)
}
