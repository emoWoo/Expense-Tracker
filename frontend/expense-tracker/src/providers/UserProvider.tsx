import { useState } from "react";
import { UserContext } from "../contexts/UserContext";

type Props = {
  children: React.ReactNode;
};

const UserProvider = ({ children }: Props) => {
  const [user, setUser] = useState<object>({});

  const updateUser = (userData: object) => {
    setUser(userData);
  };

  const clearUser = () => {
    setUser({});
  };

  return (
    <UserContext.Provider value={{ user, updateUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
