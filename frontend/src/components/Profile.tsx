import React from "react";
import Card from "@material-ui/core/Card";
import styled from "styled-components";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useLogoutMutation } from "../generated/graphql";
import { useUser } from "../providers/user";
import gql from "graphql-tag";

const GET_CURRENT_USER = gql`
  query getCurrentUser {
    currentUser {
      _id
    }
  }
`;

const Profile: React.FC = () => {
  const { user } = useUser();
  const [logoutMutation, { loading }] = useLogoutMutation({
    refetchQueries: [{ query: GET_CURRENT_USER }],
  });

  return (
    <Box mb={2} flex="0">
      <Card>
        <CardContent>
          <Box textAlign="center">
            <Box display="flex" justifyContent="center" mb={1}>
              <StyledAvatar src={user.image} />
            </Box>
            <Typography variant="h6">{user.name}</Typography>
            <Box display="flex" justifyContent="center" mt={2}>
              <Button
                variant="contained"
                color="secondary"
                disabled={loading}
                onClick={() => logoutMutation()}
              >
                Logout
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

const StyledAvatar = styled(Avatar)`
  && {
    height: ${({ theme }) => theme.spacing(6)}px;
    width: ${({ theme }) => theme.spacing(6)}px;
  }
`;

export default Profile;
