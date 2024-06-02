import * as React from "react"
import { Heading, Box, Skeleton } from "@chakra-ui/react"
import ShowListItem from "./ShowListItem"
import { Show } from "../../services/lakebottomTypes"
import { useGetShowListQuery } from "../../services/lakebottomApi"

const ShowIndex: React.FC = () => {
  const { data, isLoading } = useGetShowListQuery()
  return (
    <Box w="100%">
      <Heading size="lg">A Listing of Shows</Heading>
      <Box marginInlineStart="1vh" marginBlockStart="2vh">
        <Skeleton isLoaded={!isLoading}>
          {data &&
            data.map((show) => {
              return <ShowListItem show={show} key={show.slug} />
            })}
        </Skeleton>
      </Box>
    </Box>
  )
}

export default ShowIndex
