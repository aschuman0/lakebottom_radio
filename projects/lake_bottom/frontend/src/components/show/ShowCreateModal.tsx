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
  useToast,
} from "@chakra-ui/react"
import { AddIcon } from "@chakra-ui/icons"
import { usePostShowMutation } from "../../services/lakebottomApi"

interface Props {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

const ShowCreateModal: React.FC<Props> = (props) => {
  const [buttonLoading, setButtonLoading] = React.useState(false)
  const [title, setTitle] = React.useState<string>("")
  const [about, setAbout] = React.useState<string>("")
  const [showDate, setShowDate] = React.useState<string>("")
  const [file, setFile] = React.useState<File | null>(null)
  const [published, setPublished] = React.useState(true)
  const [createShow] = usePostShowMutation()
  const toast = useToast()

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0])
    }
  }

  const handleCreate = () => {
    setButtonLoading(true)
    if (!file) {
      return
    }

    const formData = new FormData()
    formData.append("file", file)
    formData.append("title", title)
    formData.append("about", about)
    formData.append("published", published ? "True" : "False")
    formData.append("show_date", showDate)

    createShow(formData)
      .unwrap()
      .then(() => {
        toast({
          description: "Show Created",
          status: "success",
        })
      })
      .finally(() => {
        setButtonLoading(false)
        props.setIsOpen(false)
      })
  }

  return (
    <ModalContent>
      <ModalHeader>Add New Show</ModalHeader>
      <ModalBody>
        <Box height="70vh">
          <Box marginBlockStart="10px">
            <Text fontSize="sm">Title</Text>
            <Input
              aria-label="title text area"
              placeholder="Show Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Box>
          <Box marginBlockStart="10px">
            <Text fontSize="sm">About</Text>
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
              onChange={handleFileChange}
            />
          </Box>
          <Box marginBlockStart="10px">
            <Checkbox
              isChecked={published}
              onChange={() => setPublished(!published)}
              spacing="1rem"
            >
              Show Is Published
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
          onClick={handleCreate}
        >
          Add Show
        </Button>
      </ModalFooter>
    </ModalContent>
  )
}

export default ShowCreateModal
