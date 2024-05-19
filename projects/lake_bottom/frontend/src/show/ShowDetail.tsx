import * as React from 'react'
import { Text, Box } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'

const ShowDetail: React.FC = () => {
  const { id } = useParams()

  return (
    <Box
      w="100%"
      height="100vh"
      backgroundColor="yellowgreen"
    >
      {id ? (
        <Text textColor="InfoText">Show Detail for {id}</Text>
      ) : (
        <Text textStyle="error">no id provided</Text>
      )}
    </Box>
  )
}

export default ShowDetail
