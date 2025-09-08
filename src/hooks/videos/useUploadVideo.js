import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../context/notificationcontext";

import { videosAPI } from "../../services/videosservice";

export const useUploadvideo = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    tags: "",
    published: true,
    visibility: "public",
  });
  const { showNotification } = useNotification();
  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const videoInputRef = useRef(null);
  const thumbnailInputRef = useRef(null);
  const navigate = useNavigate();

  const categories = [
    { value: "", label: "- Select category -" },
    { value: "Tech", label: "Technology" },
    { value: "Entertainment", label: "Entertainment" },
    { value: "Music", label: "Music" },
    { value: "Gaming", label: "Gaming" },
    { value: "News", label: "News & Politics" },
    { value: "Sports", label: "Sports" },
    { value: "Travel", label: "Travel" },
  ];

  const visibilityOptions = [
    {
      value: "public",
      title: "Public",
      description: "(Anyone can watch this video)",
    },
    {
      value: "private",
      title: "Private",
      description: "(Only you can watch this video)",
    },
  ];

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    if (!uploading) setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (uploading) return;
    setDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0 && files[0].type.startsWith("video/")) {
      setVideoFile(files[0]);
    }
  };

  const handleVideoFileSelect = (e) => {
    if (uploading) return;
    if (e.target.files.length > 0) {
      setVideoFile(e.target.files[0]);
    }
  };

  const handleThumbnailSelect = (e) => {
    if (uploading) return;
    if (e.target.files.length > 0) {
      setThumbnail(e.target.files[0]);
    }
  };

  const handleInputChange = (e) => {
    if (uploading) return;
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpload = async () => {
    if (!videoFile)
      return showNotification("Please select a video file to upload.", false);
    if (!formData.title.trim())
      return showNotification("Please enter a video title.", false);
    if (!formData.category)
      return showNotification("Please select a category.", false);
    if (!formData.visibility)
      return showNotification("Please select a visibility.", false);
    if (!thumbnail) {
      return showNotification("Choose a thumbnail.", false);
    }

    setUploading(true);
    const form = new FormData();
    form.append("title", formData.title);
    form.append("description", formData.description);
    form.append("category", formData.category);
    form.append("videoFile", videoFile);
    form.append("thumbnail", thumbnail);
    form.append("visibility", formData.visibility);
    form.append("tags", formData.tags);

    try {
      await videosAPI.uploadAVideo(form);
      await showNotification("Video Uploaded Successfully!", "success");

      setFormData({
        title: "",
        description: "",
        category: "",
        tags: "",
        published: true,
        visibility: "public",
      });
      setVideoFile(null);
      setThumbnail(null);
      navigate("/");
    } catch (error) {
      console.error(error);
      showNotification("Something went wrong during upload.", "error");
    } finally {
      setUploading(false);
    }
  };

  return {
    // state
    videoFile,
    thumbnail,
    formData,
    categories,
    visibilityOptions,
    dragOver,
    uploading,

    // refs
    videoInputRef,
    thumbnailInputRef,

    // functions
    setVideoFile,
    setThumbnail,
    setFormData,
    formatFileSize,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleVideoFileSelect,
    handleThumbnailSelect,
    handleInputChange,
    handleUpload,
  };
};
