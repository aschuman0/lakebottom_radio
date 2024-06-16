import * as React from "react"
import { Heading, Text, Box, Skeleton, Divider } from "@chakra-ui/react"
import {
  useGetPageWithIdQuery,
  useGetShowListQuery,
  useGetLiveListQuery,
} from "../services/lakebottomApi"
import ShowTable from "./show/ShowTable"

const Main: React.FC = () => {
  const { data: aboutData, isLoading: aboutIsLoading } =
    useGetPageWithIdQuery("schedule")
  const { data: contactData, isLoading: contactIsLoading } =
    useGetPageWithIdQuery("contact")
  const { data: showData, isLoading: showIsLoading } = useGetShowListQuery()
  const { data: liveData, isLoading: liveIsLoading } = useGetLiveListQuery()

  const live = liveData ? liveData[0] : undefined
  const showPreview = showData ? showData.slice(0, 5) : undefined

  return (
    <Box w="100%">
      <Box marginBlock="2vh">
        <Skeleton isLoaded={!liveIsLoading}>
          <Heading size="lg" paddingBlock="1vh">
            {live ? live.heading : "Welcome to The Lakebottom"}
          </Heading>
        </Skeleton>
        <Skeleton isLoaded={!aboutIsLoading && !contactIsLoading}>
          <Text paddingBlock="1vh" whiteSpace="pre-wrap">
            {aboutData?.page_body}
          </Text>
          <Text whiteSpace="pre-wrap" paddingBlock="1vh">
            {contactData?.page_body}
          </Text>
        </Skeleton>
      </Box>
      <Divider />
      <Heading size="lg" marginBlock="2vh">
        Recent Shows
      </Heading>
      {showIsLoading ? (
        <Skeleton />
      ) : (
        <Box>{showPreview && <ShowTable shows={showPreview} />}</Box>
      )}
    </Box>
  )
}

export default Main
