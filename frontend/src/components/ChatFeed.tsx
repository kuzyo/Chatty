import React, { useEffect } from "react";
import Box from "@material-ui/core/Box";
import { Alert } from "@material-ui/lab";
import { Loading } from "./Loading";
import {
  MessageSentDocument,
  GetMessagesDocument,
  User,
  Message,
} from "../generated/graphql";
import { useUser } from "../providers/user";
import { useQuery } from "@apollo/client";

interface FeedProps {
  user: User;
  data: Message[];
}

const Feed: React.FC<FeedProps> = ({ data, user }) => {
  return (
    <Box>
      {data.map((message) => {
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

const ChatFeed: React.FC = () => {
  const { user } = useUser();
  const { loading, data, subscribeToMore } = useQuery(GetMessagesDocument);

  useEffect(() => {
    subscribeToMore({
      document: MessageSentDocument,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newMessage = subscriptionData.data.messageSent;

        return {
          getMessages: [...prev.getMessages, newMessage],
        };
      },
    });
  }, []);

  if (loading) {
    return <Loading />;
  }

  return <Feed user={user} data={data.getMessages} />;
};

export default ChatFeed;
