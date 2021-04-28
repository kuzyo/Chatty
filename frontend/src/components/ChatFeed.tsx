import React from "react";
import Box from "@material-ui/core/Box";
import { Alert } from "@material-ui/lab";
import { Loading } from "./Loading";
import { useGetMessagesQuery } from "../generated/graphql";
import { useUser } from "../providers/user";

const ChatFeed: React.FC = () => {
  const { data, loading } = useGetMessagesQuery();
  const { user } = useUser();

  if (loading) {
    return <Loading />;
  }

  return (
    <Box>
      {data.getMessages.map((message) => {
        const isMineMessage = message.from === user._id;
        return (
          <Box
            key={message._id}
            mb={1}
            display="flex"
            justifyContent={isMineMessage ? "flex-end" : "flex-start"}
          >
            <Box width="50%">
              <Alert
                icon={<div />}
                severity={isMineMessage ? "success" : "info"}
              >
                {message.body}
              </Alert>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default ChatFeed;
