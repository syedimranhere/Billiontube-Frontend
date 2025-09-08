import { useState, useEffect } from 'react';
import { History, X, Trash2 } from 'lucide-react';
import { WatchhistoryAPI } from '../services/watchhistoryservice';
import { useNotification } from '../context/notificationcontext';
import { timeAgo, formatViews } from '../utils/timeago';
import { Blueloader } from '../components/loaders/blueloader';
import { VideoCard3 } from '../components/cards&buttons/historyCard';
const WatchHistory = () => {
    const showNotification = useNotification();
    const [loading, setLoading] = useState(true);
    const [watchHistory, setWatchHistory] = useState([]);
    const [showClearModal, setShowClearModal] = useState(false);
    useEffect(() => {
        const fetchWatchHistory = async () => {
            setLoading(true);
            try {
                const response = await WatchhistoryAPI.fetchWatchHistory();
                setWatchHistory(response.data);

                setLoading(false)
            } catch (error) {
                console.error('Error fetching watch history:', error);
                setLoading(false);
                showNotification('Failed to fetch watch history', 'error');
            }
        };
        fetchWatchHistory();
    }, []);
    const removeFromHistory = async (videoId, title) => {
        try {
            await WatchhistoryAPI.removeVideofromWatchHistory(videoId)
            setWatchHistory(prev => prev.filter(vid => vid.video._id !== videoId));
            showNotification(`"${title}" removed from watch history`);

        } catch (error) {
            showNotification('Failed to remove from history', 'error');
            console.error('Error removing from history:', error);
        }
    };

    const clearAllHistory = async () => {
        try {
            const response = await WatchhistoryAPI.clearWatchHistory();
            if (response === 200) {
                setWatchHistory([]);
                showNotification('Watch history cleared successfully');
                setShowClearModal(false);

            }
        } catch (error) {
            showNotification('Failed to clear history', 'error');
            console.error('Error clearing history:', error);
        }
    };
    if (loading) {
        return (
            <Blueloader />
        );
    }
    return (
        <div className="min-h-screen bg-black text-white">
            {/* Clear History Modal */}
            {showClearModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-neutral-900 rounded-lg border border-neutral-700 p-4 sm:p-6 max-w-sm sm:max-w-md w-full">
                        {/* Header */}
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-8 h-8 bg-red-600/20 rounded-full flex items-center justify-center flex-shrink-0">
                                <Trash2 className="text-red-500 w-4 h-4" />
                            </div>
                            <h2 className="text-lg font-semibold text-white">Clear Watch History</h2>
                        </div>

                        {/* Content */}
                        <div className="mb-6">
                            <p className="text-gray-300 mb-2 text-sm">
                                Are you sure you want to clear your entire watch history?
                            </p>
                            <p className="text-red-400 text-xs">
                                This action cannot be undone. All your watched videos will be permanently removed.
                            </p>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row gap-3">
                            <button
                                onClick={() => setShowClearModal(false)}
                                className="flex-1 px-4 py-2 text-neutral-300 hover:text-white bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors border border-gray-700 text-sm"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={clearAllHistory}
                                className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors font-medium text-sm"
                            >
                                Clear All History
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Header */}
            <div className="px-2 sm:px-3 md:px-4 py-3 sm:py-4 border-b border-neutral-800">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                        <History className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 flex-shrink-0" />
                        <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-white">Watch History</h1>
                    </div>

                    {/* Clear All Button */}
                    {watchHistory.length > 0 && (
                        <button
                            onClick={() => setShowClearModal(true)}
                            className="flex items-center gap-2 px-3 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg transition-colors border border-gray-600 text-sm"
                        >
                            <Trash2 className="w-4 h-4" />
                            <span className="hidden sm:inline">Clear all history</span>
                            <span className="sm:hidden">Clear all</span>
                        </button>
                    )}
                </div>
            </div>

            {/* Main Content */}
            <div className="px-2 sm:px-3 md:px-4 py-3 sm:py-4">
                {watchHistory.length === 0 ? (
                    <div className="flex flex-col items-center justify-center text-center px-4 py-12">
                        <History className="w-12 h-12 text-gray-600 mb-4" />
                        <h2 className="text-xl font-semibold text-white mb-2">No Watch History</h2>
                        <p className="text-gray-400 text-sm">You have not watched any videos yet</p>
                    </div>
                ) : (
                    <div className="space-y-0">
                        {watchHistory.map((item) => {
                            const video = item.video;
                            return (
                                <VideoCard3
                                    key={item._id || item.video._id}
                                    video={video}
                                    item={item}
                                    removeFromHistory={removeFromHistory}
                                />
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default WatchHistory;