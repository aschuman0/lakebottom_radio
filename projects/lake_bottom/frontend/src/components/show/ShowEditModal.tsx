import {
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Box,
  Text,
  Textarea,
  Input,
} from "@chakra-ui/react"
import { EditIcon } from "@chakra-ui/icons"
import * as React from "react"
import { ShowDetail } from "../../services/lakebottomTypes"

interface Props {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  showData: ShowDetail
}

const ShowEditModal: React.FC<Props> = (props) => {
  const [buttonLoading, setButtonLoading] = React.useState(false)
  const [title, setTitle] = React.useState(props.showData.name)
  const [about, setAbout] = React.useState(props.showData.about)
  const handleEdit = () => {
    setButtonLoading(true)
  }

  return (
    <ModalContent>
      <ModalHeader>{`Edit Show - ${props.showData.name}`}</ModalHeader>
      <ModalBody>
        <Box marginBlockStart="10px">
          <Text fontSize="sm" as="b">
            Title
          </Text>
          <Input
            aria-label="title text area"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Box>
        <Box marginBlockStart="10px">
          <Text fontSize="sm" as="b">
            Subheading
          </Text>
          <Textarea
            height="35px"
            aria-label="about show text area"
            placeholder="Show"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          />
        </Box>
      </ModalBody>
      <ModalFooter>
        <Button
          variant="hollow"
          colorScheme="grey"
          aria-label="cancel and close"
          onClick={() => {
            setButtonLoading(false)
            props.setIsOpen(false)
          }}
        >
          Cancel
        </Button>
        <Button
          leftIcon={<EditIcon />}
          aria-label="submit page text edits"
          colorScheme="green"
          loadingText="Editing"
          isLoading={buttonLoading}
          onClick={() => {
            handleEdit()
          }}
        >
          Edit Text
        </Button>
      </ModalFooter>
    </ModalContent>
  )
}

export default ShowEditModal
