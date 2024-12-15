import { SimpleGrid } from '@mantine/core'
import FeatureCard from './FeatureCard'
import { Eye, Hexagon, Users } from 'lucide-react'

function Features() {
  const features = [
    {
      icon: <Eye />,
      title: 'Browse Projects',
      text: 'Explore project ideas from our community members, including tech stacks and requirements.',
    },
    {
      icon: <Hexagon />,
      title: 'Share Your Idea',
      text: 'Have a project in mind? Fill out the form below to share it with potential collaborators.',
    },
    {
      icon: <Users />,
      title: 'Connect',
      text: 'Use Discord usernames to connect with project owners and join their teams.',
      link: 'https://discord.com/invite/KJFGcyYVwN',
      linkText: 'Join us on Discord!',
    },
  ]

  return (
    <SimpleGrid cols={3}>
      {features.map((feature) => (
        <FeatureCard feature={feature} />
      ))}
    </SimpleGrid>
  )
}

export default Features
