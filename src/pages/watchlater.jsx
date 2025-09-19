import { useState, useEffect, useCallback } from "react";
import {
    Clock,
    AlertTriangle
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import SmoothSkeletonLoader from "../components/loaders/videoskeleton";
import { WatchLaterCard } from "../components/cards&buttons/watchlatercard";
import { useNotification } from "../context/notificationcontext";
import { WatchlaterAPI } from "../services/watchlaterservice";
export const WatchLaterPage = () => {
    const navigate = useNavigate();
    const [videos, setVideos] = useState([]);
    const { showNotification } = useNotification();
    const [loading, setLoading] = useState(false);
    const [removeConfirm, setRemoveConfirm] = useState(null);

    useEffect(() => {
        const fetchWatchLaterVideos = async () => {
            try {
                setLoading(true);
                const response = await WatchlaterAPI.fetchWatchlater()
                if (response.data.videos.length === 0) {
                    setLoading(false);
                    return;

                }
                setVideos(response.data.videos);
                setLoading(false);

            } catch (error) {
                console.error('Error fetching watch later videos:', error);
                setLoading(false);

            }
        };
        fetchWatchLaterVideos();
    }, []);
    const handleRemoveFromWatchLater = useCallback(async (videoId) => {
        try {
            await WatchlaterAPI.removeVideofromWatchLater(videoId);
            setVideos(prevVideos => prevVideos.filter(video => video._id !== videoId));
            setRemoveConfirm(null);
            showNotification("Video removed from Watch Later!", true);

        } catch (error) {
            console.error('Error removing video from watch later:', error);
            showNotification('Failed to remove video from Watch Later', false);
        }
    }, []);

    const handleVideoClick = useCallback((video) => {

        navigate(`/video/${video._id}`);
        showNotification(`Opening: ${video.title}`, "success");

    }, []);

    if (loading) {
        return (
            <SmoothSkeletonLoader />

        );
    }

    return (
        <div className="min-h-screen bg-black pt-14 sm:pt-16">
            {removeConfirm && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-neutral-900 border border-gray-400 rounded-xl p-4 sm:p-6 max-w-md w-full">
                        <div className="flex items-center space-x-3 mb-4">
                            <AlertTriangle className="w-5 h-5 text-orange-400 flex-shrink-0" />
                            <h3 className="text-lg font-semibold text-white">Remove from Watch Later</h3>
                        </div>
                        <p className="text-gray-300 mb-6 text-sm">
                            Are you sure you want to remove this video from your Watch Later list?
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <button
                                onClick={() => handleRemoveFromWatchLater(removeConfirm)}
                                className="flex-1 px-4 py-2 bg-red-400 hover:bg-red-700 text-white rounded-lg transition-colors font-medium text-sm"
                            >
                                Remove Video
                            </button>
                            <button
                                onClick={() => setRemoveConfirm(null)}
                                className="flex-1 px-4 py-2 bg-neutral-700 hover:bg-neutral-600 text-white rounded-lg transition-colors text-sm"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="px-2 sm:px-3 md:px-4 py-3 sm:py-4">
                {/* Header */}
                <div className="mb-3 sm:mb-4">
                    <div className="flex items-center space-x-2 mb-2">
                        <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400 flex-shrink-0" />
                        <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-white">Watch Later</h1>
                    </div>
                    <p className="text-gray-400 text-sm">
                        {videos.length} video{videos.length !== 1 ? 's' : ''} saved for later
                    </p>
                </div>

                {/* Empty State */}
                {videos.length === 0 ? (
                    <div className="flex flex-col items-center justify-center flex-1 text-center px-4 py-12">
                        <Clock className="w-12 h-12 text-gray-600 mb-4" />
                        <h2 className="text-xl font-semibold text-white mb-3">No videos in Watch Later</h2>
                        <p className="text-gray-400 mb-6 max-w-md">
                            Save videos to watch them later. Your saved videos will appear here.
                        </p>
                        <button
                            onClick={() => window.history.back()}
                            className="px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors font-medium text-sm"
                        >
                            Browse Videos
                        </button>
                    </div>
                ) : (
                    /* Videos Grid */
                    <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 sm:gap-4">
                        {videos.map((video) => (
                            <WatchLaterCard
                                key={video._id}
                                video={video}
                                onRemoveClick={setRemoveConfirm}
                                onVideoClick={handleVideoClick}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
