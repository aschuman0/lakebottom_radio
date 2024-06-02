import * as React from "react"
import {
  Button,
  ModalContent,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Box,
  Text,
  Input,
  Textarea,
  Skeleton,
  Divider,
  useToast,
} from "@chakra-ui/react"
import { EditIcon } from "@chakra-ui/icons"
import moment from "moment"
import {
  useGetLiveListQuery,
  useGetPageWithIdQuery,
  usePutLiveListMutation,
  usePutPageListMutation,
} from "../../services/lakebottomApi"

interface Props {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

const PageEditModal: React.FC<Props> = (props) => {
  const [buttonLoading, setButtonLoading] = React.useState(false)
  const { data: aboutData } = useGetPageWithIdQuery("schedule")
  const { data: contactData } = useGetPageWithIdQuery("contact")
  const { data: liveData } = useGetLiveListQuery()
  const [updateLive] = usePutLiveListMutation()
  const [updatePage] = usePutPageListMutation()

  const [scheduleText, setScheduleText] = React.useState(
    aboutData ? aboutData.page_body : "",
  )
  const [contactText, setContactText] = React.useState(
    contactData ? contactData.page_body : "",
  )
  const [headingText, setHeadingText] = React.useState(
    liveData ? liveData[0].heading : "",
  )
  const [subheadText, setSubheadText] = React.useState(
    liveData ? liveData[0].subheading : "",
  )

  const toast = useToast()

  const handleEdit = () => {
    setButtonLoading(true)
    updateLive({
      heading: headingText,
      subheading: subheadText,
      name: "main",
      is_live: false,
    })
      .unwrap()
      .then(() =>
        toast({
          title: "Edit Successful",
          description: "Header Information Saved",
          status: "success",
        }),
      )
      .catch(() => {
        toast({
          title: "Error",
          description: "Error Saving Header Information",
          status: "error",
          isClosable: true,
        })
      })
    updatePage({
      title: "contact",
      page_body: contactText,
      page_name: "contact",
      last_updated: moment().format("YYYY-MM-DDThh:mm:ss"),
    })
      .unwrap()
      .then(() => {
        toast({
          title: "Edit Successful",
          description: "Contact Information Saved",
          status: "success",
        })
      })
      .catch(() => {
        toast({
          title: "Error",
          description: "Error Saving Contact Information",
          status: "error",
          isClosable: true,
        })
      })
    updatePage({
      title: "schedule",
      page_body: scheduleText,
      page_name: "schedule",
      last_updated: moment().format("YYYY-MM-DDThh:mm:ss"),
    })
      .unwrap()
      .then(() => {
        toast({
          title: "Edit Successful",
          description: "Schedule Information Saved",
          status: "success",
        })
      })
      .catch(() => {
        toast({
          title: "Error",
          description: "Error Saving Schedule Information",
          status: "error",
          isClosable: true,
        })
      })
      .finally(() => props.setIsOpen(false))
  }

  return (
    <ModalContent>
      <ModalHeader>Edit Page Text</ModalHeader>
      <Skeleton isLoaded={true}>
        <ModalBody>
          <Box marginBlockStart="10px">
            <Text fontSize="sm" as="b">
              Heading
            </Text>
            <Input
              aria-label="about text area"
              placeholder="Heading"
              value={headingText}
              onChange={(e) => setHeadingText(e.target.value)}
            />
          </Box>
          <Box marginBlockStart="10px">
            <Text fontSize="sm" as="b">
              Subheading
            </Text>
            <Input
              aria-label="sub heading text area"
              placeholder="Heading"
              value={subheadText}
              onChange={(e) => setSubheadText(e.target.value)}
            />
          </Box>
          <Divider colorScheme="blue" />
          <Box marginBlockStart="10px">
            <Text fontSize="sm" as="b">
              Schedule
            </Text>
            <Textarea
              height="35px"
              aria-label="schedule text area"
              placeholder="About"
              value={scheduleText}
              onChange={(e) => setScheduleText(e.target.value)}
            />
          </Box>
          <Box marginBlockStart="10px">
            <Text fontSize="sm" as="b">
              Contact
            </Text>
            <Textarea
              aria-label="contact text area"
              placeholder="Contact"
              value={contactText}
              onChange={(e) => setContactText(e.target.value)}
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
      </Skeleton>
    </ModalContent>
  )
}

export default PageEditModal
