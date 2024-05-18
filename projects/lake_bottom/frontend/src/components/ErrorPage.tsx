import * as React from 'react'
import { Text, Box } from '@chakra-ui/react'

const ErrorPage: React.FC = () => {
  return (
    <Box w='100%' height='100vh' backgroundColor='red'>
      <Text
        alignSelf='center'
        justifySelf="center"
        textColor='whitesmoke'>
          An Error!?
        </Text>
    </Box>
  )
}

export default ErrorPage