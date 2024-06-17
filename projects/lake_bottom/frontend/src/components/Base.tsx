import * as React from "react"
import {
  Box,
  Grid,
  GridItem,
  Heading,
  Text,
  Skeleton,
  useBreakpointValue,
} from "@chakra-ui/react"
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
  const isLargeBreakpoint = useBreakpointValue({ base: false, xl: true })
  return (
    <Box
      w="100vw"
      height="100vh"
      backgroundColor="black"
      backgroundImage={"/static/img/aurora.jpg"}
      backgroundSize="cover"
      backgroundAttachment="scroll"
      backgroundPosition="center"
    >
      <Grid
        templateColumns={{ xl: "3fr 7fr", base: "1fr" }}
        templateRows={{ xl: "1fr 1fr", base: "150px, 1fr" }}
        gap="10px"
        height="100%"
        width="100%"
        paddingBlock="2vh"
        paddingInline="3vw"
        alignContent="flex-start"
        overflow="scroll"
      >
        <GridItem height="100%">
          <Grid templateColumns={{ xl: "1fr", base: "6fr 4fr" }}>
            <GridItem width="100%">
              <Heading
                size={{ xl: "3xl", base: "2xl" }}
                textColor="whitesmoke"
                paddingBlockStart={{ xl: "30vh", base: "0vh" }}
              >
                Lakebottom Radio
              </Heading>
              <Skeleton noOfLines={1} isLoaded={!liveIsLoading}>
                <Text
                  textColor="whitesmoke"
                  paddingBlockStart={{ xl: "2vh", base: "0vh" }}
                >
                  {liveData ? liveData[0].subheading : ""}
                </Text>
              </Skeleton>
            </GridItem>
            <GridItem>{!isLargeBreakpoint && <Header />}</GridItem>
          </Grid>
          <Box
            marginBlockStart={{ xl: "5vh", base: "2vh" }}
            height="fit-content"
            alignContent="start"
          >
            <Player
              showPlayer={streamData?.streamstatus === 1 ? true : false}
            />
          </Box>
        </GridItem>
        <GridItem>
          <Box
            border="solid 1px white"
            borderRadius="10px"
            height={{ xl: "90vh", base: "auto" }}
            marginBlockStart={{ xl: "3vh", base: "0vh" }}
            paddingBlock="2vh"
            marginInlineStart={{ xl: "10vh", base: "0vh" }}
            paddingInline="3vw"
            backgroundColor="white"
            boxShadow="0 30px 40px rgba(0,0,0,.1)"
            overflow="scroll"
          >
            {isLargeBreakpoint && <Header />}
            <Outlet />
          </Box>
        </GridItem>
      </Grid>
    </Box>
  )
}

export default Base
