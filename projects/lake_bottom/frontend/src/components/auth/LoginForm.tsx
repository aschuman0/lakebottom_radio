import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react"
import * as React from "react"
import { setAuthTokens, clearAuthTokens } from "axios-jwt"
import { axiosInstance } from "../../services/loginApi"
import { useTypedDispatch, useTypedSelector } from "../../store"
import { logIn, logOut } from "../../services/loginSlice"
import { CloseIcon } from "@chakra-ui/icons"
interface Props {
  onClose: () => void
}

export const logoutAction = async () => {
  clearAuthTokens()
  dispatch(logOut())
}

const LoginForm: React.FC<Props> = ({ onClose }): JSX.Element => {
  const dispatch = useTypedDispatch()
  const loggedIn = useTypedSelector((state) => state.login.isLoggedIn)
  const tosat = useToast()
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
      })
      .catch(
        (err) => console.log(err),
        // TODO - Failed login case. check status code
      )
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
      <FormControl isInvalid={formIsInvalid()}>
        {loggedIn ? (
          <Button
            variant="hollow"
            aria-label="Log out"
            onClick={() => handleLogout()}
            leftIcon={<CloseIcon />}
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
            <Button
              colorScheme="green"
              aria-label="Log In"
              loadingText="Logging In..."
              isLoading={isLoggingIn}
              onClick={() => handleLogin()}
            >
              Log In
            </Button>
          </>
        )}
      </FormControl>
    </Box>
  )
}

export default LoginForm
