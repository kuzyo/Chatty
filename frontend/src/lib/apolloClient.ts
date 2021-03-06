/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { useMemo } from "react";
import { ApolloClient, HttpLink, InMemoryCache, split } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/client/link/ws";
import { BACKEND_URL, WS_URL } from "./config";

let apolloClient: any;

interface Definintion {
  kind: string;
  operation?: string;
}

const wsLink = process.browser
  ? new WebSocketLink({
      // if you instantiate in the server, the error will be thrown
      uri: `ws://localhost:4000/subscriptions`,
      options: {
        reconnect: true,
      },
    })
  : null;

const httplink = new HttpLink({
  uri: "http://localhost:4000/graphql",
  credentials: "include",
});

const link = process.browser
  ? split(
      //only create the split in the browser
      // split based on operation type
      ({ query }) => {
        const { kind, operation }: Definintion = getMainDefinition(query);
        return kind === "OperationDefinition" && operation === "subscription";
      },
      wsLink,
      httplink
    )
  : httplink;

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link,
    cache: new InMemoryCache(),
  });
}

export function initializeApollo(initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();
    // Restore the cache using the data passed from getStaticProps/getServerSideProps
    // combined with the existing cached data
    _apolloClient.cache.restore({ ...existingCache, ...initialState });
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === "undefined") return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;
  return _apolloClient;
}

export function useApollo(initialState: any) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}
