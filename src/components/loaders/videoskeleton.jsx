const VideoSkeleton = () => {
    return (
        <div className="bg-neutral-900 rounded-xl overflow-hidden shadow-md">
            {/* Thumbnail skeleton */}
            <div className="relative w-full aspect-video bg-neutral-800 animate-pulse rounded-xl">
                <div className="absolute bottom-2 right-2 bg-neutral-700 rounded px-2 py-0.5">
                    <div className="h-3 w-10 bg-neutral-600 rounded-full animate-pulse"></div>
                </div>
            </div>

            {/* Video info */}
            <div className="p-3 flex space-x-3">
                {/* Avatar */}
                <div className="w-10 h-10 bg-neutral-700 rounded-full animate-pulse flex-shrink-0"></div>
                <div className="flex-1 space-y-2">
                    <div className="h-4 bg-neutral-700 rounded animate-pulse w-3/4"></div>
                    <div className="h-4 bg-neutral-700 rounded animate-pulse w-1/2"></div>
                    <div className="h-3 bg-neutral-800 rounded animate-pulse w-1/3"></div>
                </div>
            </div>
        </div>
    );
};

const SmoothSkeletonLoader = () => {
    return (
        <div className="min-h-screen bg-black p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3 gap-6">
                {[...Array(12)].map((_, i) => (
                    <div
                        key={i}
                        className="animate-pulse"
                        style={{ animationDelay: `${i * 0.05}s` }} // stagger
                    >
                        <VideoSkeleton />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SmoothSkeletonLoader;
