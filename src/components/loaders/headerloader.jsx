import React from 'react';

const HeaderLoader = () => {
  return (
    <header className="bg-neutral-900 border-b border-neutral-800 h-16 flex items-center justify-between px-6">
      {/* Left section - Menu and Logo */}
      <div className="flex items-center space-x-6">
        {/* Menu button skeleton */}
        <div className="w-6 h-6 bg-neutral-800 rounded animate-pulse"></div>
      </div>

      {/* Center section - Search bar */}
      <div className="flex-1 max-w-2xl mx-8">
        <div className="flex items-center">
          {/* Search input skeleton */}
          <div className="flex-1 h-10 bg-neutral-900 border border-neutral-800 rounded-l-full animate-pulse">
            <div className="h-full w-full rounded-l-full animate-shimmer"></div>
          </div>

          {/* Search button skeleton */}
          <div className="w-16 h-10 bg-neutral-800 border border-neutral-700 rounded-r-full animate-pulse flex items-center justify-center">
            <div className="w-4 h-4 bg-neutral-700 rounded animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Right section - User profile */}
      <div className="flex items-center space-x-4">
        {/* Notification icon skeleton */}
        <div className="w-6 h-6 bg-neutral-800 rounded animate-pulse"></div>

        {/* Upload icon skeleton */}
        <div className="w-6 h-6 bg-neutral-800 rounded animate-pulse"></div>

        {/* Profile avatar skeleton */}
        <div className="w-8 h-8 bg-neutral-800 rounded-full animate-pulse"></div>
      </div>

      {/* Custom CSS for shimmer effect */}
      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: -200px 0;
          }
          100% {
            background-position: calc(200px + 100%) 0;
          }
        }

        .animate-shimmer {
          background: linear-gradient(
            90deg,
            #171717 0%,
            #262626 20%,
            #171717 40%,
            #171717 100%
          );
          background-size: 200px 100%;
          animation: shimmer 1.5s linear infinite;
        }
      `}</style>
    </header>
  );
};

export default HeaderLoader;
