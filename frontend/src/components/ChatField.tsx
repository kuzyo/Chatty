import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useCreateMessageMutation } from "../generated/graphql";

const ChatField: React.FC = () => {
  const [message, setMessage] = useState("");
  const [createMessageMutation, { data, loading }] = useCreateMessageMutation({
    variables: {
      to: "123",
      message,
    },
  });
  console.log({ data });

  const handleSent = async () => {
    await createMessageMutation();
    setMessage("");
  };

  return (
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
          color="primary"
          variant="contained"
          disabled={loading}
          onClick={handleSent}
        >
          Sent
        </Button>
      </Box>
    </Box>
  );
};

export default ChatField;
