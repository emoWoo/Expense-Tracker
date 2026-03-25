import { request } from "./request";

export const uploadImage = (url: string, file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  return request.post(url, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
