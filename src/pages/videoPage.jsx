import { useParams } from "react-router-dom";
import { useState } from "react";
import { useCallback, useEffect } from "react";
import VideoCard from "../components/cards&buttons/videoCard";
import CommentsSection from "../components/CommentsSection";
import { Link } from "react-router-dom";
import { UseUserContext } from "../context/AuthContext"
import { useNotification } from "../context/notificationcontext";
import { EarthLock, ThumbsDown, ThumbsUp, View } from 'lucide-react';
import UseVideoControls from "../hooks/videos/usevideoscontrols";
import { timeAgo, formatTime, formatViews } from "../utils/timeago";
import VideoPageLoader from "../components/loaders/videopageloader";
import { videosAPI } from "../services/videosservice";
import axios from "../api/axios";

const VideoPage = () => {


    const { videoId } = useParams();
    const [videoData, setVideoData] = useState(null);
    const [suggestedVideos, setSuggestedVideos] = useState(["imran"]);

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

    useEffect(() => {
        setLoading(true)
        const fetchVideosAndVideoData = async () => {
            try {
                const response = await videosAPI.getVideoByID(videoId);
                setVideoData(response.video);

                const channelOwnerId = response.video.owner._id;
                setOwnerId(channelOwnerId);
                Setlikes(response.video.likes);
                const exists = await videosAPI.getSubscriptionStatus(channelOwnerId);
                setIsSubscribed(exists.success);
                const likeData = await videosAPI.getLikedStatus(videoId);
                setLiked(likeData.status === "liked");
                setDisliked(likeData.status === "disliked");

                const subscribers = await videosAPI.getChannelsSubscribers(
                    channelOwnerId
                );
                setSubs(subscribers.Number_Of_Subscribers);
                getSuggestedVideos()
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
        }
        fetchVideosAndVideoData();
    }, [videoId]);
    const getSuggestedVideos = useCallback(async () => {
        try {

            const videos = await axios.get("/videos/suggestedVideos")

            setSuggestedVideos(videos.data.videos)

        }
        catch (err) {
            console.error("Error fetching suggested videos:", err);
        }
    }, [videoId]);




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


    const {
        videoRef,
        isPlaying,
        currentTime,
        duration,
        volume,
        isMuted,
        showControls,
        setIsPlaying,
        handleMouseEnter,
        handleMouseLeave,
        handleTimeUpdate,
        handleLoadedMetadata,
        togglePlay,
        handleSeek,
        handleVolumeChange,
        toggleMute,
        toggleFullscreen,
    } = UseVideoControls();


    if (loading) {
        return (
            <VideoPageLoader />
        );
    }
    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-black text-center px-4">
                <EarthLock className="w-20 h-20 text-orange-900 mb-6" />
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                    This video might have been removed or made private
                </h2>
                <p className="text-gray-400 text-sm sm:text-base max-w-md">
                    Please check the link or try again later.
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-lak text-white pt-11 sm:pt-12">
            <div className="mx-auto max-w-[1750px] px-4 sm:px-6 lg:px-8 py-4 grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_402px] gap-6">

                <main className="min-w-0 flex-1">


                    <div className="relative max-w-5xl mx-auto mt-6 rounded-md overflow-hidden shadow-2xl border border-neutral-800">
                        <div
                            className="relative group bg-black"
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            <div className="relative w-full aspect-video">
                                <video
                                    ref={videoRef}
                                    src={videoData.videofile}
                                    poster={videoData.thumbnail}
                                    className="absolute inset-0 w-full h-full object-contain bg-black"
                                    onTimeUpdate={handleTimeUpdate}
                                    onLoadedMetadata={handleLoadedMetadata}
                                    onPlay={() => setIsPlaying(true)}
                                    onPause={() => setIsPlaying(false)}
                                    onClick={togglePlay}
                                >
                                    Your browser does not support the video tag.
                                </video>

                                {/* Big Center Play Button (when paused) */}
                                {!isPlaying && (
                                    <button
                                        onClick={togglePlay}
                                        className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-10"
                                        aria-label="Play"
                                    >
                                        <div className="w-24 h-24 bg-indigo-600/90 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-indigo-500 transition-all duration-300 shadow-2xl border border-white/10">
                                            <svg className="w-12 h-12 text-white ml-2" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M8 5v14l11-7z" />
                                            </svg>
                                        </div>
                                    </button>
                                )}

                                <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/70 to-transparent p-4 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>


                                    <div className="mb-4 cursor-pointer group/progress" onClick={handleSeek}>
                                        <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden hover:h-3 transition-all">
                                            <div
                                                className="h-full bg-indigo-500 rounded-full relative transition-all duration-75"
                                                style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                                            >
                                                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-indigo-500 rounded-full shadow-lg opacity-0 group-hover/progress:opacity-100 transition-opacity" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Bottom Controls */}
                                    <div className="flex items-center justify-between text-white">
                                        <div className="flex items-center gap-4">


                                            <button onClick={togglePlay} className="p-2 hover:bg-white/20 rounded-full transition">
                                                {isPlaying ? (
                                                    <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M6 4h4v16H6zM14 4h4v16h-4z" />
                                                    </svg>
                                                ) : (
                                                    <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M8 5v14l11-7z" />
                                                    </svg>
                                                )}
                                            </button>


                                            <div className="flex items-center gap-3">
                                                <button onClick={toggleMute} className="p-2 hover:bg-white/20 rounded transition">
                                                    {(isMuted || volume === 0) ? (
                                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                                                            <path strokeLinecap="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                                                        </svg>
                                                    ) : (
                                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072M18.364 5.636a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                                                        </svg>
                                                    )}
                                                </button>
                                                <input
                                                    type="range"
                                                    min="0"
                                                    max="1"
                                                    step="0.05"
                                                    value={isMuted ? 0 : volume}
                                                    onChange={handleVolumeChange}
                                                    className="w-20 h-1 bg-white/30 rounded-lg cursor-pointer accent-indigo-500"
                                                />
                                            </div>


                                            <span className="text-sm font-medium">
                                                {formatTime(currentTime)} / {formatTime(duration)}
                                            </span>
                                        </div>


                                        <button onClick={toggleFullscreen} className="p-2 hover:bg-white/20 rounded transition">
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeWidth={2} d="M4 8V4m0 0h4m-4 0l5 5m11-1V4m0 0h-4m4 0l-5 5m-11 8v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {loading && (
                                <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-20">
                                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-indigo-500"></div>
                                </div>
                            )}
                        </div>
                    </div>



                    <section className="mt-8 max-w-5xl mx-auto px-4 sm:px-0 border-b py-6">

                        {/* Title */}
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
                            {videoData.title}
                        </h1>

                        {/* Views + Date + Channel */}
                        <div className="mt-4 flex flex-wrap items-center justify-between text-neutral-300">
                            <div className="flex items-center gap-3 text-sm sm:text-base">
                                <span className="text-xl font-bold text-white">{formatViews(videoData.views)}</span>
                                <View />
                                <span className="hidden sm:inline">|</span>
                                <span>{timeAgo(videoData.uploadDate)}</span>
                            </div>

                            <Link to={`/user-profile/${videoData.owner._id}`} className="flex items-center gap-3 hover:opacity-80 transition">
                                <img src={videoData.owner.avatar} alt="" className="w-10 h-10 rounded-full ring-2 ring-neutral-700" />
                                <div>
                                    <p className="font-semibold text-white">{videoData.owner.fullname}</p>
                                    <p className="text-sm text-neutral-400">{subs} subscribers</p>
                                </div>
                            </Link>
                        </div>


                        <div className="mt-6 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between bg-neutral-900/70 backdrop-blur border border-neutral-800 rounded-xl p-5">

                            {/* Subscribe */}
                            <button
                                onClick={() => !Authenticated ? showNotification("Please login to subscribe", false) : toggleSubscription()}
                                className={`px-10 py-3.5 rounded-full font-bold text-lg transition-all shadow-lg
          ${isSubscribed && Authenticated
                                        ? "bg-neutral-700 text-neutral-300 hover:bg-neutral-600"
                                        : "bg-red-600 text-white hover:bg-red-500 hover:shadow-red-500/40"
                                    }`}
                            >
                                {isSubscribed && Authenticated ? "Subscribed" : "Subscribe"}
                            </button>

                            {/* Like / Dislike */}
                            <div className="flex bg-neutral-800 rounded-full overflow-hidden border border-neutral-700">
                                <button
                                    onClick={toggleLike}
                                    disabled={!Authenticated}
                                    className={`flex items-center gap-2 px-7 py-3.5 font-medium transition-all
            ${!Authenticated && "opacity-50 cursor-not-allowed"}
            ${liked ? "bg-indigo-600 text-white" : "hover:bg-neutral-700 text-neutral-300"}
          `}
                                >
                                    <ThumbsUp />
                                    <span>{formatViews(likes)}</span>
                                </button>

                                <div className="w-px bg-neutral-700 h-full" />

                                <button
                                    onClick={toggleDislike}
                                    disabled={!Authenticated}
                                    className={`flex items-center gap-2 px-7 py-3.5 font-medium transition-all
            ${!Authenticated && "opacity-50 cursor-not-allowed"}
            ${disliked ? "bg-red-600 text-white" : "hover:bg-neutral-700 text-neutral-300"}
          `}
                                >
                                    <ThumbsDown />
                                    {videoData.dislikes > 0 && <span>{videoData.dislikes.toLocaleString()}</span>}
                                </button>
                            </div>
                        </div>


                        {videoData.description && (
                            <div className="mt-6 bg-neutral-900/60 backdrop-blur border border-neutral-800 rounded-xl p-6">
                                <h3 className="text-xl font-bold text-white mb-4">Description</h3>
                                <p className="text-neutral-300 text-base leading-relaxed whitespace-pre-line">
                                    {videoData.description}
                                </p>
                            </div>
                        )}

                    </section>


                    <section className="mt-10 max-w-5xl mx-auto px-4 sm:px-0">
                        <CommentsSection videoId={videoId} />
                    </section>

                </main>


                <aside className="min-w-0">
                    <div className="space-y-3 border-l border-neutral-800 pl-5">
                        {suggestedVideos.length > 0 ? (
                            suggestedVideos.map((vid) => (
                                <VideoCard key={vid._id}
                                    videoId={vid._id}
                                    views={vid.views}
                                    title={vid.title}
                                    thumbnail={vid.thumbnail}
                                    timeAgo={vid.timeAgo}
                                    timestamps={vid.uploadDate}
                                    // owner={vid.owner._id}
                                    duration={vid.duration}
                                    // channelName={vid.owner.fullname}
                                    // channelAvatar={vid.owner.avatar}
                                    description={vid.description} />
                            ))
                        ) : (
                            <div className="text-center py-8 rounded-xl border border-neutral-900 bg-neutral-900/40">
                                <p className="text-neutral-400">No suggested videos available</p>
                            </div>
                        )}
                    </div>

                </aside>
            </div >

            {/* Custom Styles */}
            < style > {`
                .volume-slider {
                    accent-color: #2563eb; /* Tailwind indigo-900 */
                }
                .volume-slider::-webkit-slider-thumb,
                .volume-slider::-moz-range-thumb {
                    height: 12px;
                    width: 12px;
                    border-radius: 50%;
                    background: #2563eb;
                    border: none;
                    cursor: pointer;
                }
                .volume-slider::-webkit-slider-track,
                .volume-slider::-moz-range-track {
                    background: rgba(255,255,255,0.25);
                    border-radius: 4px;
                }
            `}</style >

        </div >
    );
}


export default VideoPage;