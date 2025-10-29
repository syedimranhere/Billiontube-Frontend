
import { useUploadvideo } from '../hooks/videos/useUploadVideo';
import { UploadCloud, Image as ImageIcon, CheckCircle } from "lucide-react";

const VideoUploadPage = () => {
    const {
        videoFile,
        thumbnail,
        formData,
        categories,
        visibilityOptions,
        dragOver,
        uploading,
        videoInputRef,
        thumbnailInputRef,
        formatFileSize,
        handleDragOver,
        handleDragLeave,
        handleDrop,
        handleVideoFileSelect,
        handleThumbnailSelect,
        handleInputChange,
        handleUpload,
    } = useUploadvideo();

    return (
        <div className="min-h-screen bg-black text-white px-6 py-12 font-sans pt-22 sm:pt-20">
            <div className="max-w-4xl mx-auto space-y-12">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold mb-2">Upload Video</h1>
                    <p className="text-gray-400 text-base">
                        Add your video details and publish when ready.
                    </p>
                </div>

                {/* Upload Box */}
                <div
                    className={`rounded-sm border-2 border-dashed p-12 bg-gradient-to-br  from-indigo-900 via-black text-center cursor-pointer transition-colors
          ${dragOver ? "border-gray-400 " : "border-neutral-700 hover:border-neutral-700"}
          ${dragOver ? "border-gray-400 bg-neutral-900" : "border-neutral-700 hover:border-neutral-700"}
          ${uploading ? "opacity-50 pointer-events-none" : ""}
        `}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => !uploading && videoInputRef.current?.click()}
                >
                    <div className="flex flex-col items-center justify-center">
                        <div
                            className={`w-20 h-20 flex items-center justify-center rounded-full mb-5 text-2xl font-bold
              ${videoFile ? "bg-indigo-900 text-black" : "bg-neutral-800 text-gray-300"}
            `}
                        >
                            {videoFile ? "✓" : "↑"}
                        </div>
                        <h3 className="text-lg font-medium mb-2">
                            {videoFile ? "Video Selected" : "Click or drag video here"}
                        </h3>
                        <p className="text-gray-500 text-sm">
                            {videoFile
                                ? `${videoFile.name} (${formatFileSize(videoFile.size)})`
                                : "Supported formats: MP4, MOV, WEBM (Max 100MB)"}
                        </p>
                    </div>
                    <input
                        ref={videoInputRef}
                        type="file"
                        accept="video/*"
                        className="hidden"
                        onChange={handleVideoFileSelect}
                        disabled={uploading}
                    />
                </div>

                {/* Form Section */}
                <div className={`space-y-6 ${uploading ? "opacity-50 pointer-events-none" : ""}`}>
                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            placeholder="Enter video title"
                            className="w-full p-4 rounded-sm bg-neutral-900 border border-neutral-700 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-700"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            placeholder="Add a description..."
                            rows="4"
                            className="w-full p-4 rounded-sm bg-neutral-900 border border-neutral-700 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-700"
                        />
                    </div>

                    {/* Tags */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Tags</label>
                        <input
                            type="text"
                            name="tags"
                            value={formData.tags}
                            onChange={handleInputChange}
                            placeholder="e.g. tech, coding, ai"
                            className="w-full p-4 rounded-sm bg-neutral-900 border border-neutral-700 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-700"
                        />
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                            className="w-full p-4 rounded-sm bg-neutral-900 border border-neutral-700 text-white focus:outline-none focus:border-indigo-700"
                        >
                            {categories.map((cat) => (
                                <option key={cat.value} value={cat.value}>
                                    {cat.label}
                                </option>
                            ))}
                        </select>
                    </div>


                    {/* Thumbnail */}
                    <div className="w-full max-w-sm">
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Thumbnail
                        </label>

                        <div
                            onClick={() => !uploading && thumbnailInputRef.current?.click()}
                            className={`
      flex flex-col items-center justify-center 
      w-full sm:w-64 md:w-80 h-32 sm:h-40
      border-2 border-dashed rounded-xs 
      cursor-pointer transition-all duration-200
      ${thumbnail
                                    ? "border-neutral-500 bg-gradient-to-b transition-all duration-500 from-indigo-900 via-gray-900 "
                                    : "border-neutral-700 bg-gradient-to-t from-indigo-900  via-gray-900 hover:border-gray-900 hover:bg-gradient-to-t "}
    `}
                        >
                            {thumbnail ? (
                                <div className="flex flex-col items-center text-white">
                                    <CheckCircle className="h-8 w-8 mb-2" />
                                    <span className="text-sm">Thumbnail Selected</span>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center text-gray-400">
                                    <UploadCloud className="h-10 w-10 mb-2" />
                                    <span className="text-sm text-gray-300">
                                        Click to Upload
                                    </span>
                                    <span className="text-xs text-gray-500">PNG, JPG up to 10MB</span>
                                </div>
                            )}
                        </div>

                        <input
                            ref={thumbnailInputRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleThumbnailSelect}
                            disabled={uploading}
                        />
                    </div>


                    {/* Visibility */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-3">Visibility</label>
                        <div className="flex flex-col gap-3">
                            {visibilityOptions.map((option) => (
                                <label
                                    key={option.value}
                                    className={`flex items-center p-4 rounded-sm border cursor-pointer
                  ${formData.visibility === option.value
                                            ? "border-neutral-800 bg-gradient-to-br from-green-500 via-black to-green-900 transition-colors duration-500"
                                            : "border-neutral-800 hover:border-neutral-600"}
                `}
                                >
                                    <input
                                        type="radio"
                                        name="visibility"
                                        value={option.value}
                                        checked={formData.visibility === option.value}
                                        onChange={handleInputChange}
                                        className="mr-3 accent-gray-400"
                                    />
                                    <div>
                                        <div className="font-medium">{option.title}</div>
                                        <div className="text-sm text-gray-500">{option.description}</div>
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>


                    <button
                        onClick={handleUpload}
                        disabled={uploading}
                        className={`w-full py-4 rounded-sm text-white smooch-sans
            ${uploading
                                ? " from-indigo-600 via-gray- cursor-not-allowed"
                                : "bg-gradient-to-bl from-indigo-950 via-gray-900 hover:from-indigo-800  transition-colors "}
          `}
                    >
                        {uploading ? "Uploading..." : "Upload Video"}
                    </button>
                </div>
            </div>

            {/* basic loader */}
            {uploading && (
                <div className="fixed inset-0 b  flex flex-col items-center justify-center z-50">

                    <div className="relative flex items-center justify-center">
                        <span className="loader"></span>
                    </div>


                    <p className="mt-6 text-xl font-semibold smooch-sans text-zinc-200 tracking-wide">
                        Uploading your video - {formData.title} </p>

                </div>

            )}
        </div>
    );

};

export default VideoUploadPage;
