import * as React from "react"
import {
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Box,
  Text,
  Button,
} from "@chakra-ui/react"
import { AddIcon } from "@chakra-ui/icons"

interface Props {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

const ShowCreateModal: React.FC<Props> = (props) => {
  const [buttonLoading, setButtonLoading] = React.useState(false)
  return (
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
            props.setIsOpen(false)
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
  )
}

export default ShowCreateModal
