import { Link } from "react-router-dom";
import {
    Edit3,
    Trash2,
} from "lucide-react"
export const VideoCard2 = ({ video, onEditStart, onDeleteClick }) => {
    return (
        <div className="bg-neutral-950 rounded-lg border border-neutral-900 overflow-hidden hover:border-neutral-600 transition-all duration-300 w-full shadow-sm">
            {/* Thumbnail */}
            <div className="relative w-full">
                <Link to={`/video/${video._id}`}>
                    <div className="aspect-video w-full bg-neutral-900 overflow-hidden">
                        <img
                            src={video.thumbnail}
                            alt={video.title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                </Link>

                {/* Duration */}
                <div className="absolute bottom-1 right-1 bg-black/80 text-white text-[11px] px-2 py-0.5 rounded">
                    {video.duration}
                </div>

                {/* Visibility Label */}
                <div
                    className={`absolute top-1 left-1 text-[11px] px-2 py-0.5 rounded font-medium ${video.visibility === "public"
                        ? "bg-green-700/80 text-white"
                        : "bg-yellow-600/80 text-black"
                        }`}
                >
                    {video.visibility === "public" ? "Public" : "Private"}
                </div>
            </div>

            {/* Content */}
            <div className="p-3 sm:p-4">
                <h3 className="text-sm font-semibold text-white mb-1 line-clamp-2">
                    {video.title}
                </h3>
                <p className="text-gray-400 text-xs mb-2 line-clamp-3">
                    {video.description}
                </p>
                <div className="text-[11px] text-gray-500 mb-3">
                    <span>{video.views} views</span>
                    <span className="mx-1">•</span>
                    <span>{new Date(video.uploadDate).toLocaleDateString()}</span>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => onEditStart(video)}
                        className="flex items-center gap-1 px-2.5 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded-md text-xs font-medium transition-colors"
                    >
                        <Edit3 className="w-3.5 h-3.5" />
                        Edit
                    </button>
                    <button
                        onClick={() => onDeleteClick(video._id)}
                        className="flex items-center gap-1 px-2.5 py-1.5 bg-red-900/40 hover:bg-red-900/70 text-red-300 rounded-md text-xs font-medium transition-colors"
                    >
                        <Trash2 className="w-3.5 h-3.5" />
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};