import api from "../api/axios";
export const commentsAPI = {
  getComments: async (videoId) => {
    const response = await api.get(`/comments/${videoId}`);
    return response.data;
  },
  addComment: async (videoId, commentData) => {
    const response = await api.post(`/comments/${videoId}`, {
      content: commentData,
    });
    return response.data;
  },
  updateComment: async (commentId, commentData) => {
    const response = await api.patch(`/comments/${commentId}`, {
      content: commentData,
    });
    return response.data;
  },
  deleteComment: async (commentId) => {
    const response = await api.delete(`/comments/${commentId}`);
    return response.data;
  },
};
