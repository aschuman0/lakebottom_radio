import * as React from "react"
import AudioPlayer from "react-h5-audio-player"
import { Box, Center, Icon, Text, Badge, Skeleton } from "@chakra-ui/react"
import { FiPlay, FiSquare, FiVolume2, FiVolumeX } from "react-icons/fi"
import { useGetStreamInfoQuery } from "../services/lakebottomApi"

import "react-h5-audio-player/src/styles.scss"

interface Props {
  showPlayer: boolean
}
const audioUrl = "http://35.227.60.131:8000/1;"

const Player: React.FC<Props> = (props) => {
  const { data, isLoading, refetch } = useGetStreamInfoQuery(void 0, {
    pollingInterval: 5000,
    skipPollingIfUnfocused: true,
  })

  return props.showPlayer ? (
    <Box
      borderRadius="10px"
      width="100%"
      minHeight="150px"
      backgroundColor="white"
      border="solid 1px grey"
      boxShadow="0 30px 40px rgba(0,0,0,.5)"
      paddingInline="3vh"
      paddingBlock="1vh"
    >
      <Center>
        <Badge
          variant="solid"
          colorScheme="yellow"
          marginBlock="5px"
          size="large"
          borderRadius="5px"
        >
          LIVE • On Air
        </Badge>
      </Center>
      <Box marginBlockStart="20px">
        <AudioPlayer
          src={audioUrl}
          preload="none"
          showJumpControls={false}
          customAdditionalControls={[]}
          customProgressBarSection={[
            <Skeleton isLoaded={!isLoading}>
              <Text marginInlineStart="50px" marginInlineEnd="20px">
                {data?.songtitle ? data.songtitle : ""}
              </Text>
            </Skeleton>,
          ]}
          customVolumeControls={[]}
          customIcons={{
            play: <Icon as={FiPlay} paddingInlineEnd="10px" />,
            pause: <Icon as={FiSquare} paddingInlineEnd="10px" />,
            volume: <Icon as={FiVolume2} />,
            volumeMute: <Icon as={FiVolumeX} />,
          }}
          layout="horizontal-reverse"
          onPlay={refetch}
        />
      </Box>
    </Box>
  ) : (
    <></>
  )
}

export default Player
