
const VideoPageLoader = () => {
    return (
        <div className="min-h-screen bg-black text-white pt-14 sm:pt-16">
            <div className="mx-auto max-w-[1750px] px-4 sm:px-6 lg:px-8 py-4 grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_402px] gap-6">
                {/* Main */}
                <div>
                    <div className="w-full aspect-video bg-neutral-900 rounded-xl border border-neutral-800 animate-pulse" />
                    <div className="mt-4 space-y-2">
                        <div className="h-6 bg-neutral-900 rounded w-4/5 animate-pulse" />
                        <div className="h-4 bg-neutral-900 rounded w-2/5 animate-pulse" />
                    </div>
                    <div className="mt-6 h-28 bg-neutral-900 rounded-xl border border-neutral-800 animate-pulse" />
                    <div className="mt-6 space-y-4">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="flex gap-3">
                                <div className="w-10 h-10 rounded-full bg-neutral-900 animate-pulse" />
                                <div className="flex-1 space-y-2">
                                    <div className="h-4 bg-neutral-900 rounded w-1/3 animate-pulse" />
                                    <div className="h-4 bg-neutral-900 rounded w-2/3 animate-pulse" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <aside className="space-y-4">

                    {[...Array(6)].map((_, i) => (
                        <div
                            key={i}
                            className="rounded-lg border border-neutral-900 bg-neutral-925 p-3 animate-pulse"
                        >
                            <div className="w-full aspect-video bg-neutral-900 rounded" />
                            <div className="mt-3 space-y-2">
                                <div className="h-4 bg-neutral-900 rounded" />
                                <div className="h-4 bg-neutral-900 rounded w-3/4" />
                            </div>
                        </div>
                    ))}
                </aside>
            </div>
        </div>
    );
};

export default VideoPageLoader;