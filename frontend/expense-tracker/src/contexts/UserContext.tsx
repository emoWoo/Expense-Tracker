import { createContext } from "react";

export interface User {
  id: string;
  fullName: string;
  email: string;
  profileImageUrl?: string;
}

type UserContextType = {
  user: User | null;
  updateUser: (userData: User) => void;
  clearUser: () => void;
};

export const UserContext = createContext<UserContextType | null>(null);
