import React from "react";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import ChatFeed from "./ChatFeed";
import ChatField from "./ChatField";

const Chat: React.FC = () => (
  <Box height="100%" display="flex" flexDirection="column">
    <Box flex="1" p={2}>
      <ChatFeed />
    </Box>
    <Divider />
    <Box p={2}>
      <ChatField />
    </Box>
  </Box>
);

export default Chat;
