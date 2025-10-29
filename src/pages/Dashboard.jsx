import React, { useState, useEffect } from 'react';
import { Users, Video, Eye, Heart } from 'lucide-react';
import { StatCard, LargeStatCard } from '../components/cards&buttons/statsCard';
import AnalyticsSkeleton from '../components/loaders/analyticsscreen';
import { usersAPI } from '../services/usersservice';
const Dashboard = () => {


    const [stats, setStats] = useState({
        subscribers: "",
        views: 0,
        totalVideos: 0,
        likes: 0,
        avatar: "",
        fullname: "",
        username: "",
        email: "",
    });
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchStats = async () => {
            try {
                setLoading(true)
                const response = await usersAPI.getUSerStats();
                setStats(response.data);
                setLoading(false)

            } catch (error) {
                console.error('Error fetching stats:', error);
            }
        };
        fetchStats();
    }, []);


    if (loading) {
        return (
            <AnalyticsSkeleton />
        )
    }
    return (
        <div className="min-h-screen bg-black text-white pt-14 sm:pt-16">
            <div className="max-w-6xl mx-auto px-6 py-8">
                {/* Header */}
                <div className="mb-12">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h1 className="text-3xl font-semibold text-white mb-2">
                                Analytics
                            </h1>
                            <p className="text-neutral-400">
                                Track your content performance and audience engagement
                            </p>

                        </div>
                    </div>

                    {/* User Info */}
                    <div className=" rounded-lg p-6  bg-gradient-to-l from-indigo-950">
                        <div className="flex items-center space-x-6">
                            {/* Avatar */}
                            <div className="w-20 h-20 rounded-sm overflow-hidden bg-neutral-800 flex items-center justify-center">
                                {stats.avatar ? (
                                    <img
                                        src={stats.avatar}
                                        alt={stats.fullname || "User"}
                                        className="w-full h-full object-cover"
                                        onError={(e) => { e.target.style.display = "none"; }} // fallback if broken
                                    />
                                ) : (
                                    <span className="text-2xl font-medium text-neutral-100">
                                        {stats.fullname?.charAt(0) || "U"}
                                    </span>
                                )}
                            </div>

                            {/* User Info */}
                            <div>
                                <h2 className="text-2xl font-semibold text-white">
                                    {stats.fullname}
                                </h2>
                                <p className="text-neutral-200 text-lg">{stats.username}</p>
                            </div>
                        </div>
                    </div>


                </div>

                {/* Main Stats Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    <LargeStatCard
                        icon={Users}
                        title="Subscribers"
                        value={stats.subscribers}
                        subtitle="Total subscribers"
                    />
                    <LargeStatCard
                        icon={Eye}
                        title="Views"
                        value={stats.views}
                        subtitle="Total views"
                    />
                </div>

                {/* Secondary Stats Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 ">
                    <StatCard
                        icon={Video}
                        title="Videos"
                        value={stats.totalVideos}
                        subtitle="Published"
                    />
                    <StatCard
                        icon={Heart}
                        title="Likes"
                        value={stats.likes}
                        subtitle="Total likes"
                    />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;