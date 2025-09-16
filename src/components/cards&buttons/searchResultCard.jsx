// VideoCard4.jsx - Clean + Fixed dropdown + mobile bottom sheet
import { memo, useState, useCallback, useEffect, useRef } from "react";
import { useNotification } from "../../context/notificationcontext";
import { Link } from "react-router-dom";
import { formatViews, timeAgo } from "../../utils/timeago";
import { WatchlaterAPI } from "../../services/watchlaterservice";
import { MoreVertical, Clock, Share2, Flag } from "lucide-react";

export const VideoCard4 = memo(
    ({
        videoId,
        thumbnail,
        title,
        channelName,
        channelAvatar,
        duration,
        description,
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
                    showNotification("Video Added to watch later");
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
            <div className="w-full flex gap-3 sm:gap-4 md:gap-6 mb-4 sm:mb-5 md:mb-6">
                {/* Thumbnail */}
                <div className="relative flex-shrink-0 w-40 sm:w-52 md:w-64 lg:w-72 aspect-video bg-neutral-800 rounded-md sm:rounded-lg overflow-hidden cursor-pointer group">
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

                    {/* 3-dot menu trigger */}
                    <div className="absolute top-1 right-1 sm:top-2 sm:right-2 z-30" ref={menuRef}>
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
                                    className="fixed inset-0 bg-black/40 "
                                    onClick={() => setShowMenu(false)}
                                />

                                {/* Desktop dropdown */}
                                <div className="hidden sm:block absolute top-full right-0 mt-1 
                  bg-neutral-900 rounded-lg shadow-xl py-2 
                  w-40 md:w-48 border border-neutral-700">
                                    <button
                                        onClick={() => handleMenuAction("watchLater")}
                                        className="flex items-center gap-2 w-full px-3 py-2 text-sm text-white hover:bg-neutral-800"
                                    >
                                        <Clock className="w-4 h-4" />
                                        Watch later
                                    </button>
                                    <button
                                        onClick={() => handleMenuAction("share")}
                                        className="flex items-center gap-2 w-full px-3 py-2 text-sm text-white hover:bg-neutral-800"
                                    >
                                        <Share2 className="w-4 h-4" />
                                        Share
                                    </button>
                                    <button
                                        onClick={() => handleMenuAction("report")}
                                        className="flex items-center gap-2 w-full px-3 py-2 text-sm text-white hover:bg-neutral-800"
                                    >
                                        <Flag className="w-4 h-4" />
                                        Report
                                    </button>
                                </div>

                                {/* Mobile bottom sheet */}
                                <div className="sm:hidden fixed bottom-0 left-0 right-0 
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

                {/* Video Info */}
                <div className="flex-1 min-w-0">
                    <a href={`/video/${videoId}`} className="block">
                        <h3 className="text-white text-sm sm:text-base md:text-lg font-medium leading-snug line-clamp-2 hover:text-neutral-200 transition-colors">
                            {title}
                        </h3>
                    </a>

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

                    <div className="flex items-center text-neutral-400 text-xs sm:text-sm mt-1">
                        <span>{formatViews(views)} views</span>
                        <span className="mx-1">•</span>
                        <span>{timeAgo(timestamps)}</span>
                    </div>

                    {description && (
                        <p className="text-neutral-300 text-xs sm:text-sm mt-2 line-clamp-2">
                            {description}
                        </p>
                    )}
                </div>
            </div>
        );
    }
);
