import { createContext } from "react";

type UserContextType = {
  user: object;
  updateUser: (userData: object) => void;
  clearUser: () => void;
};

export const UserContext = createContext<UserContextType | null>(null);
