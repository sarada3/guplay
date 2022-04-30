import { useState, createContext, Dispatch } from "react";

type UserType = {
  name: string;
  thumbnail: string;
  totalScore: number;
};

interface IUserContext {
  user: UserType;
  dispatchUser?: Dispatch<React.SetStateAction<UserType>>;
}

const initialUserState: IUserContext = {
  user: {
    name: "",
    thumbnail: "",
    totalScore: 0,
  },
};

export const UserContext = createContext<IUserContext>(initialUserState);

// provider
export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserType>(initialUserState.user);

  return (
    <UserContext.Provider value={{ user, dispatchUser: setUser }}>
      {children}
    </UserContext.Provider>
  );
};
