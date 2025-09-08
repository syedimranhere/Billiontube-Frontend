import { memo } from "react"; import { useState, useCallback } from "react";
import { useNotification } from "../../context/notificationcontext"; import { Link } from "react-router-dom"; import { formatViews, timeAgo } from "../../utils/timeago";
import { WatchlaterAPI } from "../../services/watchlaterservice";
import { MoreVertical, Clock, Share2, Flag } from "lucide-react";
//only re render if the props change
export const VideoCard4 = memo(({ videoId,
    thumbnail,
    title,
    channelName,
    channelAvatar,
    duration,
    description,
    timestamps,
    views = 0,
    owner, }) => {

    const [showMenu, setShowMenu] = useState(false);
    const { showNotification } = useNotification();

    const addToWatchLater = useCallback(async (videoId) => {
        try {
            await WatchlaterAPI.addVideoToWatchLater(videoId);
            showNotification("Video Added to watch later");
        } catch (error) {
            console.log(error.message);
        }
    }, [showNotification]);

    const handleMouseLeave = useCallback(() => {
        setShowMenu(false);
    }, []);

    const toggleMenu = useCallback((e) => {
        e.stopPropagation();
        e.preventDefault();
        setShowMenu(prev => !prev);
    }, []);
    const handleMenuAction = useCallback((action) => {
        if (action === 'watchLater') {
            addToWatchLater(videoId);
        }
        setShowMenu(false);
    }, [addToWatchLater, videoId]);

    return (
        <div className="w-full flex gap-3 sm:gap-4 md:gap-6 mb-4 sm:mb-5 md:mb-6">
            {/* Thumbnail */}
            <div
                className="relative flex-shrink-0 w-40 sm:w-52 md:w-64 lg:w-72 aspect-video bg-neutral-800 rounded-md sm:rounded-lg overflow-hidden cursor-pointer group"
                onMouseLeave={handleMouseLeave}
            >
                <a href={`/video/${videoId}`} className="block w-full h-full">
                    <img
                        src={thumbnail}
                        alt={title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                    />
                    {/* Duration Badge */}
                    <div className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 bg-black/80 text-white text-[10px] sm:text-xs px-1.5 py-0.5 sm:px-2 sm:py-1 rounded font-medium">
                        {duration}
                    </div>
                </a>

                {/* 3-dot menu */}
                <div className="absolute top-1 right-1 sm:top-2 sm:right-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button
                        onClick={toggleMenu}
                        className="bg-black/70 text-white p-1 sm:p-1.5 rounded-full hover:bg-black/80 transition-colors"
                        aria-label="More options"
                    >
                        <MoreVertical className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>

                    {showMenu && (
                        <div
                            className="absolute top-full right-0 mt-1 bg-neutral-900 rounded-lg shadow-xl py-2 min-w-[140px] sm:min-w-[160px] md:min-w-[180px] z-30 border border-neutral-700"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => handleMenuAction("watchLater")}
                                className="flex items-center gap-2 sm:gap-3 w-full px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-white hover:bg-neutral-800 transition-colors"
                            >
                                <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                                Watch later
                            </button>
                            <button
                                onClick={() => handleMenuAction("share")}
                                className="flex items-center gap-2 sm:gap-3 w-full px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-white hover:bg-neutral-800 transition-colors"
                            >
                                <Share2 className="w-3 h-3 sm:w-4 sm:h-4" />
                                Share
                            </button>
                            <button
                                onClick={() => handleMenuAction("report")}
                                className="flex items-center gap-2 sm:gap-3 w-full px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-white hover:bg-neutral-800 transition-colors"
                            >
                                <Flag className="w-3 h-3 sm:w-4 sm:h-4" />
                                Report
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Video Info (right side) */}
            <div className="flex-1 min-w-0">
                {/* Title */}
                <a href={`/video/${videoId}`} className="block">
                    <h3 className="text-white text-sm sm:text-base md:text-lg font-medium leading-snug line-clamp-2 hover:text-neutral-200 transition-colors">
                        {title}
                    </h3>
                </a>

                {/* Channel Info */}
                <div className="flex items-center gap-2 sm:gap-3 mt-1">
                    {channelAvatar && (
                        <Link to={`/user-profile/${owner}`} className="flex-shrink-0">
                            <img
                                src={channelAvatar}
                                alt={channelName}
                                className="w-5 h-5 sm:w-6 sm:h-6 rounded-full object-cover"
                                loading="lazy"
                            />
                        </Link>
                    )}
                    <Link to={`/user-profile/${owner}`}>
                        <p className="text-neutral-400 text-xs sm:text-sm hover:text-neutral-300 transition-colors truncate">
                            {channelName}
                        </p>
                    </Link>
                </div>

                {/* Views + Time */}
                <div className="flex items-center text-neutral-400 text-xs sm:text-sm mt-1">
                    <span>{formatViews(views)} views</span>
                    <span className="mx-1">•</span>
                    <span>{timeAgo(timestamps)}</span>
                </div>

                {/* Description (like YouTube shows under search results) */}
                {description && (
                    <p className="text-neutral-300 text-xs sm:text-sm mt-2 line-clamp-2">
                        {description}
                    </p>
                )}
            </div>
        </div>
    );

})