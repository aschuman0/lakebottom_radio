import * as React from 'react'
import { Heading, Grid, GridItem, Text, Box } from '@chakra-ui/react'

const Main: React.FC = () => {
  return (
    <Grid
      margin="10px"
      templateColumns="repeat(10, 1fr)"
      gap={0}
    >
      <GridItem
        colSpan={6}
        alignItems="center"
      >
        <Heading
          size="xl"
          textColor="blue"
        >
          Lakebottom Radio
        </Heading>
        <Text>Some subhead goes here</Text>
        <Text>Player conditionally here</Text>
      </GridItem>
      <GridItem colSpan={4}>
        <Box
          border="solid 1px black"
          borderRadius="10px"
          width="100%"
          height="100%"
          paddingInlineEnd="20px"
        >
          This is the Landing type of area. Maybe a statement (about/contact?) and recent shows
        </Box>
      </GridItem>
    </Grid>
  )
}

export default Main
