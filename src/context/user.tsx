import { useState, createContext } from "react";

import { IUser } from "../types";

interface IUserContext {
  user: IUser | null;
  dispatchUser?: (user: IUser) => void;
  resetUser?: () => void;
}

const initialUserState: IUserContext = {
  user: null,
};

export const UserContext = createContext<IUserContext>(initialUserState);

// provider
export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(initialUserState.user);
  const dispatchUser = (user: IUser) => {
    setUser({ ...user });
  };
  const resetUser = () => {
    setUser(null);
  };
  return (
    <UserContext.Provider value={{ user, dispatchUser, resetUser }}>
      {children}
    </UserContext.Provider>
  );
};
