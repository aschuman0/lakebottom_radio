import * as React from "react"
import {
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Box,
  Text,
  Button,
  Input,
  Textarea,
  Checkbox,
  Badge,
} from "@chakra-ui/react"
import { AddIcon } from "@chakra-ui/icons"

interface Props {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

const ShowCreateModal: React.FC<Props> = (props) => {
  const [buttonLoading, setButtonLoading] = React.useState(false)
  const [title, setTitle] = React.useState<string>()
  const [about, setAbout] = React.useState<string>()
  const [showDate, setShowDate] = React.useState<string>()
  const [file, setFile] = React.useState<any | null>()
  const [published, setPublished] = React.useState(false)

  const handleCreate = () => {
    setButtonLoading(true)
    const showPayload = {
      title: title,
      about: about,
      showDate: showDate,
      file: file,
    }
    console.log(showPayload)
    setButtonLoading(false)
    // props.setIsOpen(false)
  }

  return (
    <ModalContent>
      <ModalHeader>Add New Show</ModalHeader>
      <ModalBody>
        <Box height="70vh">
          <Box marginBlockStart="10px">
            <Text fontSize="sm" as="b">
              Title
            </Text>
            <Input
              aria-label="title text area"
              placeholder="Show Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Box>
          <Box marginBlockStart="10px">
            <Text fontSize="sm" as="b">
              About
            </Text>
            <Textarea
              height="35px"
              aria-label="about show text area"
              placeholder="About this show..."
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            />
          </Box>
          <Box marginBlockStart="10px">
            <Text fontSize="sm" as="b">
              Show Date
            </Text>
            <Input
              type="date"
              aria-label="show broadcast date"
              value={showDate}
              onChange={(e) => setShowDate(e.target.value)}
            />
          </Box>
          <Box marginBlockStart="10px">
            <Text fontSize="sm" as="b">
              Choose iTunes / Apple Music File
            </Text>
            <Input
              type="file"
              aria-label="upload itunes playlist file"
              value={file}
              onChange={(e) => setFile(e.target.files)}
            />
          </Box>
          <Box marginBlockStart="10px">
            <Checkbox
              isChecked={published}
              onChange={() => setPublished(!published)}
              spacing="1rem"
            >
              Show Is Live
            </Checkbox>
          </Box>
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
          onClick={() => handleCreate()}
        >
          Add Show
        </Button>
      </ModalFooter>
    </ModalContent>
  )
}

export default ShowCreateModal
