import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

const LoginScreen: React.FC = () => {
  return (
    <Box display="flex" justifyContent="center">
      <Box maxWidth={500}>
        <Card>
          <CardMedia
            image="/static/images/cards/contemplative-reptile.jpg"
            title="Contemplative Reptile"
          />
          <CardContent>
            <Box textAlign="center" mb={2}>
              <Typography gutterBottom variant="h5" component="h2">
                Chatty
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Explicabo repellendus iure possimus recusandae odit aspernatur,
                tenetur ipsa nam fugit neque aperiam pariatur, nobis cupiditate
                debitis ducimus quis, enim unde alias!
              </Typography>
            </Box>
            <Box display="flex" justifyContent="center">
              <Button
                href="http://localhost:4000/auth/google"
                variant="contained"
                color="primary"
              >
                Login with Google
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};
export default LoginScreen;
