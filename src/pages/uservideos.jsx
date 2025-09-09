import { useState, useEffect, useCallback } from "react";
import { AlertTriangle } from "lucide-react";
import SmoothSkeletonLoader from "../components/loaders/videoskeleton";
import { useNotification } from "../context/notificationcontext";
import { VideoCard2 } from "../components/cards&buttons/userVideoscard";
import { EditModal } from "../components/editModal";
import { videosAPI } from "../services/videosservice";
import { usersAPI } from "../services/usersservice";

const VideoManagement = () => {
  const { showNotification } = useNotification();

  const [videos, setVideos] = useState([]);
  const [editingVideo, setEditingVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    thumbnail: "",
    thumbnailFile: null,
    visibility: "public",
  });
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        const response = await usersAPI.getMyvideos();
        setVideos(response.data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  const handleEditStart = useCallback((video) => {
    setEditingVideo(video._id);
    setEditForm({
      title: video.title,
      description: video.description,
      thumbnail: video.thumbnail,
      thumbnailFile: null,
      visibility: video.visibility || "public",
    });
  }, []);

  const handleEditCancel = useCallback(() => {
    if (editForm.thumbnailFile && editForm.thumbnail) {
      URL.revokeObjectURL(editForm.thumbnail);
    }
    setEditingVideo(null);
    setEditForm({
      title: "",
      description: "",
      thumbnail: "",
      thumbnailFile: null,
      visibility: "public",
    });
  }, [editForm]);

  const handleTitleChange = (e) => {
    setEditForm((prev) => ({ ...prev, title: e.target.value }));
  };

  const handleDescriptionChange = (e) => {
    setEditForm((prev) => ({ ...prev, description: e.target.value }));
  };

  const handleVisibilityChange = (e) => {
    setEditForm((prev) => ({ ...prev, visibility: e.target.value }));
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (editForm.thumbnailFile && editForm.thumbnail) {
        URL.revokeObjectURL(editForm.thumbnail);
      }
      const previewUrl = URL.createObjectURL(file);
      setEditForm((prev) => ({
        ...prev,
        thumbnail: previewUrl,
        thumbnailFile: file,
      }));
      showNotification("Thumbnail selected successfully!", "success");
    }
  };

  const handleEditSave = async () => {
    setSaving(true);
    try {
      const formData = new FormData();
      formData.append("title", editForm.title);
      formData.append("description", editForm.description);
      formData.append("visibility", editForm.visibility);
      if (editForm.thumbnailFile) {
        formData.append("thumbnail", editForm.thumbnailFile);
      }

      await usersAPI.editVideoDetails(editingVideo, formData);
      showNotification("Video updated successfully!", "success");

      setVideos((prev) =>
        prev.map((video) =>
          video._id === editingVideo
            ? {
              ...video,
              title: editForm.title,
              description: editForm.description,
              thumbnail: editForm.thumbnail,
              visibility: editForm.visibility,
            }
            : video
        )
      );
    } catch (error) {
      showNotification("Failed to update video", "error");
    } finally {
      if (editForm.thumbnailFile && editForm.thumbnail) {
        URL.revokeObjectURL(editForm.thumbnail);
      }
      setEditingVideo(null);
      setEditForm({
        title: "",
        description: "",
        thumbnail: "",
        thumbnailFile: null,
        visibility: "public",
      });
      setSaving(false);
    }
  };

  const handleDelete = async (videoId) => {
    const oldVideos = [...videos];
    setVideos((prev) => prev.filter((v) => v._id !== videoId));
    setDeleteConfirm(null);

    try {
      await videosAPI.deleteAVideo(videoId);
      await usersAPI.deleteforALL(videoId);
      showNotification("Video deleted successfully!", "success");
    } catch (error) {
      showNotification("Failed to delete video", "error");
      setVideos(oldVideos);
    }
  };

  if (loading) {
    return <SmoothSkeletonLoader />;
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 max-w-md w-full">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-5 h-5 text-red-400" />
              <h3 className="text-lg font-semibold text-white">Delete Video</h3>
            </div>
            <p className="text-gray-200 mb-6 text-sm">
              Are you sure you want to delete this video? This action cannot be
              undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm font-medium"
              >
                Delete
              </button>
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 px-3 py-2 bg-neutral-600 hover:bg-neutral-900 text-white rounded-md text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editingVideo && (
        <EditModal
          editForm={editForm}
          onTitleChange={handleTitleChange}
          onDescriptionChange={handleDescriptionChange}
          onThumbnailChange={handleThumbnailChange}
          onVisibilityChange={handleVisibilityChange}
          onSave={handleEditSave}
          onCancel={handleEditCancel}
          saving={saving}
        />
      )}

      {/* Header Section */}
      <div className="pt-20 pb-8">
        <div className="px-6">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              My Videos
            </h1>
            <p className="text-gray-400 text-lg">Manage your video content</p>
          </div>
        </div>
      </div>

      {/* Videos Grid Container */}
      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-x-4 gap-y-6">
          {videos.map((video) => (
            <VideoCard2
              key={video._id}
              video={video}
              onEditStart={handleEditStart}
              onDeleteClick={setDeleteConfirm}
            />
          ))}
        </div>

        {/* Empty State */}
        {videos.length === 0 && !loading && (
          <div className="text-center py-16">
            <div className="text-gray-500 mb-4">
              <svg
                className="w-16 h-16 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No videos yet</h3>
            <p className="text-gray-400">Start creating content to see your videos here</p>
          </div>
        )}
      </div>

      <style>
        {`
          .line-clamp-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          .line-clamp-3 {
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        `}
      </style>
    </div>
  );
};

export default VideoManagement;