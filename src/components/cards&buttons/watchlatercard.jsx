import { Link } from "react-router-dom";
import { Play, Trash2 } from "lucide-react";

export const WatchLaterCard = ({
    video,
    onRemoveClick,
    onVideoClick
}) => {
    return (
        <div className="bg-neutral-900 rounded-lg border border-neutral-800 overflow-hidden hover:border-neutral-700 transition-all duration-200 w-full group">
            {/* Thumbnail */}
            <div className="relative cursor-pointer" onClick={() => onVideoClick(video)}>
                <div className="aspect-video w-full bg-zinc-800 overflow-hidden">
                    <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                    />

                    {/* Play overlay */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                        <div className="bg-white/10 backdrop-blur-sm rounded-full p-2">
                            <Play className="w-6 h-6 text-white fill-current" />
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-1.5 right-1.5 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded text-[11px] font-medium">
                    {video.duration}
                </div>
            </div>

            {/* Content */}
            <div className="p-3">
                <h3 className="text-sm font-medium text-white mb-1.5 line-clamp-2 cursor-pointer hover:text-zinc-300 transition-colors leading-tight"
                    onClick={() => onVideoClick(video)}>
                    {video.title}
                </h3>

                {/* Channel & Stats */}
                <div className="flex items-center justify-between mb-2.5">
                    <Link to={`/user-profile/${video.owner._id}`}>
                        <div className="flex items-center hover:text-zinc-300 transition-colors">
                            <img
                                src={video.owner.avatar}
                                alt="avatar"
                                className="w-4 h-4 rounded-full object-cover mr-1.5"
                            />
                            <span className="text-xs text-zinc-400 font-medium truncate max-w-[120px]">
                                {video.owner.fullname}
                            </span>
                        </div>
                    </Link>

                    <div className="text-[11px] text-neutral-500">
                        {video.views} views
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                    <button
                        onClick={() => onVideoClick(video)}
                        className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 bg-white hover:bg-zinc-200 text-black rounded text-xs font-medium transition-colors"
                    >
                        <Play className="w-3 h-3" />
                        Watch
                    </button>

                    <button
                        onClick={() => onRemoveClick(video._id)}
                        className="flex items-center justify-center px-2 py-1.5 bg-neutral-800 hover:bg-red-600 text-neutral-400 hover:text-white rounded transition-colors"
                        title="Remove from Watch Later"
                    >
                        <Trash2 className="w-3 h-3" />
                    </button>
                </div>
            </div>
        </div>
    );
};