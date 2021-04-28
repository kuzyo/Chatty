import React, { useState } from "react";
import { useRouter } from "next/router";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useCreateMessageMutation } from "../generated/graphql";

const ChatField: React.FC = () => {
  const { query } = useRouter();
  const [message, setMessage] = useState("");

  const userId = typeof query.userId === "string" ? query.userId : null;

  const [createMessageMutation, { loading }] = useCreateMessageMutation({
    variables: {
      to: userId,
      body: message,
    },
  });

  const handleSent = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    await createMessageMutation();
    setMessage("");
  };

  const isDisabled = !Boolean(message.length) || loading;

  return (
    <form onSubmit={handleSent}>
      <Box display="flex" alignItems="center">
        <Box flex="1">
          <TextField
            fullWidth
            value={message}
            variant="outlined"
            color="primary"
            placeholder="Type your message..."
            onChange={(e) => setMessage(e.target.value)}
          />
        </Box>
        <Box pl={2}>
          <Button
            type="submit"
            color="primary"
            variant="contained"
            disabled={isDisabled}
          >
            Sent
          </Button>
        </Box>
      </Box>
    </form>
  );
};

export default ChatField;
