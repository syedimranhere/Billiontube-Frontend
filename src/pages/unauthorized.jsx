import { useNavigate } from "react-router-dom";

export default function AuthRequiredPage() {
    const navigate = useNavigate();

    const handleSignIn = () => {
        // Replace with actual navigation
        navigate("/login")
    };

    const handleSignUp = () => {
        // Replace with actual navigation
        navigate("/signup")
    };

    const handleGoHome = () => {

        navigate("/")
    };


    const Button = ({ children, variant = 'default', className = '', onClick, icon }) => {
        const baseClasses = "inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black disabled:pointer-events-none disabled:opacity-50";

        const variants = {
            primary: "bg-white text-black hover:bg-neutral-200 font-semibold hover:shadow-lg px-6 py-3",
            secondary: "border border-neutral-700 bg-transparent text-neutral-300 hover:bg-neutral-800 hover:border-neutral-600 hover:shadow-md px-6 py-3",
            ghost: "bg-transparent text-neutral-400 hover:text-white hover:bg-neutral-900 px-4 py-2"
        };

        return (
            <button
                className={`${baseClasses} ${variants[variant]} ${className}`}
                onClick={onClick}
            >
                {icon && <span className="mr-2">{icon}</span>}
                {children}
            </button>
        );
    };

    const LockIcon = () => (
        <svg className="w-12 h-12 text-red-400/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
    );

    const ArrowRightIcon = () => (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
    );

    const HomeIcon = () => (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
    );

    return (
        <div className="min-h-screen bg-black relative overflow-hidden">
            {/* Subtle Background Glow Effects */}
            <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-96 h-32 bg-neutral-600 rounded-full blur-3xl opacity-6"></div>
            <div className="absolute bottom-1/3 left-1/4 w-64 h-64 bg-red-900 rounded-full blur-3xl opacity-8"></div>
            <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-neutral-500 rounded-full blur-3xl opacity-4"></div>

            {/* Header */}
            <div className="absolute top-0 left-0 right-0 z-10 p-6">
                <div className="flex justify-between items-center max-w-7xl mx-auto">
                    <div className="cursor-pointer" onClick={handleGoHome}>
                        <h1 className="text-3xl font-bold text-white tracking-tight">BillionTube</h1>
                    </div>
                    <Button
                        variant="ghost"
                        onClick={handleGoHome}
                        icon={<HomeIcon />}
                    >
                        Back to Home
                    </Button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex items-center justify-center min-h-screen px-6 pt-20 relative z-10">
                <div className="w-full max-w-lg">
                    {/* Main Card */}
                    <div className="bg-neutral-900/95 backdrop-blur-xl border border-neutral-800/80 rounded-2xl p-12 shadow-2xl relative">
                        {/* Subtle red accent glow */}
                        <div className="absolute inset-0 bg-gradient-to-b from-red-900/10 via-transparent to-transparent rounded-2xl pointer-events-none"></div>

                        <div className="relative z-10 text-center space-y-8">
                            {/* Lock Icon */}
                            <div className="flex justify-center">
                                <div className="p-4 rounded-full bg-red-500/10 border border-red-500/20">
                                    <LockIcon />
                                </div>
                            </div>

                            {/* Main Heading */}
                            <div className="space-y-4">
                                <h1 className="text-3xl font-bold text-white tracking-tight">
                                    Authentication Required
                                </h1>
                                <div className="space-y-2">
                                    <p className="text-xl text-neutral-300 font-medium">
                                        Oops! Looks like you don't have access to this content
                                    </p>
                                    <p className="text-neutral-400 text-base leading-relaxed">
                                        You need to be signed in to access this content. Create an account or sign in to continue watching.
                                    </p>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="space-y-4 pt-4">
                                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                    <Button
                                        variant="primary"
                                        onClick={handleSignUp}
                                        className="min-w-[140px]"
                                    >
                                        Create Account
                                    </Button>
                                    <Button
                                        variant="secondary"
                                        onClick={handleSignIn}
                                        className="min-w-[140px]"
                                        icon={<ArrowRightIcon />}
                                    >
                                        Sign In
                                    </Button>
                                </div>

                                {/* Alternative action */}
                                <div className="pt-6 border-t border-neutral-800">
                                    <p className="text-sm text-neutral-500 mb-3">
                                        Just want to browse?
                                    </p>
                                    <Button
                                        variant="ghost"
                                        onClick={handleGoHome}
                                        className="text-neutral-400 hover:text-white"
                                    >
                                        Explore public content
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Additional Info Card */}
                    <div className="mt-6 bg-neutral-950/60 backdrop-blur border border-neutral-800/50 rounded-xl p-6 text-center">
                        <div className="flex items-center justify-center space-x-2 text-neutral-400 text-sm">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>Creating an account is free and takes less than a minute</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Pattern */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neutral-800 to-transparent"></div>
        </div>
    );
}