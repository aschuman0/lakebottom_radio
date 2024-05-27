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
} from "@chakra-ui/react"
import {
  SettingsIcon,
  PlusSquareIcon,
  EditIcon,
  AddIcon,
  SunIcon,
  MoonIcon,
} from "@chakra-ui/icons"
import { Link } from "react-router-dom"
import { isLoggedIn } from "../services/loginSlice"

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
          {/* <Popover placement="bottom-end">
            <PopoverTrigger>
              <IconButton
                variant="hollow"
                onClick={() => void 0}
                aria-label="Open user and login menu"
                icon={<SettingsIcon />}
              ></IconButton>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverBody>
                <LoginForm onClose={() => void 0} />
              </PopoverBody>
            </PopoverContent>
          </Popover> */}
          <IconButton
            variant="hollow"
            onClick={() => {
              toast({
                title: "Someone changed the theme.",
                status: "success",
                duration: 2000,
                position: "top",
              })
              setIsDark(!isDark)
            }}
            aria-label="Toggle dark mode"
            icon={isDark ? <MoonIcon /> : <SunIcon />}
          ></IconButton>
          {isLoggedIn() && (
            <>
              <IconButton
                variant="hollow"
                onClick={() => setAddModalOpen(true)}
                aria-label="Add New Show"
                icon={<PlusSquareIcon />}
              ></IconButton>
              <IconButton
                variant="hollow"
                onClick={() => {
                  setPageModalOpen(true)
                }}
                aria-label="Edit Page Text"
                icon={<EditIcon />}
              ></IconButton>
            </>
          )}
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
        <ModalContent>
          <ModalHeader>Edit Page Text</ModalHeader>
          <ModalBody>
            <Box height="70vh">
              <Text>Modal Form Area</Text>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button
              variant="hollow"
              colorScheme="blackAlpha"
              onClick={() => {
                setPageModalOpen(false)
                setButtonLoading(false)
              }}
            >
              Cancel
            </Button>
            <Button
              leftIcon={<EditIcon />}
              aria-label="edit page text"
              colorScheme="green"
              loadingText="Editing"
              isLoading={buttonLoading}
              onClick={() => setButtonLoading(true)}
            >
              Edit Text
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default Header
