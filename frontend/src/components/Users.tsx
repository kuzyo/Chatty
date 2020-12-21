import React from "react";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import CardContent from "@material-ui/core/CardContent";
import { useGetUsersQuery } from "../generated/graphql";
import { Loading } from "./Loading";

const Users: React.FC = () => {
  const { data, loading } = useGetUsersQuery();
  if (loading) {
    return <Loading />;
  }
  return (
    <Box flex="1">
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Users
          </Typography>
          <Box overflow="auto" minHeight={320}>
            <List>
              {data.getUsers.map((user) => {
                return (
                  <ListItem key={user._id}>
                    <ListItemAvatar>
                      <Avatar src={user.image}></Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={user.name} />
                  </ListItem>
                );
              })}
            </List>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Users;
