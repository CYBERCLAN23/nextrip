import { Metadata } from 'next'
import BlogClient from './BlogClient'

export const metadata: Metadata = {
  title: 'Blog | NexTrip Global Limited',
  description: 'Actualités, guides et témoignages sur les études en Chine.',
}

export default function BlogPage() {
  return <BlogClient />
}
