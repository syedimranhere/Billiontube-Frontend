import React, { useState, useEffect } from 'react';
import { User, Play, Eye, MapPin, Calendar } from 'lucide-react';
import { useParams } from "react-router-dom";
import { usersAPI } from '../services/usersservice';
import { videosAPI } from '../services/videosservice';
import VideoCard from '../components/cards&buttons/videoCard';
const LoadingSkeleton = ({ className = '' }) => (
    <div className={`bg-neutral-700 animate-pulse rounded-lg ${className}`}></div>
);
const ProfilePage = () => {
    const { userId } = useParams();
    const [userData, setUserData] = useState(null);
    const [userVideos, setUserVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchUserProfile = async () => {
        try {
            setLoading(true);
            setError(null);
            const [userResponse, videosResponse] = await Promise.all([
                await usersAPI.getUser(userId),
                await videosAPI.getAUsersVideo(userId)
            ]);
            setUserData(userResponse.data);
            setUserVideos(videosResponse.data);

        } catch (err) {
            setError('Failed to load user profile. Please try again later.');
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => { fetchUserProfile(); }, [userId]);

    if (error) {
        return (
            <div className="min-h-screen bg-neutral-900 text-white flex items-center justify-center">
                <div className="text-center space-y-4">
                    <h2 className="text-2xl font-bold">⚠️ Something went wrong</h2>
                    <p className="text-neutral-400">{error}</p>
                    <button
                        onClick={fetchUserProfile}
                        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors font-medium"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }


    return (
        <div className="min-h-screen bg-black text-white">
            <div className="flex max-w-6xl mx-auto">
                {/* Sidebar */}
                <aside className="w-64 p-4 border-r border-neutral-800 bg-neutral-950/40">
                    {/* Avatar */}
                    <div className="flex justify-center mb-6">
                        {loading ? (
                            <LoadingSkeleton className="w-28 h-28 rounded-full" />
                        ) : (
                            <div className="w-28 h-28 rounded-full bg-neutral-200 border-4 border-neutral-700 overflow-hidden shadow-md">
                                {userData?.avatar ? (
                                    <img
                                        src={userData.avatar}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <User className="w-14 h-14 text-neutral-400" />
                                )}
                            </div>
                        )}
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold mb-4 text-center text-neutral-300">
                            Statistics
                        </h3>
                        {loading ? (
                            <>
                                <LoadingSkeleton className="h-14 rounded-xl" />
                                <LoadingSkeleton className="h-14 rounded-xl" />
                            </>
                        ) : (
                            <div className="flex flex-col gap-4">
                                {/* Videos Card */}
                                <div className="bg-neutral-900 rounded-xl p-4 text-center border border-neutral-800 hover:border-neutral-600 shadow-md transition-all">
                                    <div className="flex items-center justify-center mb-2">
                                        <Play className="w-4 h-4 text-blue-400 mr-2" />
                                        <span className="text-sm text-neutral-400">Videos</span>
                                    </div>
                                    <div className="text-2xl font-bold text-white">
                                        {userVideos.length}
                                    </div>
                                </div>

                                {/* Total Views Card */}
                                <div className="bg-neutral-900 rounded-xl p-4 text-center border border-neutral-900 hover:border-neutral-600 shadow-md transition-all">
                                    <div className="flex items-center justify-center mb-2">
                                        <Eye className="w-4 h-4 text-yellow-500 mr-2" />
                                        <span className="text-sm text-neutral-400">Total Views</span>
                                    </div>
                                    <div className="text-2xl font-bold text-white">
                                        {userData.totalViews}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </aside>

                {/* Main */}
                <main className="flex-1">
                    {/* Header */}
                    <section className="p-4 border-b border-neutral-800">
                        {loading ? (
                            <div className="space-y-3">
                                <LoadingSkeleton className="h-8 w-48" />
                                <LoadingSkeleton className="h-5 w-40" />
                            </div>
                        ) : (
                            <div>
                                <div className="flex items-center space-x-3 mb-2">
                                    <h1 className="text-2xl font-bold">{userData?.fullname}</h1>
                                    <span className="text-neutral-400">@{userData?.username}</span>
                                </div>
                                <div className="flex items-center space-x-4 text-neutral-400 text-sm flex-wrap">
                                    <div className="flex items-center space-x-1">
                                        <MapPin className="w-4 h-4" />
                                        <span>{userData?.country}</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <User className="w-4 h-4" />
                                        <span>{userData?.gender === "Male" ? "he/him" : "she/her"}</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <Calendar className="w-4 h-4" />
                                        <span>
                                            Joined{" "}
                                            {userData?.createdAt &&
                                                new Date(userData.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </section>

                    <div className="flex">
                        <section className="flex-1 p-4">
                            <h2 className="text-lg font-semibold mb-4">🎥 Latest Videos</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                                {loading
                                    ? Array(7)
                                        .fill(0)
                                        .map((_, i) => <VideoCard key={i} isLoading={true} />)
                                    : userVideos.map((vid) => (
                                        <VideoCard
                                            key={vid._id}
                                            videoId={vid._id}
                                            views={vid.views}
                                            title={vid.title}
                                            thumbnail={vid.thumbnail}
                                            timeAgo={vid.timeAgo}
                                            timestamps={vid.uploadDate}
                                            owner={vid.owner._id}
                                            duration={vid.duration}
                                            channelName={vid.owner.fullname}
                                            channelAvatar={vid.owner.avatar}
                                            description={vid.description}
                                        />
                                    ))}
                            </div>
                            {!loading && userVideos.length === 0 && (
                                <div className="text-center py-8 text-neutral-400">
                                    <Play className="w-12 h-12 mx-auto mb-2 opacity-50" />
                                    <p>No videos uploaded yet</p>
                                </div>
                            )}
                        </section>
                    </div>
                </main>
            </div>
        </div>

    );
};

export default ProfilePage;
