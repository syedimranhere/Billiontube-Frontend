// VideoCard.jsx - Responsive dropdown + mobile bottom sheet
import { useState, useCallback, useEffect, useRef, memo } from "react";
import { MoreVertical, Clock, Flag, Share2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useNotification } from "../../context/notificationcontext";
import { timeAgo, formatViews } from "../../utils/timeago";
import { WatchlaterAPI } from "../../services/watchlaterservice";

const VideoCard = memo(
    ({
        videoId,
        thumbnail,
        title,
        channelName,
        channelAvatar,
        duration,
        timestamps,
        views = 0,
        owner,
    }) => {
        const [showMenu, setShowMenu] = useState(false);
        const { showNotification } = useNotification();
        const menuRef = useRef(null);

        const addToWatchLater = useCallback(
            async (videoId) => {
                try {
                    await WatchlaterAPI.addVideoToWatchLater(videoId);
                    showNotification("Video added to Watch Later");
                } catch (error) {
                    console.error(error.message);
                }
            },
            [showNotification]
        );

        const toggleMenu = useCallback((e) => {
            e.stopPropagation();
            e.preventDefault();
            setShowMenu((prev) => !prev);
        }, []);

        const handleMenuAction = useCallback(
            (action) => {
                if (action === "watchLater") {
                    addToWatchLater(videoId);
                }
                setShowMenu(false);
            },
            [addToWatchLater, videoId]
        );

        // Close menu on outside click
        useEffect(() => {
            const handleClickOutside = (e) => {
                if (menuRef.current && !menuRef.current.contains(e.target)) {
                    setShowMenu(false);
                }
            };

            if (showMenu) {
                document.addEventListener("mousedown", handleClickOutside);
            }
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [showMenu]);

        return (
            <div className="w-full mb-3 sm:mb-4 md:mb-6">
                {/* Thumbnail */}
                <div className="relative w-full aspect-video bg-neutral-800 rounded-md sm:rounded-lg overflow-hidden cursor-pointer group">
                    <a href={`/video/${videoId}`} className="block w-full h-full">
                        <img
                            src={thumbnail}
                            alt={title}
                            className="w-full h-full object-cover object-center"
                            loading="lazy"
                        />
                        {/* Duration Badge */}
                        <div className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 bg-black/80 text-white text-xs px-1.5 py-0.5 sm:px-2 sm:py-1 rounded font-medium">
                            {duration}
                        </div>
                    </a>

                    {/* 3-dot menu */}
                    <div
                        className="absolute top-1 right-1 sm:top-2 sm:right-2 z-30"
                        ref={menuRef}
                    >
                        <button
                            onClick={toggleMenu}
                            className="bg-black/70 text-white p-1 sm:p-1.5 rounded-full hover:bg-black/80 transition-colors opacity-100 sm:opacity-0 sm:group-hover:opacity-100 flex items-center justify-center"
                            aria-label="More options"
                        >
                            <MoreVertical className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                        </button>

                        {showMenu && (
                            <>
                                {/* Overlay */}
                                <div
                                    className="fixed inset-0 bg-black/40 z-40"
                                    onClick={() => setShowMenu(false)}
                                />

                                {/* Desktop dropdown */}
                                <div className="hidden sm:block absolute top-full right-0 mt-1 
                  bg-neutral-900 rounded-lg shadow-xl py-2 
                  w-40 md:w-48 z-50 border border-neutral-700">
                                    <button
                                        onClick={() => handleMenuAction("watchLater")}
                                        className="flex items-center gap-2 w-full px-3 py-2 text-sm text-white hover:bg-neutral-800 transition-colors"
                                    >
                                        <Clock className="w-4 h-4" />
                                        Watch later
                                    </button>
                                    <button
                                        onClick={() => handleMenuAction("share")}
                                        className="flex items-center gap-2 w-full px-3 py-2 text-sm text-white hover:bg-neutral-800 transition-colors"
                                    >
                                        <Share2 className="w-4 h-4" />
                                        Share
                                    </button>
                                    <button
                                        onClick={() => handleMenuAction("report")}
                                        className="flex items-center gap-2 w-full px-3 py-2 text-sm text-white hover:bg-neutral-800 transition-colors"
                                    >
                                        <Flag className="w-4 h-4" />
                                        Report
                                    </button>
                                </div>

                                {/* Mobile bottom sheet */}
                                <div className="sm:hidden fixed bottom-0 left-0 right-0 z-50 
                  bg-neutral-900 rounded-t-2xl border-t border-neutral-700 shadow-xl p-4">
                                    <div className="space-y-2">
                                        <button
                                            onClick={() => handleMenuAction("watchLater")}
                                            className="flex items-center gap-3 w-full px-3 py-3 text-base text-white hover:bg-neutral-800 rounded-lg"
                                        >
                                            <Clock className="w-5 h-5" />
                                            Watch later
                                        </button>
                                        <button
                                            onClick={() => handleMenuAction("share")}
                                            className="flex items-center gap-3 w-full px-3 py-3 text-base text-white hover:bg-neutral-800 rounded-lg"
                                        >
                                            <Share2 className="w-5 h-5" />
                                            Share
                                        </button>
                                        <button
                                            onClick={() => handleMenuAction("report")}
                                            className="flex items-center gap-3 w-full px-3 py-3 text-base text-white hover:bg-neutral-800 rounded-lg"
                                        >
                                            <Flag className="w-5 h-5" />
                                            Report
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* Video Details */}
                <div className="flex gap-2 sm:gap-3 mt-2 sm:mt-3">
                    {/* Avatar */}
                    {channelAvatar && (
                        <Link to={`/user-profile/${owner}`} className="flex-shrink-0">
                            <img
                                src={channelAvatar}
                                alt={channelName}
                                className="w-6 h-6 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-full object-cover"
                                loading="lazy"
                            />
                        </Link>
                    )}

                    {/* Video Details */}
                    <div className="flex-1 min-w-0">
                        <a href={`/video/${videoId}`} className="block">
                            <h3 className="text-white text-xs sm:text-sm md:text-base font-medium leading-tight line-clamp-2 mb-0.5 sm:mb-1 hover:text-neutral-200 transition-colors">
                                {title}
                            </h3>
                        </a>
                        <Link to={`/user-profile/${owner}`}>
                            <p className="text-neutral-400 text-xs sm:text-sm mb-0.5 hover:text-neutral-300 transition-colors truncate">
                                {channelName}
                            </p>
                        </Link>
                        <div className="flex items-center text-neutral-400 text-xs">
                            <span className="truncate">{formatViews(views)} views</span>
                            <span className="mx-1 flex-shrink-0">•</span>
                            <span className="truncate">{timeAgo(timestamps)}</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
);

export default VideoCard;
