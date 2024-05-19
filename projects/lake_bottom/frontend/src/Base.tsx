import * as React from "react";
import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

import Header from "./components/Header";

const Base: React.FC = () => {
  return (
    <>
      <Box
        w="100%"
        height="100vh"
        backgroundColor="whitesmoke"
      >
        <Header />
        <Outlet />
      </Box>
    </>
  );
};

export default Base;
