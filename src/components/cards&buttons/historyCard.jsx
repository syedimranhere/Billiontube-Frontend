import { timeAgo, formatViews } from '../../utils/timeago';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';

export const VideoCard3 = ({ video, item, removeFromHistory }) => {
    return (
        <div
            key={video._id}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 py-3 sm:py-4 border-gray-200 group hover:bg-indigo-700/10 px-3 sm:px-4 -mx-3 sm:-mx-4 rounded-sm transition-all duration-200"
        >
            {/* Thumbnail */}
            <Link to={`/video/${video._id}`} >
                <div className="relative hover:opacity-60 flex-shrink-0 w-full sm:w-36 md:w-40">
                    <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-48 sm:h-20 md:h-24 object-cover rounded-sm"
                    />

                    <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                        {video.duration}
                    </div>
                </div>
            </Link>

            {/* Video Info */}
            <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start gap-2">
                    <div className="flex-1 min-w-0">
                        {/* Title */}
                        <Link to={`/video/${video._id}`} >

                            <h3 className="text-white text-sm sm:text-base font-medium mb-1 sm:mb-2 line-clamp-2 hover:underline cursor-pointer hover:text-gray-300 transition-colors leading-tight">
                                {video.title}
                            </h3>
                        </Link>


                        {/* Channel and stats */}
                        <div className="flex items-center gap-2 mb-2 sm:mb-3">
                            <img
                                src={video.owner.avatar}
                                alt={video.channelName}
                                className="w-5 h-5 sm:w-6 sm:h-6 rounded-full cursor-pointer flex-shrink-0"
                            />
                            <Link to={`/user-profile/${video.owner._id}`} >

                                <span className="text-gray-200 hover:underline text-xs sm:text-sm cursor-pointer hover:text-white transition-colors truncate">
                                    {video.owner.fullname}
                                </span>
                            </Link>

                            <span className="text-gray-500 text-xs sm:text-sm">•</span>
                            <span className="text-gray-400 text-xs sm:text-sm whitespace-nowrap">
                                {formatViews(video.views)} views
                            </span>
                        </div>

                        {/* Description */}
                        <p className="text-gray-400 text-xs sm:text-sm line-clamp-2 mb-2 sm:mb-3 leading-relaxed">
                            {video.description}
                        </p>

                        {/* Last watched */}
                        <p className="text-neutral-300 text-xs italic">
                            Last watched {timeAgo(item.lastWatchedAt)}
                        </p>
                    </div>

                    {/* Remove button */}
                    <button
                        onClick={() => removeFromHistory(video._id, video.title)}
                        className="flex-shrink-0 p-2 text-gray-400 hover:text-white hover:bg-gray-900 rounded-full transition-all opacity-70 sm:opacity-0 sm:group-hover:opacity-100"
                        title="Remove from watch history"
                    >
                        <X size={14} className="sm:w-4 sm:h-4" />
                    </button>
                </div>
            </div>
        </div>
    )
}