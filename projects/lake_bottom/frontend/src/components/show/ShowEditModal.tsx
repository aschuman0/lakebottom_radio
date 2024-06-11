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
  Checkbox,
  useToast,
} from "@chakra-ui/react"
import { EditIcon } from "@chakra-ui/icons"
import * as React from "react"
import { ShowDetail } from "../../services/lakebottomTypes"
import { usePutShowMutation } from "../../services/lakebottomApi"

interface Props {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  showData: ShowDetail
}

const ShowEditModal: React.FC<Props> = (props) => {
  const [buttonLoading, setButtonLoading] = React.useState(false)
  const [title, setTitle] = React.useState(props.showData.name)
  const [about, setAbout] = React.useState(props.showData.about)
  const [published, setPublished] = React.useState(props.showData.published)

  const [updateShow] = usePutShowMutation()
  const toast = useToast()

  const handleEdit = () => {
    setButtonLoading(true)
    updateShow({
      ...props.showData,
      about: about,
      name: title,
      published: published,
    })
      .unwrap()
      .then(() => {
        setButtonLoading(false)
        props.setIsOpen(false)
        toast({
          title: "Show Edited Successfully",
          status: "success",
        })
      })
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
            About
          </Text>
          <Textarea
            height="35px"
            aria-label="about show text area"
            placeholder="Show"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          />
        </Box>
        <Checkbox
          isChecked={published}
          onChange={() => setPublished(!published)}
        >
          Is Published?
        </Checkbox>
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
          aria-label="submit show text edits"
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
