import React from "react";
import { useUser } from "../src/providers/user";
import Layout from "../src/components/Layout";
import LoginScreen from "../src/components/screens/LoginScreen";
import ChatScreen from "../src/components/screens/ChatScreen";

const Home: React.FC = () => {
  const { user } = useUser();

  return <Layout>{user ? <ChatScreen /> : <LoginScreen />}</Layout>;
};

export default Home;
