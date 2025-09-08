import { videosAPI } from "../../services/videosservice";
import { useCallback, useEffect, useState } from "react";

export const usevideoData = (videoId) => {
  const [videoData, setVideoData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchVideos = useCallback(async () => {
    try {
      const response = await videosAPI.getVideoByID(videoId);
      setVideoData(response.video);
    } catch (err) {
      setError("Error fetching video data");
    } finally {
      setLoading(false);
    }
  }, [videoId]);

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  return { videoData, loading, error };
};
