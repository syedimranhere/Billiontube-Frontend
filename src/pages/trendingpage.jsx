import { useState, useEffect } from "react";
import { TrendingUp, Play, Eye, Clock, Calendar } from "lucide-react";
import VideoCard from "../components/cards&buttons/videoCard"
import { videosAPI } from "../services/videosservice";
import { Blueloader } from "../components/loaders/blueloader";
import { video } from "../../../BillionTube-Backend/src/models/video.model";
export default function TrendingPage() {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTrendingVideos = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await videosAPI.fetchTrendingvideos();
                setVideos(response.data);
            } catch (error) {
                console.error("Error fetching trending videos:", error);
                setError("ERROR FETCHING VIDEOS");
            } finally {
                setLoading(false);
            }
        };
        fetchTrendingVideos();
    }, []);

    if (loading) {
        return (
            <Blueloader />
        );
    }
    if (error) {
        return (
            <div className="min-h-screen bg-black text-white">
                <div className="container mx-auto px-6 py-8">
                    <div className="flex items-center space-x-3 mb-8">
                        <TrendingUp className="w-8 h-8 text-red-500" />
                        <h1 className="text-3xl font-bold">Trending Videos</h1>
                    </div>

                    <div className="text-center py-20">
                        <div className="text-red-400 text-lg mb-4">⚠ {error}</div>
                        <button
                            onClick={() => window.location.reload()}
                            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors"
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white">
            <div className="px-2 sm:px-3 md:px-4 py-3 sm:py-4">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 sm:mb-4 gap-2 sm:gap-0">
                    <div className="flex items-center space-x-2">
                        <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-red-500 flex-shrink-0" />
                        <h1 className="text-lg sm:text-xl md:text-2xl font-bold">
                            Trending Videos
                        </h1>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-400 text-sm">
                        <Play className="w-4 h-4 flex-shrink-0" />
                        <span>{Math.min(videos.length, 5)} videos</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 sm:gap-4">
                    {videos.slice(0, 5).map((vid) => (
                        <VideoCard key={vid._id}
                            videoId={vid._id}
                            views={vid.views}
                            title={vid.title}
                            thumbnail={vid.thumbnail}
                            timeAgo={vid.timeAgo}
                            timestamps={vid.uploadDate}
                            owner={vid.owner._id}
                            duration={vid.duration}
                            channelName={vid.owner.fullname}
                            channelAvatar={vid.owner.avatar}
                            description={vid.description}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}