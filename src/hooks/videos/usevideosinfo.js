import { UseUserContext } from "../../context/AuthContext";
import { useNotification } from "../../context/notificationcontext";
import { useState, useCallback } from "react";
import { videosAPI } from "../../services/videosservice";

export const useVideoInfo = (videoId, ownerId) => {
  const { Authenticated } = UseUserContext();
  const { showNotification } = useNotification();

  // Manage all interactive state here
  const [likes, setLikes] = useState(0);
  const [subs, setSubs] = useState(0);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchInteractionData = useCallback(async () => {
    if (!videoId || !ownerId) return;

    setLoading(true);
    try {
      // Get video likes first
      const videoResponse = await videosAPI.getVideoByID(videoId);
      setLikes(videoResponse.video.likes);

      // Get subscribers
      const subscribers = await videosAPI.getChannelsSubscribers(ownerId);
      setSubs(subscribers.Number_Of_Subscribers);

      if (Authenticated) {
        const [subscriptionData, likeStatus] = await Promise.allSettled([
          fetchSubscriptionData(ownerId),
          fetchLikeStatus(videoId),
        ]);

        addToWatchHistory(videoId).catch(console.error);
      }
    } catch (err) {
      console.error("Error fetching interaction data:", err);
    } finally {
      setLoading(false);
    }
  }, [videoId, ownerId, Authenticated]);

  const fetchSubscriptionData = useCallback(async (ownerId) => {
    try {
      const exists = await videosAPI.getSubscriptionStatus(ownerId);
      setIsSubscribed(exists.success);
    } catch (err) {
      console.error("Error fetching subscription status:", err);
    }
  }, []);

  const fetchLikeStatus = useCallback(
    async (videoId) => {
      if (!Authenticated || !videoId || !ownerId) return;
      try {
        const likeData = await videosAPI.getLikedStatus(videoId);
        setLiked(likeData.status === "liked");
        setDisliked(likeData.status === "disliked");
      } catch (err) {
        console.error("Error fetching like status:", err);
      }
    },
    [Authenticated, ownerId]
  );

  const addToWatchHistory = useCallback(
    async (videoId) => {
      if (!Authenticated || !videoId) return;
      try {
        await videosAPI.addVideoToWatchHistory(videoId);
      } catch (err) {
        console.error("Error adding to watch history:", err);
      }
    },
    [Authenticated]
  );

  // FIXED: Toggle like with proper authentication check and optimistic updates
  const toggleLike = useCallback(async () => {
    if (!Authenticated) {
      showNotification("Please login to like", false);
      return;
    }

    if (!videoId) return;

    // Store original state for potential revert
    const originalLiked = liked;
    const originalLikes = likes;
    const originalDisliked = disliked;

    try {
      // Optimistic update - update UI immediately
      if (!liked) {
        setLiked(true);
        setLikes((prev) => prev + i1);
        setDisliked(false); // Remove dislike if exists
        showNotification("Video liked", true);
      } else {
        setLiked(false);
        showNotification("Video unliked", true);
      }
      // Make API call
      await videosAPI.toggleLike(videoId);
    } catch (err) {
      // Revert optimistic updates on error
      setLiked(originalLiked);
      setLikes(originalLikes);
      setDisliked(originalDisliked);
      showNotification("Error updating like status", false);
      console.error("Like toggle error:", err);
    }
  }, [liked, likes, disliked, Authenticated, videoId, showNotification]);

  const toggleDislike = useCallback(async () => {
    if (!Authenticated) {
      showNotification("Please login to dislike", false);
      return;
    }

    if (!videoId) return;

    // Store original state for potential revert
    const originalLiked = liked;
    const originalLikes = likes;
    const originalDisliked = disliked;

    try {
      // Optimistic update
      if (!disliked) {
        setDisliked(true);
        if (liked) {
          setLiked(false);
          setLikes((prev) => Math.max(0, prev - 1));
        }
        showNotification("Viddeo disliked", true);
      } else {
        setDisliked(false);
        showNotification("Dislike removed", true);
      }

      await videosAPI.toggleDislike(videoId);
    } catch (err) {
      // Revert optimistic updates on error
      setLiked(originalLiked);
      setLikes(originalLikes);
      setDisliked(originalDisliked);
      showNotification("Error updating dislike status", false);
      console.error("Dislike toggle error:", err);
    }
  }, [disliked, liked, likes, Authenticated, videoId, showNotification]);

  // FIXED: Toggle subscription with proper optimistic updates
  const toggleSubscription = useCallback(async () => {
    if (!Authenticated) {
      showNotification("Please login to subscribe", false);
      return;
    }

    if (!ownerId) return;

    // Store original state for potential revert
    const originalSubscribed = isSubscribed;
    const originalSubs = subs;

    try {
      // Optimistic update - update UI immediately
      const newSubscribed = !isSubscribed;
      setIsSubscribed(newSubscribed);
      setSubs((prev) => (newSubscribed ? prev + 1 : prev - 1));

      showNotification(newSubscribed ? "Subscribed!" : "Unsubscribed", true);

      // Make API call
      await videosAPI.toggleSubscription(ownerId);
    } catch (err) {
      // Revert optimistic updates on error
      setIsSubscribed(originalSubscribed);
      setSubs(originalSubs);
      showNotification("Error updating subscription", false);
      console.error("Subscription toggle error:", err);
    }
  }, [isSubscribed, subs, Authenticated, ownerId, showNotification]);

  return {
    likes,
    liked,
    disliked,
    subs,
    isSubscribed,
    loading,
    toggleLike,
    toggleDislike,
    toggleSubscription,
    fetchInteractionData,
  };
};
