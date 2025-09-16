import axios from "../api/axios";
import api from "../api/axios";

export const usersAPI = {
  //login, register, delte acc, logout, chage pfpf, update info, change pass
  verifyAccess: async () => {
    const response = await api.get("/user/verifyAccess", {
      withCredentials: true,
    });
    return response.data;
  },
  login: async (credentials) => {
    const response = await axios.post("/user/login", credentials, {
      withCredentials: true,
    });
    return response.data;
  },
  logout: async () => {
    await api.post(
      "/user/logout",
      {},
      {
        withCredentials: true,
      }
    );
  },
  register: async (userData) => {
    const response = await api.post("/user/register", userData);
    return response.data;
  },
  uploadPFP: async (formDataToSend) => {
    const response = await api.post("/user/change-avatar", formDataToSend, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },
  changeUsername: async (data) => {
    await api.post("/user/update-username", {
      username: data,
    });
  },
  changeFullname: async (data) => {
    await api.post("/user/update-fullname", {
      fullname: data,
    });
  },
  changePassword: async (data) => {
    await api.post("/user/change-password", data);
  },
  getUser: async (id) => {
    const response = await api.get(`/user/id/${id}`);
    return response.data;
  },
  getUSerStats: async () => {
    const response = await api.get("/user/stats");
    return response.data;
  },
  deleteforALL: async (videoID) => {
    await api.delete(`/watchhistory/delete-for-all/${videoID}`);
    await api.delete(`/likes/delete-for-all/${videoID}`);
  },
  getMyvideos: async () => {
    const response = await api.get("/user/videos");

    return response.data;
  },
  editVideoDetails: async (videoID, formData) => {
    await api.patch(`/videos/${videoID}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  deleteAccount: async () => {
    await api.post("/user/deleteMe");
  },
};
