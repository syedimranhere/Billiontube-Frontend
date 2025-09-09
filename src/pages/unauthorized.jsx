import { useNavigate } from "react-router-dom";
import { Lock, ArrowRight, Home, Info } from "lucide-react";
import { useEffect } from "react";
import { UseUserContext } from "../context/AuthContext";
import { Blueloader } from "../components/loaders/blueloader";
export default function AuthRequiredPage() {
    const navigate = useNavigate();
    const { Authenticated, loading } = UseUserContext();

    useEffect(() => {

        if (!loading && Authenticated) {
            navigate("/");
        }

    }, [Authenticated, loading])

    if (loading) {
        if (loading) {
            return (
                <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white gap-4">
                    <Blueloader />
                    <p>Checking authentication...</p>
                </div>
            );
        }

    }
    return (
        <div className="min-h-screen bg-black relative overflow-hidden">
            {/* Background Glow Effects */}
            <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-64 h-24 sm:w-80 sm:h-28 lg:w-96 lg:h-32 bg-neutral-600 rounded-full blur-3xl opacity-6"></div>
            <div className="absolute bottom-1/3 left-1/6 sm:left-1/4 w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 bg-red-900 rounded-full blur-3xl opacity-8"></div>
            <div className="absolute top-1/2 right-1/6 sm:right-1/4 w-56 h-56 sm:w-72 sm:h-72 lg:w-80 lg:h-80 bg-neutral-500 rounded-full blur-3xl opacity-4"></div>

            {/* Header */}
            <div className="absolute top-0 left-0 right-0 z-60 p-4 sm:p-6">
                <div className="flex justify-between items-center max-w-7xl mx-auto">
                    <h1
                        onClick={() => navigate("/")}
                        className="cursor-pointer text-2xl sm:text-3xl font-bold text-white tracking-tight"
                    >
                        BillionTube
                    </h1>


                    <button
                        onClick={() => navigate("/")}
                        className="sm:hidden inline-flex items-center gap-2 text-neutral-400 hover:text-white transition"
                    >
                        <Home className="w-4 h-4" />
                        Home
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 pt-16 pb-8 sm:pt-20 sm:pb-12 relative z-10">
                <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg">
                    <div className="bg-neutral-900/95 backdrop-blur-xl border border-neutral-800/80 rounded-2xl p-6 sm:p-8 lg:p-12 shadow-2xl relative">
                        <div className="absolute inset-0 bg-gradient-to-b from-red-900/10 via-transparent to-transparent rounded-2xl pointer-events-none"></div>

                        <div className="relative z-10 text-center space-y-6 sm:space-y-8">
                            {/* Lock Icon */}
                            <div className="flex justify-center">
                                <div className="p-3 sm:p-4 rounded-full bg-red-500/10 border border-red-500/20">
                                    <Lock className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-red-400/80" />
                                </div>
                            </div>

                            {/* Heading */}
                            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                                Authentication Required
                            </h1>
                            <p className="text-lg sm:text-xl text-neutral-300 font-medium px-2">
                                Oops! Looks like you don’t have access to this content.
                            </p>
                            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed px-2">
                                You need to be signed in to access this. Create an account or
                                sign in to continue watching.
                            </p>

                            {/* Buttons */}
                            <div className="space-y-4 pt-2 sm:pt-4">
                                <div className="flex flex-col sm:flex-row sm:gap-3 justify-center space-y-3 sm:space-y-0">
                                    <button
                                        onClick={() => navigate("/signup")}
                                        className="w-full sm:w-auto min-w-[140px] bg-white text-black font-semibold hover:bg-neutral-200 hover:shadow-lg px-4 py-2.5 sm:px-6 sm:py-3 rounded-lg transition"
                                    >
                                        Create Account
                                    </button>
                                    <button
                                        onClick={() => navigate("/login")}
                                        className="w-full sm:w-auto min-w-[140px] border border-neutral-700 text-neutral-300 hover:bg-neutral-800 hover:border-neutral-600 hover:shadow-md px-4 py-2.5 sm:px-6 sm:py-3 rounded-lg transition inline-flex items-center justify-center gap-2"
                                    >
                                        Sign In
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                </div>

                                <div className="pt-4 sm:pt-6 border-t border-neutral-800">
                                    <p className="text-sm text-neutral-500 mb-3">
                                        Just want to browse?
                                    </p>
                                    <button
                                        onClick={() => navigate("/")}
                                        className="w-full sm:w-auto text-neutral-400 hover:text-white px-3 py-2 rounded-lg transition"
                                    >
                                        Explore public content
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Info Card */}
                    <div className="mt-4 sm:mt-6 bg-neutral-950/60 backdrop-blur border border-neutral-800/50 rounded-xl p-4 sm:p-6 text-center">
                        <div className="flex items-center justify-center gap-2 text-neutral-400 text-xs sm:text-sm">
                            <Info className="w-4 h-4" />
                            <span>Creating an account is free and takes less than a minute.</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Divider */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neutral-800 to-transparent"></div>

            {/* Mobile Floating Home Button */}
            <div className="fixed bottom-6 right-6 sm:hidden z-20">
                <button
                    onClick={() => navigate("/")}
                    className="rounded-full p-3 border border-neutral-700 bg-neutral-900 text-neutral-300 hover:bg-neutral-800 shadow-lg transition"
                >
                    <Home className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
}
