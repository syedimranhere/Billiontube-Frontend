import api from "../api/axios";
export const SubscriptionsAPI = {
  fetchSubscriptions: async () => {
    try {
      const response = await api.get(`/subscriptions/u`);
      return response.data;
    } catch (error) {
      console.error("error fetching", error);
      throw error;
    }
  },
  removeSubscription: async (channelID) => {
    try {
      await api.delete(`/subscriptions/deletesubscription/${channelID}`);
    } catch (error) {
      console.error("Error adding video to watch later:", error);
      throw error;
    }
  },
  fetchWatchlater: async () => {
    try {
      const response = await api.post(`/watchlater/videos/${videoID}`);
      return response.data;
    } catch (error) {
      console.error("Error adding video to watch later:", error);
      throw error;
    }
  },
};
