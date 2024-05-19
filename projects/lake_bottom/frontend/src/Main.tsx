import * as React from 'react'
import { Heading, Text, Box, Divider } from '@chakra-ui/react'

const Main: React.FC = () => {
  return (
    <Box w="100%">
      <Heading size="lg">Welcome to The Lakebottom</Heading>
      <Text>This is where the about text goes</Text>
      <Text>This is where the schedule text goes</Text>
      <Divider paddingBlockEnd="10vh" />
      <Heading size="lg">Recent Shows</Heading>
    </Box>
  )
}

export default Main
