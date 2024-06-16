import * as React from "react"
import { Heading, Box, Spinner, Center } from "@chakra-ui/react"
import { useGetShowListQuery } from "../../services/lakebottomApi"
import ShowTable from "./ShowTable"

const ShowIndex: React.FC = () => {
  const { data, isLoading, isFetching } = useGetShowListQuery()
  return isFetching || isLoading ? (
    <Box w="100%">
      <Center>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="teal"
          size="lg"
          marginInlineEnd="10px"
        />
        <Heading size="md">Loading Shows...</Heading>
      </Center>
    </Box>
  ) : (
    <Box w="100%">
      <Heading size="lg">A Listing of Shows</Heading>
      <Box marginInlineStart="1vh" marginBlockStart="2vh">
        {data && <ShowTable shows={data} />}
      </Box>
    </Box>
  )
}

export default ShowIndex
