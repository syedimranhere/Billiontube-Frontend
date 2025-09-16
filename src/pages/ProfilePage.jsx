import React, { useState, useEffect } from 'react';
import { User, Play, Eye, MapPin, Calendar } from 'lucide-react';
import { useParams } from "react-router-dom";
import { usersAPI } from '../services/usersservice';
import { videosAPI } from '../services/videosservice';
import VideoCard from '../components/cards&buttons/videoCard';
import ProfilePageLoader from '../components/loaders/profilePageLoader';
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

    if (loading) {
        return (< ProfilePageLoader />)
    }
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
            <div className="max-w-full mx-auto p-4 sm:p-6">
                {/* Header */}
                <section className="mb-6 border-b border-neutral-800 pb-6">

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                        {/* Left: Avatar + Name */}
                        <div className="flex items-center gap-4 sm:gap-6">
                            {/* Avatar */}
                            <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full bg-neutral-200 border-4 border-neutral-700 overflow-hidden shadow-lg">
                                {userData?.avatar ? (
                                    <img
                                        src={userData.avatar}
                                        className="w-full h-full object-cover"
                                        alt={`${userData?.fullname || "User"} avatar`}
                                    />
                                ) : (
                                    <User className="w-10 h-10 sm:w-12 sm:h-12 text-neutral-400 mx-auto mt-5" />
                                )}
                            </div>

                            {/* Name + Meta */}
                            <div>
                                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
                                    {userData?.fullname || "Unnamed"}
                                </h1>
                                <div className="text-neutral-400 text-sm sm:text-base mt-1">
                                    @{userData?.username ?? "unknown"}
                                </div>

                                {/* Meta Info */}
                                <div className="flex flex-wrap gap-3 text-neutral-400 text-sm sm:text-base mt-2">
                                    <div className="flex items-center gap-2">
                                        <MapPin className="w-4 h-4" />
                                        <span>{userData?.country ?? "—"}</span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <User className="w-4 h-4" />
                                        <span>
                                            {userData?.gender === "Male"
                                                ? "he/him"
                                                : userData?.gender === "Female"
                                                    ? "she/her"
                                                    : userData?.gender ?? "they/them"}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4" />
                                        <span>
                                            Joined{" "}
                                            {userData?.createdAt
                                                ? new Date(userData.createdAt).toLocaleDateString()
                                                : "—"}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right: Stats */}
                        <div className="flex gap-4">
                            <div className="flex flex-col items-center px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800">
                                <span className="text-sm text-neutral-400 flex items-center gap-1">
                                    <Play className="w-4 h-4 text-blue-400" /> Videos
                                </span>
                                <span className="text-lg font-bold text-white">
                                    {userVideos?.length ?? 0}
                                </span>
                            </div>
                            <div className="flex flex-col items-center px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800">
                                <span className="text-sm text-neutral-400 flex items-center gap-1">
                                    <Eye className="w-4 h-4 text-yellow-500" /> Views
                                </span>
                                <span className="text-lg font-bold text-white">
                                    {userData?.totalViews ?? 0}
                                </span>
                            </div>
                        </div>
                    </div>

                </section>

                {/* Latest Videos */}
                <section>
                    <h2 className="text-2xl font-semibold mb-6">🎥 Latest Videos</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                        {userVideos?.map((vid) => (
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
                                className="h-full"
                            />
                        ))}
                    </div>

                    {!loading && (userVideos?.length ?? 0) === 0 && (
                        <div className="text-center py-12 text-neutral-400">
                            <Play className="w-16 h-16 mx-auto mb-4 opacity-50" />
                            <p>No videos uploaded yet</p>
                        </div>
                    )}
                </section>
            </div>
        </div>
    );

};

export default ProfilePage;
