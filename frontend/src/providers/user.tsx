import React from "react";
import { useUserQuery, User } from "../generated/graphql";
import { FullPageLoading } from "../components/Loading";

type Props = unknown;

type UserProvider = {
  user: User | null;
};

const UserContext = React.createContext<UserProvider>({ user: null });

const UserProvider: React.FC<Props> = (props) => {
  const { data, loading } = useUserQuery();

  if (loading) {
    return <FullPageLoading />;
  }

  return (
    <UserContext.Provider value={{ user: data?.currentUser }} {...props} />
  );
};

const useUser = (): UserProvider => React.useContext(UserContext);

export { UserProvider, useUser };
