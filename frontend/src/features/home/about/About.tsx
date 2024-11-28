import Card from '../components/Card'
import { Stack, Text } from '@mantine/core'
import classes from "./about.module.css";
function About() {
  return (
    <Card className={classes.card}>
      <Stack>
        <Text>
          This is a showcase of projects that are seeking collaborators. If
          you're a developer looking to join forces, explore the projects listed
          here and reach out to the contact person to get started.
        </Text>
        <Text>
          If you have your own project or idea that you'd like to share and find
          collaborators for, feel free to add it here.
        </Text>
      </Stack>
    </Card>
  )
}

export default About
