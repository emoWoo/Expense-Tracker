import { request } from "../utils/request";
import { uploadImage } from "../utils/uploadImage";

export const authApi = {
  login: (data: object) => request.post("/auth/login", data),
  register: (data: object) => request.post("/auth/register", data),
  getuserInfo: () => request.get("/auth/userinfo"),
  uploadImage: (file: File) => uploadImage("/auth/upload-image", file),
};
