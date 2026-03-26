const User = require("../models/User");
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

//注册用户
exports.registerUser = async (req, res) => {
  const { fullName, email, password, profileImageUrl } = req.body;

  if (!req.body || !fullName || !email || !password) {
    return res.status(400).json({ message: "请提供完整的注册信息！" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "邮箱已被注册！" });
    }

    const newUser = await User.create({
      fullName,
      email,
      password,
      profileImageUrl,
    });
    res.status(201).json({
      _id: newUser._id,
      newUser,
      token: generateToken(newUser._id),
    });
  } catch (error) {
    res.status(500).json({ message: "注册失败", error: error.message });
  }
};

//登录用户
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "请提供完整的登录信息！" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "用户不存在！" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "密码错误！" });
    }

    res.status(200).json({
      _id: user._id,
      user,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: "登录失败", error: error.message });
  }
};

//获取用户信息
exports.getUserInfo = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "用户不存在！" });
    }
    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "获取用户信息失败！", error: error.message });
  }
};

//上传用户头像
exports.uploadProfileImage = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "请上传一个文件！" });
  }
  const profileImageUrl = `${req.protocol}://${req.get("host")}/upload/${req.file.filename}`;
  res.status(200).json({ profileImageUrl });
};
