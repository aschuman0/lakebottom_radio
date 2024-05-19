import * as React from 'react'
import { Heading, Text, Box, IconButton } from '@chakra-ui/react'
import { InfoOutlineIcon } from '@chakra-ui/icons'
import { Link } from 'react-router-dom'

const Header: React.FC = () => {
  return (
    <Box
      w="100%"
      height="50px"
      display="grid"
      alignItems="center"
      justifyItems="flex-end"
      marginInlineEnd="50px"
    >
      <Link to="shows">Show Archive</Link>
      <Link to="about">About</Link>
      <Link to="contact">Contact</Link>
      <IconButton
        onClick={() => void 0}
        aria-label="Open user and login menu"
        icon={<InfoOutlineIcon />}
      ></IconButton>
    </Box>
  )
}

export default Header
