import React, { useEffect } from "react";
import { ApolloProvider } from "@apollo/client";
import { ThemeProvider } from "styled-components";
import {
  StylesProvider,
  ThemeProvider as MuiThemeProvider,
  createMuiTheme,
} from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import { useApollo } from "../src/lib/apolloClient";
import { UserProvider } from "../src/providers/user";

type PageProps = {
  initialApolloState: null;
};
type AppProps = {
  Component: typeof React.Component;
  pageProps: PageProps;
};

const theme = createMuiTheme();

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  const apolloClient = useApollo(pageProps.initialApolloState);

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <ApolloProvider client={apolloClient}>
      <StylesProvider injectFirst>
        <MuiThemeProvider theme={theme}>
          <ThemeProvider theme={theme}>
            <UserProvider>
              <Component {...pageProps} />
              <CssBaseline />
            </UserProvider>
          </ThemeProvider>
        </MuiThemeProvider>
      </StylesProvider>
    </ApolloProvider>
  );
};

export default App;
