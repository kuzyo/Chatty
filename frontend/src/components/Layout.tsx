import Head from "next/head";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";

const Layout: React.FC = ({ children }) => {
  return (
    <Box pt={4} pb={4} style={{ height: "100vh" }}>
      <Container maxWidth="md" style={{ height: "100%" }}>
        <Head>
          <title>Chatty</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        {children}
      </Container>
    </Box>
  );
};

export default Layout;
