import React, { useState, useEffect } from "react";
import Box from "@material-ui/core/Box";
import { Alert } from "@material-ui/lab";
import { Loading } from "./Loading";
import {
  useGetMessagesQuery,
  GetMessagesDocument,
  useMessageSentSubscription,
} from "../generated/graphql";
import { useUser } from "../providers/user";

interface FeedProps {
  user: any;
  data: any;
}

const Feed: React.FC<FeedProps> = ({ data, user }) => {
  const [state, setState] = useState(data);
  useEffect(() => {
    setState(data);
  }, [data]);
  return (
    <Box>
      {state.map((message) => {
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
  const { loading, data } = useGetMessagesQuery();
  const { data: newData } = useMessageSentSubscription();

  // const { error } = useMessageSentSubscription({
  //   onSubscriptionData: ({ client, subscriptionData }) => {
  //     console.log({ subscriptionData });
  //     // Client is an instance of Apollo client.
  //     // It has cache proxy method used in the `update` option in mutations.
  //     // Please look at: https://www.apollographql.com/docs/react/essentials/mutations#update
  //     const cachedMessages = client.readQuery({
  //       query: GetMessagesDocument,
  //     });
  //     console.log({ cachedMessages });
  //     const updatedData = cachedMessages.getMessages.concat(
  //       subscriptionData.data.messageSent
  //     );
  //     console.log({ updatedData });
  //     client.writeQuery({
  //       query: GetMessagesDocument,
  //       data: updatedData,
  //     });
  //   },
  // });
  // console.log({ loading });
  // console.log({ data });
  console.log({ newData });

  if (loading) {
    return <Loading />;
  }
  const getMessages = () => {
    if (newData) {
      return [...data.getMessages, newData.messageSent];
    }
    return data.getMessages;
  };
  const messages = getMessages();

  return <Feed user={user} data={messages} />;
};

export default ChatFeed;
