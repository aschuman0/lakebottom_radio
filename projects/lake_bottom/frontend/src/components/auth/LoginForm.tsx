import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/react"
import * as React from "react"

import { useTypedDispatch, useTypedSelector } from "../../store"
import { logIn, logOut } from "../../services/loginSlice"

interface Props {
  onClose: () => void
}

const LoginForm: React.FC<Props> = ({ onClose }): JSX.Element => {
  const [username, setUsername] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [isLoggedIn, setIsLoggedIn] = React.useState(
    useTypedSelector((state) => state.login.isLoggedIn),
  )
  const dispatch = useTypedDispatch()
  const formIsInvalid = (): boolean => {
    return false
  }
  const handleLogin = () => {
    dispatch(logIn({ username: username, password: password }))
    setIsLoggedIn(true)
  }
  const handleLogout = () => {
    dispatch(logOut())
    setIsLoggedIn(false)
  }
  console.log(`component | ${isLoggedIn}`)
  return (
    <Box alignItems="right">
      <FormControl isInvalid={formIsInvalid()}>
        {isLoggedIn ? (
          <Button
            alignSelf="right"
            colorScheme="green"
            onClick={() => handleLogout()}
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
              alignSelf="right"
              colorScheme="green"
              variant="outline"
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
