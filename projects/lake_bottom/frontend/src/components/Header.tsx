import * as React from "react"
import {
  Box,
  IconButton,
  HStack,
  Modal,
  ModalOverlay,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverCloseButton,
  Icon,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react"
import { PlusSquareIcon, EditIcon, SunIcon, MoonIcon } from "@chakra-ui/icons"
import { FiMoreVertical } from "react-icons/fi"
import { Link } from "react-router-dom"

import LoginForm from "./auth/LoginForm"
import PageEditModal from "./page/PageEditModal"

import { useTypedSelector } from "../store"
import ShowCreateModal from "./show/ShowCreateModal"

const Header: React.FC = () => {
  const loggedIn = useTypedSelector((state) => state.login.isLoggedIn)
  const [addModalOpen, setAddModalOpen] = React.useState(false)
  const [pageModalOpen, setPageModalOpen] = React.useState(false)
  const [, setButtonLoading] = React.useState(false)
  const isLargeBreakpoint = useBreakpointValue({ base: false, lg: true })
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
          <Link to="/">
            <Text as="b" color={!isLargeBreakpoint ? "white" : "black"}>
              Home
            </Text>
          </Link>
          <Link to="show">
            <Text as="b" color={!isLargeBreakpoint ? "white" : "black"}>
              Shows
            </Text>
          </Link>
          <Popover placement="bottom-end">
            <PopoverTrigger>
              <IconButton
                variant="hollow"
                // onClick={() => void 0}
                aria-label="Open user and login menu"
                icon={
                  <Icon
                    as={FiMoreVertical}
                    boxSize="1.5em"
                    color={!isLargeBreakpoint ? "white" : "black"}
                  />
                }
              ></IconButton>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverCloseButton />
              <PopoverBody>
                {loggedIn && (
                  <>
                    <Button
                      variant="hollow"
                      onClick={() => setAddModalOpen(true)}
                      aria-label="Add New Show"
                      leftIcon={<PlusSquareIcon />}
                    >
                      Add New Show
                    </Button>
                    <Button
                      variant="hollow"
                      onClick={() => {
                        setPageModalOpen(true)
                      }}
                      aria-label="Edit Page Text"
                      leftIcon={<EditIcon />}
                    >
                      Edit Page Text
                    </Button>
                  </>
                )}
                <LoginForm onClose={() => void 0} />
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </HStack>
      </Box>
      <Modal
        onClose={() => {
          setAddModalOpen(false)
          setButtonLoading(false)
        }}
        isOpen={addModalOpen}
        size="xl"
      >
        <ModalOverlay />
        <ShowCreateModal isOpen={addModalOpen} setIsOpen={setAddModalOpen} />
      </Modal>
      <Modal
        onClose={() => {
          setPageModalOpen(false)
          setButtonLoading(false)
        }}
        isOpen={pageModalOpen}
        size="xl"
      >
        <ModalOverlay />
        <PageEditModal isOpen={pageModalOpen} setIsOpen={setPageModalOpen} />
      </Modal>
    </>
  )
}

export default Header
