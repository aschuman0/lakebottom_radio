import * as React from "react";
import { Heading, Text, Box, Skeleton } from "@chakra-ui/react";
import {
  useGetPageWithIdQuery,
  useGetShowListQuery,
  useGetLiveListQuery,
} from "../services/lakebottomApi";
import ShowListItem from "./ShowListItem";

const Main: React.FC = () => {
  const { data: aboutData, isLoading: aboutIsLoading } =
    useGetPageWithIdQuery("schedule");
  const { data: contactData, isLoading: contactIsLoading } =
    useGetPageWithIdQuery("contact");
  const { data: showData, isLoading: showIsLoading } = useGetShowListQuery();
  const { data: liveData, isLoading: liveIsLoading } = useGetLiveListQuery();

  const live = liveData ? liveData[0] : undefined;
  const showPreview = showData ? showData.slice(0, 5) : undefined;

  return (
    <Box w="100%">
      <Skeleton isLoaded={!liveIsLoading}>
        <Heading size="lg">
          {live ? live.heading : "Welcome to The Lakebottom"}
        </Heading>
      </Skeleton>
      <Skeleton isLoaded={!aboutIsLoading && !contactIsLoading}>
        <Text>{aboutData?.page_body}</Text>
        <Text paddingBlockEnd="10vh">{contactData?.page_body}</Text>
      </Skeleton>
      <Skeleton isLoaded={!showIsLoading}>
        <Heading size="lg">Recent Shows</Heading>
        <Box marginInlineStart="1vh" marginBlockStart="2vh">
          {showPreview?.map((show) => {
            return <ShowListItem show={show} />;
          })}
        </Box>
      </Skeleton>
    </Box>
  );
};

export default Main;
