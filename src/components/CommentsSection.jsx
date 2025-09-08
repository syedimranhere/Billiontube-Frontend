import { useState, useEffect } from "react";

import CommentItem from "./CommentItem";
import { UseUserContext } from "../context/AuthContext";
import { useNotification } from "../context/notificationcontext";
import { commentsAPI } from "../services/commentsservice";
import { Heading1 } from "lucide-react";
import { Lock } from 'lucide-react';
import { Link } from "react-router-dom";
export default function CommentsSection({ videoId }) {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [showCommentBox, setShowCommentBox] = useState(false);
    const { Authenticated, user } = UseUserContext();
    const { showNotification } = useNotification();
    useEffect(() => {
        fetchComments();
    }, [videoId]);

    const fetchComments = async () => {
        try {
            setLoading(true);
            const response = await commentsAPI.getComments(videoId);
            setComments(response.comments || []);
        } catch (error) {
            console.error("Error fetching comments:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmitComment = async (e) => {
        e.preventDefault();
        if (!Authenticated) return alert("Please login to comment");
        if (!newComment.trim()) return;

        setSubmitting(true);
        try {
            const response = await commentsAPI.addComment(videoId, newComment.trim());

            showNotification("Comment Added", true);
            setComments(prev => [response.comment, ...prev]);
            setNewComment("");
            setShowCommentBox(false);
        } catch (error) {
            console.error("Error submitting comment:", error);
        } finally {
            setSubmitting(false);
        }
    };

    const handleCommentUpdate = async (commentId, updatedComment) => {
        showNotification("Comment Updated", true);

        await commentsAPI.updateComment(commentId, updatedComment);
        setComments(prev =>
            prev.map(comment =>
                comment._id === commentId ? { ...comment, content: updatedComment } : comment
            )
        );
    };

    const handleCommentDelete = async (commentId) => {
        showNotification("Comment Deleted", false);

        await commentsAPI.deleteComment(commentId);
        setComments(prev => prev.filter(comment => comment._id !== commentId));
    };

    return (
        <div className="mt-10">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg sm:text-xl font-bold text-white">
                    {comments.length} Comments
                </h2>
            </div>

            {Authenticated ? (
                <div className="mb-8">
                    <div className="flex items-start space-x-3">
                        <img
                            src={user?.avatar}
                            alt="Your profile"
                            className="w-10 h-10 rounded-full object-cover"
                        />
                        <div className="flex-1">
                            <form onSubmit={handleSubmitComment}>
                                <textarea
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    onFocus={() => setShowCommentBox(true)}
                                    placeholder="Add a comment..."
                                    rows={showCommentBox ? 3 : 1}
                                    className="w-full bg-transparent border-b border-neutral-600 focus:border-white 
                                   outline-none pb-2 text-sm text-white placeholder-gray-400 resize-none 
                                   transition-all"
                                />
                                {showCommentBox && (
                                    <div className="flex items-center justify-end gap-3 mt-3">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setShowCommentBox(false);
                                                setNewComment("");
                                            }}
                                            className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={!newComment.trim() || submitting}
                                            className="px-5 py-2 text-sm font-medium bg-red-600 text-white 
                                           rounded-full hover:bg-red-700 disabled:opacity-50 
                                           disabled:cursor-not-allowed transition"
                                        >
                                            {submitting ? "Posting..." : "Comment"}
                                        </button>
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex items-center justify-center gap-2 py-6 px-4 rounded-lg bg-neutral-900/60 border border-neutral-700">
                    <Lock className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-400 text-sm">
                        <Link
                            to="/login"
                            className="text-red-500 hover:text-red-400 font-medium underline transition"
                        >
                            Login
                        </Link>
                        <span className="ml-1">to comment</span>
                    </span>
                </div>
            )}


            {/* Comment List */}
            {loading ? (
                <div className="flex justify-center py-10">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
                </div>
            ) : comments.length === 0 ? (
                <div className="text-center py-10 text-gray-400">
                    <p>No comments yet. Be the first to comment!</p>
                </div>
            ) : (
                <div className="space-y-6">
                    {comments.map((comment) => (
                        <CommentItem
                            key={comment._id}
                            comment={comment}
                            user={user}
                            onUpdate={handleCommentUpdate}
                            onDelete={handleCommentDelete}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
