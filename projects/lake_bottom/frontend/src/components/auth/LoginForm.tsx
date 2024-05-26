import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import * as React from "react";

import { useTypedDispatch } from "../../store";
import { logIn } from "../../services/loginSlice";

interface Props {
  onClose: () => void;
}

const LoginForm: React.FC<Props> = ({ onClose }): JSX.Element => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errMsg, setErrMsg] = React.useState("");
  const dispatch = useTypedDispatch();
  const formIsInvalid = (): boolean => {
    return false;
  };
  const handleLogin = () => {
    dispatch(logIn({ username: username, password: password }));
  };
  return (
    <Box>
      <FormControl isInvalid={formIsInvalid()}>
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
        <FormErrorMessage>{errMsg}</FormErrorMessage>
        <Button
          justifySelf="right"
          colorScheme="green"
          variant="outline"
          onClick={() => handleLogin()}
        >
          Log In
        </Button>
      </FormControl>
    </Box>
  );
};

export default LoginForm;
