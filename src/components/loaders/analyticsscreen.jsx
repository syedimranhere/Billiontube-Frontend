import React from 'react';
import { Users, Eye, Video, Heart } from 'lucide-react';

const AnalyticsSkeleton = () => {
    return (
        <div className=" bg-black text-white p-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-10">
                    <div className="h-8 bg-neutral-800 rounded-md w-32 mb-2 animate-pulse"></div>
                    <div className="h-4 bg-neutral-800 rounded-md w-80 animate-pulse"></div>
                </div>

                {/* Profile Section */}
                <div className="bg-neutral-900 rounded-xl p-6 mb-6 flex items-center gap-4">
                    <div className="w-16 h-16 bg-neutral-800 rounded-full animate-pulse flex-shrink-0"></div>
                    <div className="flex-1">
                        <div className="h-6 bg-neutral-800 rounded-md w-40 mb-2 animate-pulse"></div>
                        <div className="h-4 bg-neutral-800 rounded-md w-24 animate-pulse"></div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Subscribers Card */}
                    <div className="bg-neutral-900 rounded-xl p-6 relative overflow-hidden">
                        <div className="relative z-10">
                            <div className="mb-4">
                                <Users className="w-5 h-5 text-neutral-600" />
                            </div>
                            <div className="h-10 bg-neutral-800 rounded-md w-8 mb-2 animate-pulse"></div>
                            <div className="h-4 bg-neutral-800 rounded-md w-20 mb-1 animate-pulse"></div>
                            <div className="h-3 bg-neutral-800 rounded-md w-24 animate-pulse"></div>
                        </div>
                        {/* Shimmer overlay */}
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
                    </div>

                    {/* Views Card */}
                    <div className="bg-neutral-900 rounded-xl p-6 relative overflow-hidden">
                        <div className="relative z-10">
                            <div className="mb-4">
                                <Eye className="w-5 h-5 text-neutral-600" />
                            </div>
                            <div className="h-10 bg-neutral-800 rounded-md w-16 mb-2 animate-pulse"></div>
                            <div className="h-4 bg-neutral-800 rounded-md w-12 mb-1 animate-pulse"></div>
                            <div className="h-3 bg-neutral-800 rounded-md w-20 animate-pulse"></div>
                        </div>
                        {/* Shimmer overlay */}
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent" style={{ animationDelay: '0.3s' }}></div>
                    </div>

                    {/* Videos Card */}
                    <div className="bg-neutral-900 rounded-xl p-6 relative overflow-hidden">
                        <div className="relative z-10">
                            <div className="mb-4">
                                <Video className="w-5 h-5 text-neutral-600" />
                            </div>
                            <div className="h-10 bg-neutral-800 rounded-md w-12 mb-2 animate-pulse"></div>
                            <div className="h-4 bg-neutral-800 rounded-md w-16 mb-1 animate-pulse"></div>
                            <div className="h-3 bg-neutral-800 rounded-md w-18 animate-pulse"></div>
                        </div>
                        {/* Shimmer overlay */}
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent" style={{ animationDelay: '0.6s' }}></div>
                    </div>

                    {/* Likes Card */}
                    <div className="bg-neutral-900 rounded-xl p-6 relative overflow-hidden">
                        <div className="relative z-10">
                            <div className="mb-4">
                                <Heart className="w-5 h-5 text-neutral-600" />
                            </div>
                            <div className="h-10 bg-neutral-800 rounded-md w-8 mb-2 animate-pulse"></div>
                            <div className="h-4 bg-neutral-800 rounded-md w-12 mb-1 animate-pulse"></div>
                            <div className="h-3 bg-neutral-800 rounded-md w-20 animate-pulse"></div>
                        </div>
                        {/* Shimmer overlay */}
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent" style={{ animationDelay: '0.9s' }}></div>
                    </div>
                </div>

                {/* Loading indicator */}
                <div className="flex justify-center mt-8">
                    <div className="flex items-center gap-2 text-neutral-500 text-sm">
                        <div className="w-4 h-4 border-2 border-neutral-700 border-t-neutral-500 rounded-full animate-spin"></div>
                        Loading analytics data...
                    </div>
                </div>
            </div>

            <style jsx>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }s
      `}</style>
        </div>
    );
};

export default AnalyticsSkeleton;