import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useCreateMessageMutation } from "../generated/graphql";

const ChatField: React.FC = () => {
  const [message, setMessage] = useState("");
  const [createMessageMutation, { loading }] = useCreateMessageMutation({
    variables: {
      to: "123",
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
