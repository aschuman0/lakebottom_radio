import * as React from "react";
import { Heading, Text, Box } from "@chakra-ui/react";
import { Show } from "../../services/lakebottomTypes";
import { Link } from "react-router-dom";
interface Props {
  show: Show;
}

const ShowListItem: React.FC<Props> = ({ show }) => {
  return (
    <Box paddingBlockEnd="1vh">
      <Link to={`show/${show.slug}`}>
        <Heading size="large">{show.name}</Heading>
      </Link>
      <Text paddingInlineStart="1vh">{show.about}</Text>
    </Box>
  );
};

export default ShowListItem;
