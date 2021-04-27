import React from "react";
import Box from "@material-ui/core/Box";
import { Loading } from "./Loading";
import { useGetMessagesQuery } from "../generated/graphql";

const ChatFeed: React.FC = () => {
  const { data, loading } = useGetMessagesQuery();

  if (loading) {
    return <Loading />;
  }

  return (
    <Box>
      {data.getMessages.map((message) => {
        return <div key={message._id}>{message.body}</div>;
      })}
    </Box>
  );
};

export default ChatFeed;
