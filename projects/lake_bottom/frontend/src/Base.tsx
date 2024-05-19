import * as React from "react";
import { Text, Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

import Header from "./components/Header";

const Base: React.FC = () => {
  return (
    <>
      <Header />
      <Box
        w="100%"
        height="100vh"
        backgroundColor="whitesmoke"
      >
        <Outlet />
      </Box>
    </>
  );
};

export default Base;
