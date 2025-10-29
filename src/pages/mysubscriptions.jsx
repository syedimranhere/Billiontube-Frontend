import { useState, useEffect } from "react";
import { X, Users, } from "lucide-react";
import { Link } from "react-router-dom";
import { Blueloader } from "../components/loaders/blueloader";
import { useNotification } from "../context/notificationcontext";
import { SubscriptionsAPI } from "../services/subscriptions";
const Mysubscriptions = () => {
    const [loading, setLoading] = useState(false);
    const [subscriptions, setSubscriptions] = useState([]);
    const { showNotification } = useNotification();

    useEffect(() => {
        const fetchSubscriptions = async () => {
            try {
                setLoading(true);
                const response = await SubscriptionsAPI.fetchSubscriptions();
                setSubscriptions(response.data);
                setTimeout(() => setLoading(false), 800);
            } catch (error) {
                console.error("Error fetching subscriptions:", error);
                setLoading(false);
                showNotification("Failed to fetch subscriptions", "error");
            }
        };
        fetchSubscriptions();
    }, []);

    const removeSubscription = async (channelId, channelName) => {
        try {
            await SubscriptionsAPI.removeSubscription(channelId)
            setSubscriptions((prev) =>
                prev.filter((sub) => sub.channel._id !== channelId)
            );
            showNotification(`${channelName} unsubscribed`);
        } catch (error) {
            showNotification("Failed to remove subscription", "error");
        }
    };

    if (loading) {
        return (
            <Blueloader />
        );
    }
    return (
        <div className="min-h-screen bg-black text-white pt-14 sm:pt-16">
            {/* Header */}
            <div className="px-2 sm:px-3 md:px-4 py-3 sm:py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Users className="text-blue-400 w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
                        <h1 className="text-lg sm:text-xl md:text-2xl font-bold">My Subscriptions</h1>
                    </div>
                    <span className="text-gray-400 text-sm">
                        {subscriptions.length} channel{subscriptions.length !== 1 ? "s" : ""}
                    </span>
                </div>
            </div>

            {/* Main Content */}
            <div className="px-2 sm:px-3  md:px-4 py-3 sm:py-4">
                {subscriptions.length === 0 ? (
                    <div className="flex flex-col items-center smooch-sans justify-center text-center px-4 py-12">
                        <Users className="w-12 h-12 text-gray-600 mb-4" />
                        <h2 className="text-xl font-semibold text-white mb-2">No Subscriptions</h2>
                        <p className="text-gray-400 text-sm">
                            You haven't subscribed to any channels yet.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {subscriptions.map((subscription, index) => (
                            <div
                                key={subscription.channel?._id || index}
                                className="group relative bg-neutral-900 rounded-sm p-4 border border-neutral-900 transition-all duration-300 hover:bg-indigo-800/15"
                            >
                                <div className="flex items-center justify-between gap-4">
                                    {/* Channel Info */}
                                    <Link
                                        to={`/user-profile/${subscription.channel?._id}`}
                                        className="flex items-center gap-3 flex-1 min-w-0 hover:opacity-80"
                                    >
                                        <img
                                            src={
                                                subscription.channel?.avatar ||
                                                "https://via.placeholder.com/48x48/374151/ffffff?text=CH"
                                            }
                                            alt={subscription.channel?.fullname || "Channel"}
                                            className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                                        />
                                        <div className="min-w-0 flex-1">
                                            <h3 className="font-medium text-white truncate mb-1">
                                                {subscription.channel?.fullname || "Unknown Channel"}
                                            </h3>
                                            <div className="flex flex-col gap-1 text-xs text-gray-400">
                                                <span className="truncate">
                                                    {subscription.channel?.email || "No email"}
                                                </span>
                                                <div className="flex items-center gap-3">
                                                    <span>
                                                        Joined:{" "}
                                                        {subscription.channel?.createdAt
                                                            ? new Date(
                                                                subscription.channel.createdAt
                                                            ).toLocaleDateString()
                                                            : "Unknown"}
                                                    </span>
                                                    <span>•</span>
                                                    <span>
                                                        {subscription.channel?.category || "Technology"}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>

                                    {/* Unsubscribe Button */}
                                    <button
                                        onClick={() =>
                                            removeSubscription(
                                                subscription.channel?._id,
                                                subscription.channel?.fullname
                                            )
                                        }
                                        className="relative z-10 flex items-center gap-2 px-3 py-2 bg-red-500/20 hover:border-red-500 hover:bg-red-500/40 hover:text-white rounded-sm text-sm flex-shrink-0 transition-all duration-300"
                                        aria-label="Unsubscribe from channel"
                                    >
                                        <X className="w-4 h-4" />
                                        <span className="hidden sm:inline">Unsubscribe</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>


    );
};

export default Mysubscriptions;
