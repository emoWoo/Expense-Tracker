import axiosInstance from "./axiosInstance";

export const request = {
  get: (url: string, params: object = {}, config: object = {}) => {
    return axiosInstance.request({
      method: "get",
      url,
      params,
      ...config,
    });
  },
  post: (url: string, data: object = {}, config: object = {}) => {
    return axiosInstance.request({
      method: "post",
      url,
      data,
      ...config,
    });
  },
  put: (url: string, data: object = {}, config: object = {}) => {
    return axiosInstance.request({
      method: "put",
      url,
      data,
      ...config,
    });
  },
  delete: (url: string, params: object = {}, config: object = {}) => {
    return axiosInstance.request({
      method: "delete",
      url,
      params,
      ...config,
    });
  },
};
