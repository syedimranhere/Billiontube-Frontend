import api from "../api/axios";
export const WatchhistoryAPI = {
  addVideoToHistory: async () => {
    try {
      await api.post(`/watchlater/a/${videoID}`);
    } catch (error) {
      console.error("ERROR", error);
      throw error;
    }
  },
  removeVideofromWatchHistory: async (videoID) => {
    try {
      await api.delete(`/watchhistory/d/${videoID}`);
    } catch (error) {
      console.error("ERROR", error);
      throw error;
    }
  },
  fetchWatchHistory: async () => {
    try {
      const response = await api.get(`/watchhistory/gethistory`);
      return response.data;
    } catch (error) {
      console.error("ERROR", error);
      throw error;
    }
  },
  clearWatchHistory: async () => {
    try {
      const response = await api.delete("/watchhistory/delete-all");
      return response.status;
    } catch (error) {
      console.error("ERROR", error);
      throw error;
    }
  },
};
