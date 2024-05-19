import * as React from 'react'
import {
  Heading,
  Text,
  Box,
  IconButton,
  HStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  PopoverBody,
} from '@chakra-ui/react'
import { SettingsIcon, PlusSquareIcon, EditIcon } from '@chakra-ui/icons'
import { Link } from 'react-router-dom'

const Header: React.FC = () => {
  const [addModalOpen, setAddModalOpen] = React.useState(false)
  return (
    <>
      <Box
        w="100%"
        height="50px"
        display="grid"
        alignItems="center"
        justifyItems="flex-end"
        marginInlineEnd="50px"
      >
        <HStack spacing="1vh">
          <Link to="/">Home</Link>
          <Link to="show">Archive</Link>
          <IconButton
            variant="hollow"
            onClick={() => setAddModalOpen(true)}
            aria-label="Add New Show"
            icon={<PlusSquareIcon />}
          ></IconButton>
          <IconButton
            variant="hollow"
            onClick={() => void 0}
            aria-label="Edit Page Text"
            icon={<EditIcon />}
          ></IconButton>
          <Popover>
            <PopoverTrigger>
              <IconButton
                variant="hollow"
                onClick={() => void 0}
                aria-label="Open user and login menu"
                icon={<SettingsIcon />}
              ></IconButton>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverHeader>Settings</PopoverHeader>
              <PopoverBody>Hello</PopoverBody>
            </PopoverContent>
          </Popover>
        </HStack>
      </Box>
      <Modal
        onClose={() => setAddModalOpen(false)}
        isOpen={addModalOpen}
        size="xl"
      >
        <ModalOverlay />
        <ModalContent width="80vw">
          <ModalHeader>Add New Show</ModalHeader>
          <ModalCloseButton />
          <Box height="70vh">
            <Text>Modal area</Text>
          </Box>
        </ModalContent>
      </Modal>
    </>
  )
}

export default Header
