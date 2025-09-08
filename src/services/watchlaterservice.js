import api from "../api/axios";
export const WatchlaterAPI = {
  addVideoToWatchLater: async (videoID) => {
    try {
      await api.post(`/watchlater/a/${videoID}`);
    } catch (error) {
      console.error("Error adding video to watch later:", error);
      throw error;
    }
  },
  removeVideofromWatchLater: async (videoID) => {
    try {
      await api.post(`/watchlater/r/${videoID}`);
    } catch (error) {
      console.error("Error adding video to watch later:", error);
      throw error;
    }
  },
  fetchWatchlater: async () => {
    try {
      const response = await api.get(`/watchlater/videos`);
      return response.data;
    } catch (error) {
      console.error("Error adding video to watch later:", error);
      throw error;
    }
  },
};
