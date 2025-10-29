import { Link } from "react-router-dom";
import { Play, Trash2 } from "lucide-react";
import { formatViews } from "../../utils/timeago";
export const WatchLaterCard = ({
    video,
    onRemoveClick,
    onVideoClick
}) => {
    return (
        <div className=" rounded-sm  hover:bg-indigo-900/20 overflow-hidden hover:border-purple-700 transition-all duration-200 w-full group">
            {/* Thumbnail */}
            <div className="relative cursor-pointer" onClick={() => onVideoClick(video)}>
                <div className="aspect-video w-full hover:opacity-80 bg-zinc-800 overflow-hidden">
                    <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover  transition-transform duration-300"
                    />



                </div>

                <div className="absolute bottom-1.5 right-1.5 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded-sm text-[11px] font-medium">
                    {video.duration}
                </div>
            </div>

            {/* Content */}
            <div className="p-3">
                {/* Title */}
                <h3
                    className="text-sm font-medium text-white mb-1.5 line-clamp-2 cursor-pointer hover:text-zinc-300 transition-colors leading-tight"
                    onClick={() => onVideoClick(video)}
                >
                    {video.title}
                </h3>

                {/* Channel, Views & Delete Row */}
                <div className="flex items-center justify-between text-xs text-zinc-400">
                    {/* Left: Channel Info */}
                    <Link to={`/user-profile/${video.owner._id}`} className="flex items-center hover:text-zinc-300 transition-colors">
                        <img
                            src={video.owner.avatar}
                            alt="avatar"
                            className="w-4 h-4 rounded-full object-cover mr-1.5"
                        />
                        <span className="font-medium hover:underline truncate max-w-[100px]">{video.owner.fullname}</span>
                    </Link>

                    {/* Middle: Views */}
                    <span className="text-neutral-500 mx-3 whitespace-nowrap">{formatViews(video.views)} views</span>

                    {/* Right: Delete */}
                    <button
                        onClick={() => onRemoveClick(video._id)}
                        className="flex items-center justify-center p-1.5 hover:text-red-600 text-neutral-400 rounded transition-colors"
                        title="Remove from Watch Later"
                    >
                        <Trash2 className="w-4 h-3" />
                    </button>
                </div>
            </div>

        </div>
    );
};