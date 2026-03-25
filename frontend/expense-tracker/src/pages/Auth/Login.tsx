import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../components/layouts/AuthLayout";
import Input from "../../components/Input/Input";
import { validateEmail } from "../../utils/helper";
import { useContext, useState } from "react";
import { authApi } from "../../api/auth";
import toast from "react-hot-toast";
import axios from "axios";
import { UserContext } from "../../contexts/UserContext";

const Login = () => {
  const [email, setEmail] = useState("abc@wyl.com");
  const [password, setPassword] = useState("551100");
  const [error, setError] = useState("");

  const { updateUser } = useContext(UserContext)!;

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email) {
      setError("请输入邮箱地址！");
      return;
    }

    if (!validateEmail(email)) {
      setError("请输入正确的邮箱地址！");
      return;
    }

    if (!password) {
      setError("请输入密码！");
      return;
    }

    setError("");

    try {
      const res = await toast.promise(authApi.login({ email, password }), {
        loading: "正在登录...",
        success: "登录成功！",
      });

      const { token, user } = res.data;
      updateUser(user);
      localStorage.setItem("token", token);
      navigate("/dashboard", { replace: true });
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const message =
          (error.response?.data as { message?: string } | undefined)?.message ||
          "登录失败，请检查你的邮箱和密码！";
        toast.error(message);
      } else {
        setError("登录失败，请稍后重试！");
        toast.error("登录失败，请稍后重试！");
      }
    }
  };
  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center ">
        <h1 className="text-xl font-semibold text-black">欢迎回来！</h1>
        <p className="text-xs text-slate-700 mt-1.25 mb-6">
          请输入您的账户信息以登录。
        </p>

        <form onSubmit={handleLogin}>
          <Input
            label="这是你的邮箱"
            type="text"
            placeholder="输入你的邮箱！"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="这是你的密码"
            type="password"
            placeholder="输入你的密码"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* todo show the errormessage when login failed */}
          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
          <button type="submit" className="btn-primary">
            登录
          </button>
          <p className="text-[13px] text-slate-800 mt-3">
            没有账号？{" "}
            <Link
              to="/signup"
              replace
              className="font-medium text-primary underline"
            >
              注册
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;

<style></style>;
