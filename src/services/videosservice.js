import { video } from "../../../BillionTube-Backend/src/models/video.model";
import axios from "../api/axios";
import api from "../api/axios";

export const videosAPI = {
  getVideosForHome: async () => {
    try {
      const response = await api.get("/videos/getVideos");
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
  getTrendingVideos: async () => {
    try {
      const response = await api.get("/videos/trending");
      return response.data;
    } catch (error) {
      console.error("Error fetching home videos:", error);
      throw error;
    }
  },
  getAUsersVideo: async (userId) => {
    try {
      const response = await api.get(`/videos/uservideo/${userId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching User videos:", error);
      throw error;
    }
  },
  getVideoByID: async (videoId) => {
    try {
      const response = await api.get(`/videos/${videoId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching video:", error);
      throw error;
    }
  },
  deleteAVideo: async (videoId) => {
    try {
      const response = await api.delete(`/videos/${videoId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching home videos:", error);
      throw error;
    }
  },
  updateAVideo: async (videoId, form) => {
    try {
      const response = await api.patch(`/videos/${videoId}`, form);
      return response.data;
    } catch (error) {
      console.error("Error updating video details:", error);
      throw error;
    }
  },
  togglePublishStatus: async (videoId) => {
    try {
      const response = await api.patch(`/videos/toggle/publish/${videoId}`);
      return response.data;
    } catch (error) {
      console.error("Error toggling publish status:", error);
      throw error;
    }
  },

  uploadAVideo: async (form) => {
    try {
      await api.post("/videos", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    } catch (error) {
      console.error("Error uploading video:", error);
      throw error;
    }
  },
  addVideoToWatchHistory: async (videoID) => {
    try {
      await api.post(`watchhistory/a/${videoID}`);
    } catch (error) {
      console.error("Error uploading video:", error);
      throw error;
    }
  },
  getLikedStatus: async (videoId) => {
    try {
      const response = await api.get(`/likes/status/${videoId}`);
      return response.data;
      k;
    } catch (error) {
      console.error("Error fetching like status:", error);
      throw error;
    }
  },

  getSubscriptionStatus: async (ownerId) => {
    try {
      const response = await api.get(`/subscriptions/c/subscribed/${ownerId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching subscription status:", error);
      throw error;
    }
  },
  getChannelsSubscribers: async (ownerId) => {
    try {
      const response = await api.get(`/subscriptions/c/${ownerId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching channel subscriptions:", error);
      throw error;
      3;
    }
  },
  toggleLike: async (videoId) => {
    try {
      await api.post(`/likes/v/l/${videoId}`);
    } catch (error) {
      console.error("Error toggling like status:", error);
      throw error;
    }
  },
  toggleDislike: async (videoId) => {
    try {
      await api.post(`/likes/v/d/${videoId}`);
    } catch (error) {
      console.error("Error toggling dislike status:", error);
      throw error;
    }
  },
  toggleSubscription: async (ownerId) => {
    try {
      await api.post(`/subscriptions/c/${ownerId}`);
    } catch (error) {
      console.error("Error toggling subscription status:", error);
      throw error;
    }
  },

  fetchTrendingvideos: async () => {
    try {
      const response = await api.get("/videos/trending");
      return response.data;
    } catch (error) {
      console.error("Error fetching trending videos:", error);
      throw error;
    }
  },
  getLikedVideos: async () => {
    try {
      const response = await api.get("/likes/videos");
      return response.data;
    } catch (error) {
      console.error("Error fetching trending videos:", error);
      throw error;
    }
  },
};
