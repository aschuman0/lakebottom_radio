import * as React from 'react'
import { Box, Center, Heading } from '@chakra-ui/react'

interface Props {
  showPlayer: boolean
}

const Player: React.FC<Props> = (props) => {
  return props.showPlayer ? (
    <Box
      borderRadius="10px"
      width="100%"
      height="150px"
      backgroundColor="white"
      border="solid 1px whitesmoke"
      boxShadow="0 30px 40px rgba(0,0,0,.1)"
      paddingInline="3vh"
      paddingBlock="1vh"
    >
      <Center>
        <Heading size="XL">PLAYER</Heading>
      </Center>
    </Box>
  ) : (
    <></>
  )
}

export default Player
