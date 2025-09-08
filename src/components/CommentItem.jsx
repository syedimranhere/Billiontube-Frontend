import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { Edit3, Trash2, Check, X, AwardIcon } from "lucide-react";
import { timeAgo } from "../utils/timeago";
import { commentsAPI } from "../services/commentsservice";
import { usersAPI } from "../services/usersservice";
export default function CommentItem({ comment = {}, onUpdate, onDelete, user }) {
    const [commentUser, setCommentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState(comment?.content || "");


    useEffect(() => {
        const getUser = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await usersAPI.getUser(comment.owner);
                setCommentUser(response.data);
            } catch (error) {
                console.error("Failed to fetch user data:", error);
                setError("Failed to load user data");
            } finally {
                setLoading(false);
            }
        };

        if (comment?.owner) getUser();
        else setLoading(false);
    }, [comment?.owner]);

    const isCommentOwner = user?._id === comment?.owner;
    const commentWasEdited = comment?.edited;

    const handleDelete = () => {
        onDelete(comment._id);

    };

    const handleSaveEdit = () => {
        if (editedContent.trim() !== "") {
            onUpdate(comment._id, editedContent.trim());
            setIsEditing(false);
        }
    };

    return (

        <div className="flex space-x-4 bg-neutral-900 p-4 rounded-xl hover:bg-neutral-800/80 transition-colors">
            {/* Profile Picture */}
            <Link to={`/user-profile/${comment?.owner}`}>
                <img
                    src={commentUser?.avatar}
                    alt={`${commentUser?.fullname || "User"} profile`}
                    className="w-11 h-11 rounded-full object-cover border border-neutral-700"
                />
            </Link>

            {/* Main Content */}
            <div className="flex-1 min-w-0">
                {/* Header: Author + Timestamp + Actions */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <Link to={`/user-profile/${comment?.owner}`}>
                            <span className="font-semibold text-white text-sm hover:underline">
                                {loading ? "Loading..." : commentUser?.username || "Unknown User"}
                            </span>
                        </Link>
                        <span className="text-gray-400 text-xs">
                            {timeAgo(comment?.createdAt) || "Just now"}
                            {commentWasEdited && <span className="ml-2 text-gray-500">(edited)</span>}
                        </span>
                    </div>

                    {/* Owner Controls */}
                    {isCommentOwner && !isEditing && (
                        <div className="flex items-center space-x-1">
                            <button
                                onClick={() => setIsEditing(true)}
                                className="text-blue-400 hover:text-blue-300 p-1.5 rounded-full hover:bg-blue-400/10 transition-colors"
                                title="Edit comment"
                            >
                                <Edit3 size={16} />
                            </button>
                            <button
                                onClick={handleDelete}
                                className="text-red-400 hover:text-red-300 p-1.5 rounded-full hover:bg-red-400/10 transition-colors"
                                title="Delete comment"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    )}
                </div>



                {/* Content or Edit Mode */}
                {isEditing ? (
                    <div className="mt-2">
                        <textarea
                            value={editedContent}
                            onChange={(e) => setEditedContent(e.target.value)}
                            className="w-full bg-neutral-800 text-white text-sm p-3 rounded-lg border border-neutral-700 focus:border-blue-500 focus:outline-none resize-none"
                            rows={3}
                            placeholder="Edit your comment..."
                            autoFocus
                        />
                        <div className="flex items-center space-x-2 mt-3">
                            <button
                                onClick={handleSaveEdit}
                                disabled={!editedContent.trim()}
                                className="flex items-center space-x-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Check size={14} />
                                <span>Save</span>
                            </button>
                            <button
                                onClick={() => setIsEditing(false)}
                                className="flex items-center space-x-1.5 bg-gray-600 hover:bg-gray-700 text-white text-xs px-3 py-2 rounded-lg transition-colors"
                            >
                                <X size={14} />
                                <span>Cancel</span>
                            </button>
                        </div>
                    </div>
                ) : (
                    <p className="text-gray-200 text-sm mt-2 leading-relaxed whitespace-pre-line">
                        {comment.content || "No content"}
                    </p>
                )}

                {/* Error */}
                {error && (
                    <div className="text-red-400 text-xs mt-2 flex items-center space-x-1">
                        <span>⚠</span>
                        <span>{error}</span>
                    </div>
                )}
            </div>
        </div>
    );
}
