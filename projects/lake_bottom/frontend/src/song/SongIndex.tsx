import * as React from 'react'
import { Text, Box } from '@chakra-ui/react'

const SongIndex: React.FC = () => {
  return (
    <Box
      w="100%"
      height="100vh"
      backgroundColor="violet"
    >
      <Text
        alignSelf="center"
        textColor="InfoText"
      >
        A Listing of Songs
      </Text>
    </Box>
  )
}

export default SongIndex
