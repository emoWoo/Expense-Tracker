import AuthLayout from "../../components/layouts/AuthLayout";
import Input from "../../components/Input/Input";
import ProfilePhotoSelect from "../../components/Input/ProfilePhotoSelect";
import { useState } from "react";
import { validateEmail } from "../../utils/helper";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!fullName) {
      setError("请输入名字！");
      return;
    }
    if (!email) {
      setError("请输入邮箱地址！");
      return;
    }

    if (!password) {
      setError("请输入密码！");
      return;
    }

    if (!validateEmail(email)) {
      setError("请输入正确的邮箱地址！");
      return;
    }

    setError("");
  };

  return (
    <AuthLayout>
      <div className="lg:w-full h-auto md:h-full flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">创建新的账户</h3>
        <p className="text-xs text-slate-700 mt-1.25 mb-6">请填写以下信息</p>

        <form onSubmit={handleSubmit}>
          <ProfilePhotoSelect image={profilePic} setImage={setProfilePic} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="这是你的名字"
              type="text"
              placeholder="输入你的名字！"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <Input
              label="这是你的邮箱"
              type="text"
              placeholder="输入你的邮箱！"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="col-span-2">
              <Input
                label="这是你的密码"
                type="password"
                placeholder="输入你的密码"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />{" "}
            </div>
          </div>

          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

          <button type="submit" className="btn-primary">
            提交
          </button>

          <p className="text-[13px] text-slate-800 mt-3">
            已经有账号了？{" "}
            <Link to="/login" className="font-medium text-primary underline">
              登录
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
