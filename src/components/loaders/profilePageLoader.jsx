import React from 'react';

const VideoPageLoader = () => {
    const videoCards = Array.from({ length: 3 }, (_, i) => i);
    return (
        <div className="min-h-screen bg-black text-neutral-300 pt-14 sm:pt-16">

            <div className="min-h-screen bg-black text-white">
                <div className="p-3 sm:p-4 max-w-full">
                    {/* Profile Section */}
                    <div className="flex flex-col sm:flex-row sm:items-start gap-3 mb-6 w-full">
                        {/* Avatar */}
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-neutral-800 overflow-hidden flex-shrink-0 shimmer-container"></div>

                        {/* Profile Info */}
                        <div className="flex flex-col gap-1">
                            {/* Name */}
                            <div className="w-32 h-5 bg-neutral-800 rounded shimmer-container"></div>

                            {/* Handle */}
                            <div className="w-20 h-3 bg-neutral-900 rounded shimmer-container"></div>

                            {/* Meta Info */}
                            <div className="flex flex-wrap items-center gap-2 mt-1">
                                <div className="w-14 h-3 bg-neutral-900 rounded shimmer-container"></div>
                                <div className="w-16 h-3 bg-neutral-900 rounded shimmer-container"></div>
                                <div className="w-20 h-3 bg-neutral-900 rounded shimmer-container"></div>
                            </div>
                        </div>
                    </div>

                    {/* Stats Section */}
                    <div className="flex gap-2 mb-5">
                        <div className="bg-neutral-900 rounded-md p-2 text-center min-w-[60px]">
                            <div className="w-8 h-2.5 bg-neutral-800 rounded mx-auto mb-1 shimmer-container"></div>
                            <div className="w-4 h-4 bg-neutral-700 rounded mx-auto shimmer-container"></div>
                        </div>

                        <div className="bg-neutral-900 rounded-md p-2 text-center min-w-[60px]">
                            <div className="w-7 h-2.5 bg-neutral-800 rounded mx-auto mb-1 shimmer-container"></div>
                            <div className="w-4 h-4 bg-neutral-700 rounded mx-auto shimmer-container"></div>
                        </div>
                    </div>

                    {/* Section Header */}
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-4 h-4 bg-neutral-800 rounded shimmer-container"></div>
                        <div className="w-24 h-5 bg-neutral-800 rounded shimmer-container"></div>
                    </div>

                    {/* Video Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
                        {videoCards.map((index) => (
                            <div key={index} className="group cursor-pointer">
                                {/* Video Thumbnail */}
                                <div className="relative aspect-[16/10] bg-neutral-900 rounded-md overflow-hidden mb-1.5 shimmer-container">
                                    {/* Duration Badge */}
                                    <div className="absolute bottom-1 right-1">
                                        <div className="w-5 h-2.5 bg-black bg-opacity-90 rounded shimmer-container"></div>
                                    </div>
                                </div>

                                {/* Video Info */}
                                <div className="space-y-0.5 px-1">
                                    <div className="w-full h-2.5 bg-neutral-800 rounded shimmer-container"></div>

                                    <div className="flex items-center gap-1 text-[11px]">
                                        <div className="w-7 h-2.5 bg-neutral-900 rounded shimmer-container"></div>
                                        <span className="text-neutral-600">•</span>
                                        <div className="w-10 h-2.5 bg-neutral-900 rounded shimmer-container"></div>
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