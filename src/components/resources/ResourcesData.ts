export type ResourceCategory =
  | "Scholarships"
  | "Visa"
  | "Admissions"
  | "Countries"
  | "Universities"
  | "Career"

export interface Resource {
  id: string
  category: ResourceCategory
  title: string
  description: string
  excerpt: string
  readingTime: string
  publishDate: string
  author: string
  gradient: string
  initials: string
  isFeatured?: boolean
  cta: string
}

export const resourceCategories: ResourceCategory[] = [
  "Scholarships",
  "Visa",
  "Admissions",
  "Countries",
  "Universities",
  "Career",
]

export const featuredResource: Resource = {
  id: "scholarships-2026",
  category: "Scholarships",
  title: "The Complete Guide to International Scholarships for 2026",
  description:
    "A comprehensive breakdown of fully-funded scholarships, merit-based awards, and country-specific funding opportunities for international students.",
  excerpt:
    "From Fulbright to Chevening, DAAD to Erasmus — learn which scholarships match your profile, how to craft a winning application, and the deadlines you cannot miss.",
  readingTime: "12 min read",
  publishDate: "January 2026",
  author: "NexTrip Scholarship Team",
  gradient: "linear-gradient(135deg, #0A3D91 0%, #1D5FD1 50%, #00D9FF 100%)",
  initials: "S",
  isFeatured: true,
  cta: "Read Guide",
}

export const resources: Resource[] = [
  {
    id: "student-visa-guide",
    category: "Visa",
    title: "Student Visa Timelines: What to Expect Month by Month",
    description:
      "Navigate the student visa application process with confidence using our month-by-month timeline for top study destinations.",
    excerpt:
      "Avoid last-minute stress with a clear timeline covering document preparation, biometrics, financial evidence, and interview tips for UK, US, Canada, Australia, and Europe.",
    readingTime: "8 min read",
    publishDate: "January 2026",
    author: "Visa Advisory Team",
    gradient: "linear-gradient(135deg, #1D5FD1 0%, #00D9FF 100%)",
    initials: "V",
    cta: "Explore",
  },
  {
    id: "uk-admissions",
    category: "Admissions",
    title: "How to Write a UCAS Personal Statement That Stands Out",
    description:
      "Insider strategies for crafting a compelling UCAS personal statement that admissions tutors remember.",
    excerpt:
      "Learn the structure, tone, and content that UK universities look for, with real examples from successful applicants to Russell Group institutions.",
    readingTime: "10 min read",
    publishDate: "December 2025",
    author: "Admissions Team",
    gradient: "linear-gradient(135deg, #D81F2A 0%, #FF6B6B 100%)",
    initials: "U",
    cta: "Explore",
  },
  {
    id: "canada-study-guide",
    category: "Countries",
    title: "Studying in Canada: Your Complete 2026 Guide",
    description:
      "Everything you need to know about studying in Canada — from university selection to post-graduation work permits.",
    excerpt:
      "Canada remains one of the top destinations for international students. Discover the best provinces, tuition costs, scholarship options, and the PGWP pathway.",
    readingTime: "15 min read",
    publishDate: "November 2025",
    author: "Country Specialists",
    gradient: "linear-gradient(135deg, #E63946 0%, #A8DADC 50%, #457B9D 100%)",
    initials: "C",
    cta: "Explore",
  },
  {
    id: "top-universities",
    category: "Universities",
    title: "Beyond Rankings: Finding the Right University for You",
    description:
      "A framework for evaluating universities beyond global rankings to find the best academic and cultural fit.",
    excerpt:
      "Rankings only tell part of the story. Learn how to evaluate teaching quality, research output, campus culture, location, and career support services.",
    readingTime: "7 min read",
    publishDate: "October 2025",
    author: "University Relations",
    gradient: "linear-gradient(135deg, #7209B7 0%, #3F37C9 50%, #4CC9F0 100%)",
    initials: "U",
    cta: "Explore",
  },
  {
    id: "career-after-study",
    category: "Career",
    title: "From Graduation to Career: A Global Job Market Playbook",
    description:
      "Strategic advice for international students entering the global job market, from OPT to sponsorship and beyond.",
    excerpt:
      "Whether you plan to stay abroad or return home, this guide covers resume localization, networking strategies, work authorization, and industry insights.",
    readingTime: "9 min read",
    publishDate: "September 2025",
    author: "Career Services",
    gradient: "linear-gradient(135deg, #0077B6 0%, #00B4D8 50%, #90E0EF 100%)",
    initials: "G",
    cta: "Explore",
  },
  {
    id: "australia-scholarships",
    category: "Scholarships",
    title: "Australia Awards & Destination Australia: Funding Your Dream",
    description:
      "Deep dive into Australian government scholarships and the Destination Australia program for regional study.",
    excerpt:
      "Australia offers generous scholarship programs for international students. Learn eligibility criteria, application tips, and how to maximize your chances.",
    readingTime: "6 min read",
    publishDate: "August 2025",
    author: "Scholarship Team",
    gradient: "linear-gradient(135deg, #D4AF37 0%, #8B6914 100%)",
    initials: "A",
    cta: "Explore",
  },
]
