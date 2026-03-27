import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "../api/auth";

export const useUserAuth = () => {
  const { user, updateUser, clearUser } = useContext(UserContext)!;
  const navigate = useNavigate();

  useEffect(() => {
    if (user) return;

    let isMounted = true;

    const fetchUserInfo = async () => {
      try {
        const res = await authApi.getuserInfo();
        if (isMounted && res.data) {
          updateUser(res.data);
        }
      } catch (error) {
        if (isMounted) {
          clearUser();
          navigate("/login", { replace: true });
        }
      }
    };

    fetchUserInfo();
    return () => {
      isMounted = false;
    };
  }, [user, updateUser, clearUser, navigate]);
};
