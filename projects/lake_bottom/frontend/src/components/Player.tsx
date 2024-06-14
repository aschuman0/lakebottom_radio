import * as React from "react"
import AudioPlayer, { RHAP_UI } from "react-h5-audio-player"
import { Box, Center, Heading, Icon, Text, Badge } from "@chakra-ui/react"
import "react-h5-audio-player/src/styles.scss"

import { FiPlay, FiSquare, FiVolume2, FiVolumeX } from "react-icons/fi"

interface Props {
  showPlayer: boolean
}
const audioUrl = "http://35.227.60.131:8000/1;"

const Player: React.FC<Props> = (props) => {
  return props.showPlayer ? (
    <Box
      borderRadius="10px"
      width="100%"
      height="150px"
      backgroundColor="white"
      border="solid 1px grey"
      boxShadow="0 30px 40px rgba(0,0,0,.5)"
      paddingInline="3vh"
      paddingBlock="1vh"
    >
      <Center>
        <Badge variant="solid" colorScheme="red" marginBlock="5px" size="large">
          LIVE - On Air Now
        </Badge>
      </Center>
      <Box marginBlockStart="20px">
        <AudioPlayer
          src={audioUrl}
          showJumpControls={false}
          customAdditionalControls={[]}
          customProgressBarSection={[
            <Text marginInlineStart="50px" marginInlineEnd="20px">
              Title - Artist - Album - Title - Artist - Album - Title - Artist -
              Album - Title - Artist - Album
            </Text>,
          ]}
          customVolumeControls={[RHAP_UI.VOLUME]}
          customIcons={{
            play: <Icon as={FiPlay} paddingInlineEnd="10px" />,
            pause: <Icon as={FiSquare} paddingInlineEnd="10px" />,
            volume: <Icon as={FiVolume2} />,
            volumeMute: <Icon as={FiVolumeX} />,
          }}
          layout="horizontal-reverse"
        />
      </Box>
    </Box>
  ) : (
    <></>
  )
}

export default Player
