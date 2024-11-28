import { Anchor, Stack, Text } from '@mantine/core'
import { Feature } from '../shared/types'
import Card from '../components/Card'

type FeatureCardProps = {
  feature: Feature
}

function FeatureCard({ feature }: FeatureCardProps) {
  return (
    <Card>
      <Stack align="center">
        {feature.icon}
        <Text>{feature.title}</Text>
        <Text ta="center">{feature.text}</Text>
        {feature.link ? (
          <Anchor c="orange" href={feature.link}>
            {feature.linkText}
          </Anchor>
        ) : null}
      </Stack>
    </Card>
  )
}

export default FeatureCard
