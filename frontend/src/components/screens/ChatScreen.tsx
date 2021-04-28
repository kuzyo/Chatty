import React from "react";
import { useRouter } from "next/router";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Profile from "../Profile";
import Users from "../Users";
import Chat from "../Chat";

const ChatScreen: React.FC = () => {
  const { query } = useRouter();
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
          {query.userId ? (
            <Chat />
          ) : (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height={100}
            >
              <Typography color="textSecondary">
                Please select an user from users list to start a chat.
              </Typography>
            </Box>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ChatScreen;
