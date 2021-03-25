import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Profile from "../Profile";
import Users from "../Users";
import Chat from "../Chat";

const ChatScreen: React.FC = () => {
  return (
    <Grid container spacing={3} style={{ height: "100%" }}>
      <Grid item xs={4}>
        <Box display="flex" flexDirection="column">
          <Profile />
          <Users />
        </Box>
      </Grid>
      <Grid item xs={8}>
        <Paper style={{ height: "100%" }}>
          <Chat />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ChatScreen;
