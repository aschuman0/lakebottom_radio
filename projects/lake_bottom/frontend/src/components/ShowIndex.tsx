import * as React from 'react'
import { Text, Box } from '@chakra-ui/react'

const ShowIndex: React.FC = () => {
  return (
    <Box w="100%">
      <Text
        alignSelf="center"
        textColor="InfoText"
      >
        A Listing of shows
      </Text>
    </Box>
  )
}

export default ShowIndex
