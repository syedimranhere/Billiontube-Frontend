import { videosAPI } from "../../services/videosservice";
import { useCallback, useEffect, useState } from "react";
import { UseUserContext } from "../../context/AuthContext";
import { useNotification } from "../../context/notificationcontext";

export const useVideoData = (videoId) => {
  const [videoData, setVideoData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [ownerId, setOwnerId] = useState(null);
  const [likes, Setlikes] = useState(0);
  const { Authenticated } = UseUserContext();
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { showNotification } = useNotification();
  const [subs, setSubs] = useState(0);
  const fetchVideosAndVideoData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await videosAPI.getVideoByID(videoId);
      setVideoData(response.video);

      const channelOwnerId = response.video.owner._id;
      setOwnerId(channelOwnerId);
      Setlikes(response.video.likes);

      const subscribers = await videosAPI.getChannelsSubscribers(
        channelOwnerId
      );
      setSubs(subscribers.Number_Of_Subscribers);

      if (Authenticated) {
        try {
          await fetchSubscriptionData(channelOwnerId);
        } catch (err) {
          console.error("Subscription fetch failed:", err);
        }

        try {
          await fetchLikeStatus(videoId);
        } catch (err) {
          console.error(" Like status fetch failed:", err);
        }

        addToWatchHistory(videoId).catch(console.error);
      }
    } catch (err) {
      console.error("Error fetching video data:", err);
      setError("Error fetching video data");
    } finally {
      setLoading(false);
    }
  }, [videoId, Authenticated]);
  useEffect(() => {
    fetchVideosAndVideoData();
  }, [fetchVideosAndVideoData]);

  const fetchSubscriptionData = useCallback(async (channelOwnerId) => {
    try {
      const exists = await videosAPI.getSubscriptionStatus(channelOwnerId);

      setIsSubscribed(exists.success);
    } catch (err) {
      console.error("Error fetching subscription status:", err);
    }
  }, []);

  const fetchLikeStatus = useCallback(
    async (videoId) => {
      try {
        const likeData = await videosAPI.getLikedStatus(videoId);

        setLiked(likeData.status === "liked");
        setDisliked(likeData.status === "disliked");
      } catch (err) {
        console.error("Error fetching like status:", err);
      }
    },
    [Authenticated]
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

  const toggleLike = useCallback(async () => {
    if (!Authenticated) {
      showNotification("Please login to like", false);
      return;
    }

    if (!videoId) return;

    const originalLiked = liked;
    const originalLikes = likes;
    const originalDisliked = disliked;

    try {
      // update UI immediately
      if (!liked) {
        setLiked(true);
        Setlikes((prev) => prev + 1);
        setDisliked(false); // Remove dislike if exists
        showNotification("Video liked", true);
      } else {
        setLiked(false);
        Setlikes((prev) => prev - 1);
        showNotification("Video unliked", true);
      }
      // Make API call
      await videosAPI.toggleLike(videoId);
    } catch (err) {
      // Revert optimistic updates on error
      setLiked(originalLiked);
      Setlikes(originalLikes);
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

    const originalLiked = liked;
    const originalLikes = likes;
    const originalDisliked = disliked;

    try {
      if (!disliked) {
        setDisliked(true);
        if (liked) {
          setLiked(false);
          Setlikes((prev) => Math.max(0, prev - 1));
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
      Setlikes(originalLikes);
      setDisliked(originalDisliked);
      showNotification("Error updating dislike status", false);
      console.error("Dislike toggle error:", err);
    }
  }, [disliked, liked, likes, Authenticated, videoId, showNotification]);

  const toggleSubscription = useCallback(async () => {
    if (!Authenticated) {
      showNotification("Please login to subscribe", false);
      return;
    }

    if (!ownerId) return;

    const originalSubscribed = isSubscribed;
    const originalSubs = subs;

    try {
      const newSubscribed = !isSubscribed;
      setIsSubscribed(newSubscribed);
      setSubs((prev) => (newSubscribed ? prev + 1 : prev - 1));

      showNotification(newSubscribed ? "Subscribed!" : "Unsubscribed", true);

      await videosAPI.toggleSubscription(ownerId);
    } catch (err) {
      setIsSubscribed(originalSubscribed);
      setSubs(originalSubs);
      showNotification("Error updating subscription", false);
      console.error("Subscription toggle error:", err);
    }
  }, [isSubscribed, subs, Authenticated, ownerId, showNotification]);

  return {
    videoData,
    loading,
    error,
    likes,
    liked,
    disliked,
    subs,
    isSubscribed,
    toggleLike,
    toggleDislike,
    toggleSubscription,
  };
};
