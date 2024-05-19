import * as React from 'react'
import { Box, Grid, GridItem, Heading, Text } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'
import Player from './components/Player'
import Header from './components/Header'

const Base: React.FC = () => {
  return (
    <>
      <Box
        w="100%"
        height="100vh"
        backgroundColor="azure"
        backgroundImage={'/static/img/underwater.jpg'}
        backgroundAttachment="scroll"
        backgroundPosition="center"
      >
        <Grid
          margin="10px"
          templateColumns="repeat(10, 1fr)"
          gap={0}
          height="90vh"
          gridAutoColumns="auto"
        >
          <GridItem
            colSpan={3}
            alignItems="center"
            colStart={2}
          >
            <Heading
              size="3xl"
              textColor="whitesmoke"
              paddingBlockStart="30vh"
            >
              Lakebottom Radio
            </Heading>
            <Text
              textColor="whitesmoke"
              paddingBlockStart="2vh"
            >
              Some subhead goes here
            </Text>
            <Box height="10vh"></Box>
            <Player showPlayer={false} />
          </GridItem>
          <GridItem
            colSpan={4}
            colStart={6}
          >
            <Box
              border="solid 1px whitesmoke"
              borderRadius="10px"
              width="100%"
              height="100%"
              marginBlockStart="3vh"
              paddingInline="3vh"
              paddingBlockStart="2vh"
              backgroundColor="white"
              boxShadow="0 30px 40px rgba(0,0,0,.1)"
            >
              <Header />
              <Outlet />
            </Box>
          </GridItem>
        </Grid>
      </Box>
    </>
  )
}

export default Base
