import { useState, useEffect } from 'react';
import VideoCard from "../components/cards&buttons/videoCard";
import { Heart, Play, Flame } from 'lucide-react';
import SmoothSkeletonLoader from '../components/loaders/videoskeleton';
import { videosAPI } from '../services/videosservice';
const LikedVideos = () => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                setLoading(true);
                const response = await videosAPI.getLikedVideos();
                setVideos(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching videos:', error);
                setLoading(false);
            }
        };
        fetchVideos();
    }, []);

    if (loading) return <SmoothSkeletonLoader />;

    return (
        <div className="min-h-screen bg-black text-white">
            <div className="px-2 sm:px-3 md:px-4 py-3 sm:py-4">
                {/* Header Section */}
                <div className="mb-3 sm:mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-red-500 fill-current flex-shrink-0" />
                            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-red-500">
                                Liked Videos
                            </h2>
                        </div>
                        <div className="flex items-center gap-2 text-gray-400 text-sm">
                            <Play className="w-4 h-4 flex-shrink-0" />
                            <span>{videos.length} video{videos.length !== 1 ? 's' : ''}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-2 bg-neutral-900 rounded-lg border border-neutral-800 text-sm">
                        <Flame className="w-4 h-4 text-orange-400 flex-shrink-0" />
                        <span className="text-gray-300">Your Collection</span>
                    </div>
                </div>

                {/* Videos Grid */}
                {videos.length > 0 ? (
                    <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 sm:gap-4">
                        {videos.map((vid) => (
                            <VideoCard
                                key={vid.video._id || vid.video.videoId}
                                videoId={vid.video._id || vid.video.videoId}
                                views={vid.video.views}
                                title={vid.video.title}
                                thumbnail={vid.video.thumbnail}
                                timeAgo={vid.video.timeAgo}
                                timestamps={vid.video.uploadDate}
                                duration={vid.video.duration}
                                channelName={vid.video.channelName || vid.video.creator}
                                channelAvatar={vid.video.owner.avatar}
                                description={vid.video.description}
                                owner={vid.video.owner._id}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center text-center px-4 py-12">
                        <Heart className="w-12 h-12 mb-4 text-gray-600" />
                        <h2 className="text-xl font-semibold text-white mb-2">No liked videos yet</h2>
                        <p className="text-gray-400 text-sm">Start exploring and hit the like button!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LikedVideos;
