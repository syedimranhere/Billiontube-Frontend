import React from 'react';

const VideoPageLoader = () => {
    const videoCards = Array.from({ length: 6 }, (_, i) => i);
    return (
        <div className="min-h-screen bg-black text-neutral-300">

            <div className="min-h-screen bg-black text-white">
                <div className="p-4 sm:p-6 max-w-full">

                    {/* Profile Section - Left Aligned */}
                    <div className="flex flex-col sm:flex-row sm:items-start gap-4 mb-8 w-full">
                        {/* Avatar */}
                        <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full bg-neutral-800 overflow-hidden flex-shrink-0 shimmer-container">
                        </div>

                        {/* Profile Info */}
                        <div className="flex flex-col gap-2">
                            {/* Name */}
                            <div className="w-44 h-8 bg-neutral-800 rounded-md overflow-hidden relative shimmer-container">
                            </div>

                            {/* Handle */}
                            <div className="w-28 h-5 bg-neutral-900 rounded overflow-hidden relative shimmer-container">
                            </div>

                            {/* Meta Info */}
                            <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-1">
                                <div className="w-16 sm:w-20 h-4 bg-neutral-900 rounded overflow-hidden relative shimmer-container">
                                </div>
                                <div className="w-20 sm:w-24 h-4 bg-neutral-900 rounded overflow-hidden relative shimmer-container">
                                </div>
                                <div className="w-28 sm:w-32 h-4 bg-neutral-900 rounded overflow-hidden relative shimmer-container">
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stats Section - Left Aligned */}
                    <div className="flex gap-3 mb-6">
                        <div className="bg-neutral-900 rounded-lg p-2 sm:p-3 text-center min-w-[70px] sm:min-w-[80px]">
                            <div className="w-10 sm:w-12 h-3 bg-neutral-800 rounded mx-auto mb-1 relative shimmer-container">
                            </div>
                            <div className="w-5 sm:w-6 h-5 sm:h-6 bg-neutral-700 rounded mx-auto relative shimmer-container">
                            </div>
                        </div>

                        <div className="bg-neutral-900 rounded-lg p-2 sm:p-3 text-center min-w-[70px] sm:min-w-[80px]">
                            <div className="w-8 sm:w-10 h-3 bg-neutral-800 rounded mx-auto mb-1 relative shimmer-container">
                            </div>
                            <div className="w-5 sm:w-6 h-5 sm:h-6 bg-neutral-700 rounded mx-auto relative shimmer-container">
                            </div>
                        </div>
                    </div>

                    {/* Section Header - Left Aligned */}
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-5 sm:w-6 h-5 sm:h-6 bg-neutral-800 rounded relative shimmer-container">
                        </div>
                        <div className="w-28 sm:w-32 h-6 sm:h-7 bg-neutral-800 rounded relative shimmer-container">
                        </div>
                    </div>

                    {/* Video Grid - Left Aligned */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-4 sm:gap-6">
                        {videoCards.map((index) => (
                            <div key={index} className="group cursor-pointer">
                                {/* Video Thumbnail */}
                                <div className="relative aspect-video bg-neutral-900 rounded-lg overflow-hidden mb-3 sm:mb-4 shimmer-container">

                                    {/* Duration Badge */}
                                    <div className="absolute bottom-2 sm:bottom-3 right-2 sm:right-3">
                                        <div className="relative w-7 sm:w-8 h-4 sm:h-5 bg-black bg-opacity-90 rounded overflow-hidden shimmer-container">
                                        </div>
                                    </div>

                                    {/* Play Button Overlay */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="relative w-10 sm:w-12 h-10 sm:h-12 bg-neutral-600 bg-opacity-30 rounded-full overflow-hidden shimmer-container">
                                        </div>
                                    </div>
                                </div>

                                {/* Video Info */}
                                <div className="space-y-2 px-1">
                                    <div className="w-full h-4 sm:h-5 bg-neutral-800 rounded overflow-hidden relative shimmer-container">
                                    </div>

                                    <div className="flex items-center gap-2 text-xs sm:text-sm">
                                        <div className="w-10 sm:w-12 h-3 sm:h-4 bg-neutral-900 rounded overflow-hidden relative shimmer-container">
                                        </div>
                                        <span className="text-neutral-600">•</span>
                                        <div className="w-16 sm:w-20 h-3 sm:h-4 bg-neutral-900 rounded overflow-hidden relative shimmer-container">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
            <style jsx>{`
                @keyframes shimmer {
                    0% {
                        transform: translateX(-100%);
                    }
                    100% {
                        transform: translateX(100%);
                    }
                }
                
                .shimmer {
                    animation: shimmer 2s infinite linear;
                }
                
                .shimmer-container {
                    position: relative;
                    overflow: hidden;
                }
                
                .shimmer-container::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(
                        90deg,
                        transparent,
                        rgba(255, 255, 255, 0.1),
                        transparent
                    );
                    animation: shimmer 2s infinite linear;
                }
            `}</style>

        </div>
    );
};

export default VideoPageLoader;