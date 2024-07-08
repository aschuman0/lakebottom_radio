import * as React from "react"
import { Link } from "react-router-dom"
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  Th,
  TableContainer,
  Text,
  Badge,
  Spacer,
} from "@chakra-ui/react"
import { Show } from "../../services/lakebottomTypes"
import { DateTime } from "luxon"

export interface Props {
  shows: Show[]
}

const formatDate = (date: string): string => {
  // 2019-07-17T21:48:52Z
  const luxonDate = DateTime.fromISO(date)

  return luxonDate.toFormat("MMM d, y")
}

const ShowTable: React.FC<Props> = (props) => {
  return (
    <TableContainer
      display="flow"
      border="1px solid whitesmoke"
      borderRadius="10px"
      bg="white"
      // boxShadow="0 30px 40px rgba(0,0,0,.1)"
      whiteSpace="unset"
    >
      <Table variant="simple" colorScheme="gray" size="md">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>About</Th>
            <Th>Date</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {props.shows.map((show) => {
            return (
              <Tr key={show.slug}>
                <Td>
                  <Link to={`/show/${show.slug}/`}>
                    <Text as="b" size="large" wordBreak="break-all">
                      {show.name}
                    </Text>
                  </Link>
                </Td>
                <Td
                  maxWidth="250px"
                  whiteSpace="normal"
                  overflow="hidden"
                  textOverflow="ellipsis"
                >
                  {show.about}
                </Td>
                <Td>{formatDate(show.date_created)}</Td>
                {!show.published && (
                  <Td>
                    <Badge size="xs" marginBlockEnd="5px">
                      Unpublished
                    </Badge>
                  </Td>
                )}
              </Tr>
            )
          })}
        </Tbody>
      </Table>
    </TableContainer>
  )
}

export default ShowTable
