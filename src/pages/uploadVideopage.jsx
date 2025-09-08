
import { useUploadvideo } from '../hooks/videos/useUploadVideo';
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
        <div className="min-h-screen bg-black text-white px-6 py-12 font-sans">
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
                    className={`rounded-xl border-2 border-dashed p-12 text-center cursor-pointer transition-colors
          ${dragOver ? "border-gray-400 bg-neutral-900" : "border-neutral-700 hover:border-gray-500"}
          ${dragOver ? "border-gray-400 bg-neutral-900" : "border-neutral-700 hover:border-gray-500"}
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
              ${videoFile ? "bg-green-600 text-black" : "bg-neutral-800 text-gray-300"}
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
                            className="w-full p-4 rounded-lg bg-neutral-900 border border-neutral-700 text-white placeholder-gray-500 focus:outline-none focus:border-gray-400"
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
                            className="w-full p-4 rounded-lg bg-neutral-900 border border-neutral-700 text-white placeholder-gray-500 focus:outline-none focus:border-gray-400"
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
                            className="w-full p-4 rounded-lg bg-neutral-900 border border-neutral-700 text-white placeholder-gray-500 focus:outline-none focus:border-gray-400"
                        />
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                            className="w-full p-4 rounded-lg bg-neutral-900 border border-neutral-700 text-white focus:outline-none focus:border-gray-400"
                        >
                            {categories.map((cat) => (
                                <option key={cat.value} value={cat.value}>
                                    {cat.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Thumbnail */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Thumbnail</label>
                        <div
                            onClick={() => !uploading && thumbnailInputRef.current?.click()}
                            className={`w-40 h-24 flex items-center justify-center border-2 border-dashed rounded-lg cursor-pointer
              ${thumbnail ? "border-green-600 bg-neutral-900" : "border-neutral-700 hover:border-gray-500"}
            `}
                        >
                            {thumbnail ? "✓ Selected" : "Upload Thumbnail"}
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
                                    className={`flex items-center p-4 rounded-lg border cursor-pointer
                  ${formData.visibility === option.value
                                            ? "border-gray-400 bg-neutral-900"
                                            : "border-neutral-700 hover:border-gray-500"}
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
                        className={`w-full py-4 rounded-lg text-white font-semibold
            ${uploading
                                ? "bg-neutral-700 cursor-not-allowed"
                                : "bg-neutral-800 hover:bg-neutral-700"}
          `}
                    >
                        {uploading ? "Uploading..." : "Upload Video"}
                    </button>
                </div>
            </div>

            {/* basic loader */}
            {uploading && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center z-50">

                    <div className="relative flex items-center justify-center">
                        <div className="w-16 h-16 border-4 border-zinc-700 rounded-full animate-spin border-t-blue-500"></div>
                        <span className="absolute w-8 h-8 bg-blue-500 rounded-full animate-pulse"></span>
                    </div>


                    <p className="mt-6 text-xl font-semibold text-zinc-200 tracking-wide">
                        Uploading your video - {formData.title}                    </p>

                </div>

            )}
        </div>
    );

};

export default VideoUploadPage;
