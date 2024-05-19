import * as React from "react";
import { Text, Box } from "@chakra-ui/react";

const Header: React.FC = () => {
  return (
      <Box
        w="100%"
        height="50px"
        backgroundColor="aquamarine"
        display="flex"
      >
        <Text
          alignSelf="start"
          color="black"
        >
          Header
        </Text>
      </Box>
  );
};

export default Header;
