import * as React from "react";
import { Text, Box, Skeleton, Heading, Divider } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

import { useGetShowDetailQuery } from "../../services/lakebottomApi";

const ShowDetail: React.FC = () => {
  const { id } = useParams();
  if (!id) {
    return <Heading size="lg">No ID Provided</Heading>;
  }
  const { data, isLoading } = useGetShowDetailQuery(id);

  return (
    <Box w="100%">
      <Skeleton isLoaded={!isLoading}>
        {data && (
          <>
            <Heading size="lg" marginBlockEnd="1vh">
              {data.name}
            </Heading>
            <Text marginBlockEnd="1vh">{data.about}</Text>
            <Divider marginBlockEnd="2vh" />
            <Heading size="large">Playlist:</Heading>
            {data.songs.map((song) => {
              return (
                <Box>
                  <Text>{`${song.artist} - ${song.title} from ${song.album}`}</Text>
                </Box>
              );
            })}
          </>
        )}
      </Skeleton>
    </Box>
  );
};

export default ShowDetail;
