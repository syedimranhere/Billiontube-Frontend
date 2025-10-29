import { useParams } from "react-router-dom";
import { useEffect, useState, useRef, use, memo } from "react";
import VideoCard from "../components/cards&buttons/videoCard";
import CommentsSection from "../components/CommentsSection";
import { Link } from "react-router-dom";
import { UseUserContext } from "../context/AuthContext"
import { useNotification } from "../context/notificationcontext";
import { EarthLock } from 'lucide-react';
import { useVideoData } from "../hooks/videos/useVideoData";
import UseVideoControls from "../hooks/videos/usevideoscontrols";
import { timeAgo, formatTime, formatViews } from "../utils/timeago";
import VideoPageLoader from "../components/loaders/videopageloader";
const VideoPage = memo(() => {
    const { Authenticated } = UseUserContext();
    const { showNotification } = useNotification();
    const { videoId } = useParams();

    const { videoData,
        loading,
        error,
        likes,
        liked,
        disliked,
        subs,
        isSubscribed,
        toggleLike,
        toggleDislike,
        toggleSubscription, } = useVideoData(videoId);

    const [suggestedVideos, setSuggestedVideos] = useState([]);
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
        <div className="min-h-screen bg-neutral-950 text-white pt-14 sm:pt-16">
            <div className="mx-auto max-w-[1750px] px-4 sm:px-6 lg:px-8 py-4 grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_402px] gap-6">

                <main className="min-w-0">

                    <div
                        className="relative group rounded-xl overflow-hidden border border-neutral-800 bg-black shadow-xl"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        {/* Aspect wrapper for perfect 16:9 */}
                        <div className="relative w-full aspect-video bg-black">
                            <video
                                ref={videoRef}
                                src={videoData.videofile}
                                className="absolute inset-0 w-full h-full object-contain bg-black"
                                poster={videoData.thumbnail}
                                onTimeUpdate={handleTimeUpdate}
                                onLoadedMetadata={handleLoadedMetadata}
                                onPlay={() => setIsPlaying(true)}
                                onPause={() => setIsPlaying(false)}
                                onClick={togglePlay}
                            >
                                Your browser does not support the video tag.
                            </video>
                        </div>

                        {!isPlaying && (
                            <button
                                className="absolute inset-0 flex items-center justify-center bg-black/40"
                                onClick={togglePlay}
                                aria-label="Play"
                            >
                                <div className="w-20 h-20 bg-indigo-600 rounded-full flex items-center justify-center hover:bg-indigo-700 transition-colors duration-200 shadow-lg">
                                    <svg
                                        className="w-8 h-8 text-white ml-1"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                </div>
                            </button>
                        )}

                        <div
                            className={`absolute bottom-0 left-0 right-0 p-3 sm:p-4 bg-gradient-to-t from-black/90 via-black/60 to-transparent transition-opacity duration-300 ${showControls ? "opacity-100" : "opacity-0"
                                }`}
                        >
                            {/* Progress bar */}
                            <div className="mb-3 sm:mb-4 group/progress">
                                <div
                                    className="w-full h-1.5 sm:h-2 bg-white/20 rounded-full cursor-pointer hover:h-2.5 sm:hover:h-3 transition-all"
                                    onClick={handleSeek}
                                >
                                    <div
                                        className="h-full bg-indigo-600 rounded-full relative"
                                        style={{
                                            width: `${duration ? (currentTime / duration) * 100 : 0}%`,
                                        }}
                                    >
                                        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-3.5 h-3.5 rounded-full bg-indigo-600 opacity-0 group-hover/progress:opacity-100 transition-opacity" />
                                    </div>
                                </div>
                            </div>

                            {/* Bottom controls row */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3 sm:gap-4">
                                    {/* Play/Pause */}
                                    <button
                                        onClick={togglePlay}
                                        className="w-9 h-9 sm:w-10 sm:h-10 bg-white/15 rounded-full flex items-center justify-center hover:bg-white/25 transition"
                                        aria-label={isPlaying ? "Pause" : "Play"}
                                    >
                                        {isPlaying ? (
                                            <svg
                                                className="w-5 h-5 text-white"
                                                fill="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                                            </svg>
                                        ) : (
                                            <svg
                                                className="w-5 h-5 text-white ml-0.5"
                                                fill="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M8 5v14l11-7z" />
                                            </svg>
                                        )}
                                    </button>

                                    {/* Volume */}
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={toggleMute}
                                            className="w-8 h-8 flex items-center justify-center hover:bg-white/15 rounded transition"
                                            aria-label={isMuted || volume === 0 ? "Unmute" : "Mute"}
                                        >
                                            {isMuted || volume === 0 ? (
                                                <svg
                                                    className="w-5 h-5 text-white"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                                                        clipRule="evenodd"
                                                    />
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
                                                    />
                                                </svg>
                                            ) : (
                                                <svg
                                                    className="w-5 h-5 text-white"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M15.536 8.464a5 5 0 010 7.072M18.364 5.636a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                                                    />
                                                </svg>
                                            )}
                                        </button>
                                        <input
                                            type="range"
                                            min="0"
                                            max="1"
                                            step="0.1"
                                            value={isMuted ? 0 : volume}
                                            onChange={handleVolumeChange}
                                            className="volume-slider w-20 sm:w-24 h-1 bg-white/25 rounded-lg appearance-none cursor-pointer"
                                        />
                                    </div>

                                    {/* Time */}
                                    <div className="text-white text-[12px] sm:text-sm font-mono">
                                        {formatTime(currentTime)} / {formatTime(duration)}
                                    </div>
                                </div>

                                {/* Fullscreen */}
                                <div className="flex items-center">
                                    <button
                                        onClick={toggleFullscreen}
                                        className="w-8 h-8 flex items-center justify-center hover:bg-white/15 rounded transition"
                                        aria-label="Fullscreen"
                                    >
                                        <svg
                                            className="w-5 h-5 text-white"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Video info loading overlay - only show when video info is loading */}
                        {loading && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                            </div>
                        )}
                    </div>

                    {/* Video Info */}

                    <section className="mt-6">
                        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-snug">
                            {videoData.title}
                        </h1>

                        {/* Views + Date */}
                        <div className="mt-3 flex flex-wrap items-center gap-2 text-neutral-400 text-sm">
                            <span>{videoData.views?.toLocaleString()} views</span>
                            <span className="text-neutral-600">•</span>
                            <span>{timeAgo(videoData.uploadDate)}</span>
                        </div>

                        {/* Channel + Actions */}
                        <div className="mt-6 p-5 rounded-xl border border-neutral-300 bg-gradient-to-br  via-gray-900 to-indigo-950/70 shadow-lg">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

                                {/* Channel */}
                                <div className="flex items-center gap-4">
                                    <Link
                                        to={`/user-profile/${videoData.owner._id}`}
                                        className="flex items-center gap-4 text-white group"
                                    >
                                        <span className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-neutral-800 group-hover:ring-indigo-600 transition">
                                            <img
                                                src={videoData.owner.avatar}
                                                alt="avatar"
                                                className="w-full h-full object-cover"
                                            />
                                        </span>
                                        <div>
                                            <p className="font-semibold text-lg">{videoData.owner.fullname}</p>
                                            <p className="text-neutral-400 text-xs">{subs} subscribers</p>
                                        </div>
                                    </Link>
                                </div>

                                {/* Actions */}
                                <div className="flex flex-wrap items-center gap-3">
                                    {/* Subscribe Button */}
                                    <button
                                        className={`px-6 py-2.5 rounded-full font-medium transition-all shadow-md
            ${isSubscribed
                                                ? "bg-indigo-900 hover:bg-indigo-400 text-white border border-red-700"
                                                : "bg-indigo-400 hover:bg-indigo-800 text-white hover:shadow-purple-500/25"
                                            }`}
                                        onClick={() => {
                                            !Authenticated
                                                ? showNotification("Please login to subscribe", false)
                                                : toggleSubscription();
                                        }}
                                    >
                                        {isSubscribed && Authenticated ? "Subscribed" : "Subscribe"}
                                    </button>

                                    {/* Like/Dislike */}
                                    <div className="flex items-center bg-indigo-700 rounded-full  px-2 py-1.5 gap-1.5 shadow-inner">
                                        {/* Like */}
                                        <button
                                            onClick={toggleLike}
                                            disabled={!Authenticated}
                                            className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition
              ${!Authenticated ? "opacity-50 cursor-not-allowed"
                                                    : "hover:bg-neutral-800"}
              ${liked ? "text-indigo-700 bg-neutral-900" : ""}`}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill={liked ? "currentColor" : "none"}
                                                stroke="currentColor"
                                                className="w-5 h-5"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                                                />
                                            </svg>
                                            <span className="text-sm">{formatViews(likes)}</span>
                                        </button>

                                        <div className="w-px h-6 bg-neutral-700" />

                                        {/* Dislike */}
                                        <button
                                            onClick={toggleDislike}
                                            disabled={!Authenticated}
                                            className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition
              ${!Authenticated ? "opacity-50 cursor-not-allowed"
                                                    : "hover:bg-neutral-800"}
              ${disliked ? "text-indigo-700 bg-neutral-900" : ""}`}
                                        >
                                            <svg
                                                className="w-5 h-5 rotate-180"
                                                fill={disliked ? "currentColor" : "none"}
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                                                />
                                            </svg>
                                            <span className="text-sm">{videoData.dislikes?.toLocaleString()}</span>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Description */}
                            {videoData.description && (
                                <div className="mt-8">
                                    <div className="p-6 rounded-xl border  bg-gradient-to-br hover:to-purple-900/10   transition duration-500">
                                        <h2 className="text-lg font-semibold text-white mb-3">
                                            Description
                                        </h2>
                                        <p className="text-neutral-300 whitespace-pre-line leading-relaxed text-base tracking-wide">
                                            {videoData.description}
                                        </p>
                                    </div>
                                </div>
                            )}

                        </div>
                    </section>


                    {/* Comments */}
                    <section className="mt-6">
                        <CommentsSection videoId={videoId} />
                    </section>
                </main>

                {/* Sidebar - Up Next */}
                <aside className="min-w-0">
                    <h2 className="text-lg font-semibold mb-3">Up next</h2>
                    <div className="space-y-3">
                        {suggestedVideos.length > 0 ? (
                            suggestedVideos.map((video) => (
                                <VideoCard key={video.videoId} video={video} isHorizontal={true} />
                            ))
                        ) : (
                            <div className="text-center py-8 rounded-xl border border-neutral-900 bg-neutral-900/40">
                                <p className="text-neutral-400">No suggested videos available</p>
                            </div>
                        )}
                    </div>

                    {/* Tiny footer block */}
                    <div className="mt-6 p-4 rounded-lg border border-neutral-900 bg-neutral-900/40">
                        <p className="text-xs text-neutral-500">
                            Tips: Use the gear icon on your player (coming soon) for quality controls.
                        </p>
                    </div>
                </aside>
            </div>

            {/* Custom Styles */}
            <style>{`
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
            `}</style>

        </div>
    );
});


export default VideoPage;