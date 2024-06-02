import * as React from "react"
import {
  Box,
  IconButton,
  HStack,
  Modal,
  ModalOverlay,
  Button,
  useToast,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverCloseButton,
} from "@chakra-ui/react"
import {
  HamburgerIcon,
  PlusSquareIcon,
  EditIcon,
  SunIcon,
  MoonIcon,
} from "@chakra-ui/icons"
import { Link } from "react-router-dom"

import LoginForm from "./auth/LoginForm"
import PageEditModal from "./page/PageEditModal"

import { useTypedSelector } from "../store"
import ShowCreateModal from "./show/ShowCreateModal"

const Header: React.FC = () => {
  const toast = useToast()
  const loggedIn = useTypedSelector((state) => state.login.isLoggedIn)
  const [addModalOpen, setAddModalOpen] = React.useState(false)
  const [pageModalOpen, setPageModalOpen] = React.useState(false)
  const [, setButtonLoading] = React.useState(false)
  const [isDark, setIsDark] = React.useState(false)
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
          <Link to="show">Shows</Link>
          <Popover placement="bottom-end">
            <PopoverTrigger>
              <IconButton
                variant="hollow"
                onClick={() => void 0}
                aria-label="Open user and login menu"
                icon={<HamburgerIcon />}
              ></IconButton>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverCloseButton />
              <PopoverBody>
                <Button
                  variant="hollow"
                  onClick={() => {
                    toast({
                      title: "Someone changed the theme.",
                      status: "info",
                      variant: "subtle",
                      duration: 2000,
                    })
                    setIsDark(!isDark)
                  }}
                  aria-label="Toggle dark mode"
                  leftIcon={isDark ? <MoonIcon /> : <SunIcon />}
                >
                  {isDark ? "Set Light Mode" : "Set Dark Mode"}
                </Button>
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
