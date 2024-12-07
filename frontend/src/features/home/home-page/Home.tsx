import { Stack, Title } from '@mantine/core'
import Features from '../feature-section/Features'
import About from '../about/About'
import { useDocumentTitle } from '@mantine/hooks'




type Props = {}

function Home({}: Props) {
	useDocumentTitle("Homepage")
  return (
    <Stack gap={24} pt={32}>
      <Title ta="center">Projects Board</Title>
      <About />
      <Features />
    </Stack>
  )
}

export default Home
