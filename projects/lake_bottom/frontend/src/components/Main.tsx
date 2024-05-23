import * as React from "react";
import { Heading, Text, Box, Divider, Skeleton } from "@chakra-ui/react";
import { Live } from "../services/lakebottomTypes";
import {
  useGetPageListQuery,
  useGetShowListQuery,
  useGetLiveListQuery,
} from "../services/lakebottomApi";

const Main: React.FC = () => {
  const { data: pageData, isLoading: pageIsLoading } = useGetPageListQuery();
  const { data: showData, isLoading: showIsLoading } = useGetShowListQuery();
  const { data: liveData, isLoading: liveIsLoading } = useGetLiveListQuery();

  const aboutPage = pageData?.find((page) => page.page_name === "about");
  const contactPage = pageData?.find((page) => page.page_name === "contact");
  const live = liveData ? liveData[0] : undefined;
  const showPreview = showData ? showData.slice(0, 4) : undefined;
  console.log(showData);
  return (
    <Skeleton isLoaded={!pageIsLoading && !showIsLoading && !liveIsLoading}>
      <Box w="100%">
        <Heading size="lg">
          {live ? live.heading : "Welcome to The Lakebottom"}
        </Heading>
        <Text>{aboutPage ? aboutPage.page_body : ""}</Text>
        <Text>{contactPage ? contactPage.page_body : ""}</Text>
        <Divider paddingBlockEnd="10vh" />
        <Heading size="lg">Recent Shows</Heading>
        {showPreview?.map((show) => {
          return <Text>{show.slug}</Text>;
        })}
      </Box>
    </Skeleton>
  );
};

export default Main;
