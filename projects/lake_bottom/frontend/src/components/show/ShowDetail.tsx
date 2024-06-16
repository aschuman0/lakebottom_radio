import * as React from "react"
import { EditIcon } from "@chakra-ui/icons"
import {
  Text,
  Box,
  Skeleton,
  Heading,
  Divider,
  HStack,
  IconButton,
  Modal,
  ModalOverlay,
  Badge,
  Spinner,
  Center,
} from "@chakra-ui/react"
import { useParams } from "react-router-dom"

import { useTypedSelector } from "../../store"
import { useGetShowDetailQuery } from "../../services/lakebottomApi"
import ShowEditModal from "./ShowEditModal"
import SongsTable from "./SongsTable"

const ShowDetail: React.FC = () => {
  const { id } = useParams()
  if (!id) {
    return <Heading size="lg">No ID Provided</Heading>
  }
  const { data, isLoading, isFetching } = useGetShowDetailQuery(id)
  const isLoggedIn = useTypedSelector((state) => state.login.isLoggedIn)
  const [editModalOpen, setEditModalOpen] = React.useState(false)

  return isLoading || isFetching ? (
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
        <Heading size="md">Loading Show...</Heading>
      </Center>
    </Box>
  ) : (
    <>
      <Box w="100%">
        <Skeleton isLoaded={!isLoading}>
          {data && (
            <>
              <HStack alignItems="center">
                <Heading size="lg" marginBlockEnd="1vh">
                  {data.name}
                </Heading>
                {isLoggedIn && (
                  <>
                    <Badge
                      variant="solid"
                      colorScheme={data.published ? "blue" : "gray"}
                    >
                      {data.published ? "Published" : "Not Published"}
                    </Badge>
                    <IconButton
                      variant="hollow"
                      icon={<EditIcon />}
                      onClick={() => setEditModalOpen(true)}
                      aria-label="edit this show details"
                    ></IconButton>
                  </>
                )}
              </HStack>
              <Text marginBlockEnd="1vh" whiteSpace="pre-wrap">
                {data.about}
              </Text>
              <Divider marginBlockEnd="2vh" />
              <Heading size="large">Playlist:</Heading>
              <SongsTable songs={data.songs} />
            </>
          )}
        </Skeleton>
      </Box>
      <Modal
        onClose={() => {
          setEditModalOpen(false)
        }}
        isOpen={editModalOpen}
        size="xl"
      >
        <ModalOverlay />
        {data && (
          <ShowEditModal
            isOpen={editModalOpen}
            setIsOpen={setEditModalOpen}
            showData={data}
          />
        )}
      </Modal>
    </>
  )
}

export default ShowDetail
