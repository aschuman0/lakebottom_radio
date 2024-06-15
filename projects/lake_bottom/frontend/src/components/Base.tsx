import * as React from "react"
import { Box, Grid, GridItem, Heading, Text, Skeleton } from "@chakra-ui/react"
import { Outlet } from "react-router-dom"
import Player from "./Player"
import Header from "./Header"
import { useGetStreamInfoQuery } from "../services/lakebottomApi"

import { useGetLiveListQuery } from "../services/lakebottomApi"

const Base: React.FC = () => {
  const { data: liveData, isLoading: liveIsLoading } = useGetLiveListQuery()
  const { data: streamData } = useGetStreamInfoQuery(void 0, {
    pollingInterval: 5000,
    skipPollingIfUnfocused: true,
  })
  console.log(streamData)
  return (
    <Box
      w="100%"
      height="100vh"
      backgroundColor="azure"
      backgroundImage={"/static/img/aurora.jpg"}
      backgroundSize="cover"
      backgroundAttachment="scroll"
      backgroundPosition="center"
    >
      <Grid
        templateColumns="repeat(10, 1fr)"
        gap={0}
        height="90vh"
        gridAutoColumns="auto"
      >
        <GridItem colSpan={3} alignItems="center" colStart={2}>
          <Heading size="3xl" textColor="whitesmoke" paddingBlockStart="30vh">
            Lakebottom Radio
          </Heading>
          <Skeleton noOfLines={1} isLoaded={!liveIsLoading}>
            <Text textColor="whitesmoke" paddingBlockStart="2vh">
              {liveData ? liveData[0].subheading : ""}
            </Text>
          </Skeleton>
          <Box height="10vh"></Box>
          <Player showPlayer={streamData?.streamstatus === 1 ? true : false} />
        </GridItem>
        <GridItem colSpan={4} colStart={6}>
          <Box
            border="solid 1px whitesmoke"
            borderRadius="10px"
            width="100%"
            height="100%"
            marginBlockStart="3vh"
            paddingInline="3vh"
            paddingBlockStart="2vh"
            backgroundColor="white"
            boxShadow="0 30px 40px rgba(0,0,0,.1)"
          >
            <Header />
            <Outlet />
          </Box>
        </GridItem>
      </Grid>
    </Box>
  )
}

export default Base
