import { useRef } from "react";
import {
    Save,
    X,
    Camera,
    Loader2,
} from "lucide-react";
export const EditModal = ({
    editForm,
    onTitleChange,
    onDescriptionChange,
    onThumbnailChange,
    onVisibilityChange,
    onSave,
    onCancel,
    saving,
}) => {
    const fileInputRef = useRef(null);
    const handleThumbnailClick = () => {
        fileInputRef.current?.click();
    };
    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-neutral-900 border border-neutral-800 rounded-lg w-full max-w-lg shadow-xl max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <h2 className="text-xl font-semibold text-white mb-4">Edit Video</h2>

                    {/* Thumbnail Preview */}
                    <div className="mb-4">
                        <div className="aspect-video bg-neutral-900 overflow-hidden rounded-md relative">
                            <img
                                src={editForm.thumbnail}
                                alt="Thumbnail Preview"
                                className="w-full h-full object-cover"
                            />
                            <div
                                className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity cursor-pointer flex items-center justify-center"
                                onClick={handleThumbnailClick}
                            >
                                <div className="bg-white/10 backdrop-blur-md rounded-md px-4 py-2 flex items-center gap-2">
                                    <Camera className="w-5 h-5 text-white" />
                                    <span className="text-white text-xs">Change Thumbnail</span>
                                </div>
                            </div>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={onThumbnailChange}
                            />
                        </div>
                    </div>

                    {/* Title */}
                    <div className="mb-3">
                        <label className="block text-xs font-medium text-neutral-400 mb-1">
                            Title
                        </label>
                        <input
                            type="text"
                            value={editForm.title}
                            onChange={onTitleChange}
                            className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-md text-white text-sm focus:outline-none focus:border-neutral-400"
                        />
                    </div>

                    {/* Description */}
                    <div className="mb-4">
                        <label className="block text-xs font-medium text-gray-400 mb-1">
                            Description
                        </label>
                        <textarea
                            value={editForm.description}
                            onChange={onDescriptionChange}
                            rows={3}
                            className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-md text-white text-sm resize-none focus:outline-none focus:border-gray-500"
                        />
                    </div>

                    {/* Visibility */}
                    <div className="mb-4">
                        <label className="block text-xs font-medium text-gray-400 mb-2">
                            Visibility
                        </label>
                        <div className="flex gap-4 text-sm text-white">
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="visibility"
                                    value="public"
                                    checked={editForm.visibility === "public"}
                                    onChange={onVisibilityChange}
                                    className="accent-green-600"
                                />
                                Public
                            </label>
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="visibility"
                                    value="private"
                                    checked={editForm.visibility === "private"}
                                    onChange={onVisibilityChange}
                                    className="accent-yellow-600"
                                />
                                Private
                            </label>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 justify-end">
                        <button
                            onClick={onCancel}
                            className="flex items-center gap-1 px-3 py-2 bg-neutral-800 text-white rounded-md hover:bg-neutral-700 text-sm"
                            disabled={saving}
                        >
                            <X className="w-4 h-4" />
                            Cancel
                        </button>
                        <button
                            onClick={onSave}
                            disabled={saving}
                            className="flex items-center gap-2 px-3 py-2 bg-white text-black rounded-md hover:bg-gray-200 text-sm font-medium disabled:opacity-70"
                        >
                            {saving ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" /> Saving...
                                </>
                            ) : (
                                <>
                                    <Save className="w-4 h-4" /> Save
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};