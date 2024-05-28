import * as React from "react"
import {
  Text,
  Box,
  IconButton,
  HStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useToast,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverCloseButton,
  Divider,
} from "@chakra-ui/react"
import {
  HamburgerIcon,
  PlusSquareIcon,
  EditIcon,
  AddIcon,
  SunIcon,
  MoonIcon,
} from "@chakra-ui/icons"
import { Link } from "react-router-dom"
import { isLoggedIn } from "../services/loginSlice"

import LoginForm from "./auth/LoginForm"
import PageEditModal from "./page/PageEditModal"

const Header: React.FC = () => {
  const toast = useToast()
  const [addModalOpen, setAddModalOpen] = React.useState(false)
  const [pageModalOpen, setPageModalOpen] = React.useState(false)
  const [buttonLoading, setButtonLoading] = React.useState(false)
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
                      duration: 2000,
                      position: "top",
                    })
                    setIsDark(!isDark)
                  }}
                  aria-label="Toggle dark mode"
                  leftIcon={isDark ? <MoonIcon /> : <SunIcon />}
                >
                  {isDark ? "Set Light Mode" : "Set Dark Mode"}
                </Button>
                {isLoggedIn() && (
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
        <ModalContent>
          <ModalHeader>Add New Show</ModalHeader>
          <ModalBody>
            <Box height="70vh">
              <Text>Modal area</Text>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button
              variant="hollow"
              colorScheme="blackAlpha"
              onClick={() => {
                setAddModalOpen(false)
                setButtonLoading(false)
              }}
            >
              Cancel
            </Button>
            <Button
              leftIcon={<AddIcon />}
              aria-label="add new show"
              colorScheme="green"
              loadingText="Adding"
              isLoading={buttonLoading}
              onClick={() => setButtonLoading(true)}
            >
              Add Show
            </Button>
          </ModalFooter>
        </ModalContent>
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
