import * as React from 'react'
import { Text, Box, Center, Heading } from '@chakra-ui/react'

const ErrorPage: React.FC = () => {
  return (
    <Box
      w="100%"
      height="100vh"
      backgroundColor="red"
    >
      <Center>
        <Heading
          size="4xl"
          textColor="whitesmoke"
        >
          ERROR
        </Heading>
      </Center>
    </Box>
  )
}

export default ErrorPage
