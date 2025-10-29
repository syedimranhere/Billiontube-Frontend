import { Link } from "react-router-dom";
import {
    Edit3,
    Trash2,
} from "lucide-react"
import { formatViews } from "../../utils/timeago";
export const VideoCard2 = ({ video, onEditStart, onDeleteClick }) => {
    return (
        <div className="bg-neutral-950 rounded-sm border border-neutral-900 overflow-hidden hover:border-neutral-800 transition-all duration-300 w-full shadow-sm">
            {/* Thumbnail */}
            <div className="relative w-full hover:opacity-50 ">
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
                <div className="absolute top-1 left-1 bg-black/80 text-white text-[11px] px-2 py-0.5 rounded-xs">
                    {video.duration}
                </div>

                <div className="absolute bottom-0 left-0 w-full flex items-center justify-between p-2 ">
                    {/* Edit and delete icons */}


                    <div
                        className={`text-[11px] px-2 py-0.5 rounded-xs font-medium ${video.visibility === "public"
                            ? "bg-green-800/80 text-white"
                            : "bg-yellow-700/80 text-black"
                            }`}
                    >
                        {video.visibility === "public" ? "Public" : "Private"}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-3 sm:p-4 ">
                <Link to={`/video/${video._id}`}>

                    <h3 className="text-sm font-semibold hover:underline text-white mb-1 line-clamp-2">
                        {video.title}
                    </h3>
                </Link>
                <p className="text-gray-400 text-xs mb-2 line-clamp-3">
                    {video.description}
                </p>
                <div className="flex items-center justify-between text-[11px] text-gray-500">
                    {/* Left Side: Views + Date */}
                    <div className="flex items-center">
                        <span>{formatViews(video.views)} views</span>
                        <span className="mx-1">•</span>
                        <span>{new Date(video.uploadDate).toLocaleDateString()}</span>
                    </div>

                    {/* Right Side: Edit/Delete Icons */}
                    <div className="flex gap-2">
                        <button
                            onClick={() => onEditStart(video)}
                            className=" mt-2 hover:text-blue-800/80 text-white  transition"
                        >
                            <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => onDeleteClick(video._id)}
                            className=" mt-2 hover:text-red-800 text-red-300  transition"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );

};