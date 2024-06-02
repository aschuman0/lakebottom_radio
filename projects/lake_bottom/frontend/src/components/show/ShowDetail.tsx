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
} from "@chakra-ui/react"
import { useParams } from "react-router-dom"

import { useTypedSelector } from "../../store"
import { useGetShowDetailQuery } from "../../services/lakebottomApi"
import ShowEditModal from "./ShowEditModal"

const ShowDetail: React.FC = () => {
  const { id } = useParams()
  if (!id) {
    return <Heading size="lg">No ID Provided</Heading>
  }
  const { data, isLoading } = useGetShowDetailQuery(id)
  const isLoggedIn = useTypedSelector((state) => state.login.isLoggedIn)
  const [editModalOpen, setEditModalOpen] = React.useState(false)
  const [buttonLoading, setButtonLoading] = React.useState(false)

  return (
    <>
      <Box w="100%">
        <Skeleton isLoaded={!isLoading}>
          {data && (
            <>
              <HStack>
                <Heading size="lg" marginBlockEnd="1vh">
                  {data.name}
                </Heading>
                {isLoggedIn && (
                  <IconButton
                    variant="hollow"
                    icon={<EditIcon />}
                    onClick={() => setEditModalOpen(true)}
                    aria-label="edit this show details"
                  ></IconButton>
                )}
              </HStack>
              <Text marginBlockEnd="1vh">{data.about}</Text>
              <Divider marginBlockEnd="2vh" />
              <Heading size="large">Playlist:</Heading>
              {data.songs.map((song) => {
                return (
                  <Box key={song.slug}>
                    <Text>{`${song.artist} - ${song.title} from ${song.album}`}</Text>
                  </Box>
                )
              })}
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
