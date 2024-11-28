import { ReactElement } from 'react'
import { Card as MantineCard } from '@mantine/core'

type CardProps = {
  className?: string
  children: ReactElement
}

function Card({ className, children }: CardProps) {
  return (
    <MantineCard padding="lg" withBorder radius={0} className={className}>
      {children}
    </MantineCard>
  )
}

export default Card
