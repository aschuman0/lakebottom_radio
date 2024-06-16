import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
  Icon,
} from "@chakra-ui/react"
import * as React from "react"
import { setAuthTokens, clearAuthTokens } from "axios-jwt"
import { axiosInstance } from "../../services/loginApi"
import { useTypedDispatch, useTypedSelector } from "../../store"
import { logIn, logOut } from "../../services/loginSlice"
import { AxiosError } from "axios"
import { FiUserX } from "react-icons/fi"
interface Props {
  onClose: () => void
}

const LoginForm: React.FC<Props> = ({ onClose }): JSX.Element => {
  const dispatch = useTypedDispatch()
  const loggedIn = useTypedSelector((state) => state.login.isLoggedIn)
  const toast = useToast()
  const [username, setUsername] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [isLoggingIn, setIsLoggingIn] = React.useState(false)

  const formIsInvalid = (): boolean => {
    return false
  }

  const handleLogin = () => {
    setIsLoggingIn(true)
    const response = axiosInstance
      .post("/api/token/", {
        username: username,
        password: password,
      })
      .then((response) => {
        setAuthTokens({
          accessToken: response.data.access,
          refreshToken: response.data.refresh,
        }).then()
        dispatch(logIn())
        onClose()
        toast({
          title: "Log In Successful",
          status: "success",
          duration: 2000,
        })
      })
      .catch((err: AxiosError) => {
        console.log(err)
        toast({
          title: `Could Not Log In: ${err.response?.statusText}`,
          status: "error",
          duration: 2000,
        })
        onClose()
      })
    setIsLoggingIn(false)
  }
  const handleLogout = () => {
    clearAuthTokens().then(() => {
      dispatch(logOut())
      onClose()
    })
  }

  return (
    <Box>
      <FormControl isInvalid={formIsInvalid()} justifyItems="right | end">
        {loggedIn ? (
          <Button
            variant="hollow"
            aria-label="Log out"
            onClick={() => handleLogout()}
            leftIcon={<Icon as={FiUserX} />}
          >
            Log Out
          </Button>
        ) : (
          <>
            <FormLabel>Log in to Lakebottom Radio</FormLabel>
            <Input
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
              mb="5px"
            />
            <Input
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              mb="5px"
            />
            <Box width="100%" marginBlock="1vh">
              <Button
                colorScheme="teal"
                aria-label="Log In"
                loadingText="Logging In..."
                isLoading={isLoggingIn}
                onClick={() => handleLogin()}
                float="right"
              >
                Log In
              </Button>
            </Box>
          </>
        )}
      </FormControl>
    </Box>
  )
}

export default LoginForm
