import * as React from "react"
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  TableContainer,
  Text,
} from "@chakra-ui/react"
import { ShowSong, Song } from "../../services/lakebottomTypes"

export interface Props {
  songs: ShowSong[]
}

const SongsTable: React.FC<Props> = (props) => {
  return (
    <TableContainer
      display="flow"
      border="1px solid whitesmoke"
      borderRadius="10px"
      bg="white"
      // boxShadow="0 30px 40px rgba(0,0,0,.1)"
      whiteSpace="unset"
    >
      <Table
        variant="simple"
        colorScheme="gray"
        size={{ base: "sm", md: "md" }}
      >
        <Thead>
          <Td>Title</Td>
          <Td>Artist</Td>
          <Td>Album</Td>
          <Td>Year</Td>
        </Thead>
        <Tbody>
          {props.songs.map((song) => {
            return (
              <Tr key={song.slug}>
                <Td>
                  <Text as="b" size="large">
                    {song.title}
                  </Text>
                </Td>
                <Td>{song.artist}</Td>
                <Td>{song.album}</Td>
                <Td>{song.year}</Td>
              </Tr>
            )
          })}
        </Tbody>
      </Table>
    </TableContainer>
  )
}

export default SongsTable
