import { Loader2, Eye, EyeOff } from 'lucide-react';
import { Button } from '../components/cards&buttons/button';
import { useLogin } from '../hooks/user/useLogin';
import { Link, useNavigate } from 'react-router-dom';

export default function LoginPage() {
    const {
        formData,
        error,
        showPassword,
        loggingIn,
        setShowPassword,
        handleInputChange,
        handleSubmit,
    } = useLogin();
    const navigate = useNavigate();

    return (
        <div className="relative min-h-screen bg-black overflow-hidden">
            {/* Blurred Background Image */}
            <div
                className="absolute inset-0 z-10 bg-cover bg-center blur-xl opacity-90"
                style={{
                    backgroundImage: "url('/neonbg.webp')"
                }}
            ></div>

            {/* Header */}
            <header className="absolute top-0 left-0 right-0 z-30 p-4 sm:p-6">
                <Link to="/" aria-label="Go to BillionTube homepage">
                    <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight hover:text-gray-200 transition-colors">
                        BillionTube
                    </h1>
                </Link>
            </header>

            {/* Main Content */}
            <main className="relative z-20 flex items-center justify-center min-h-screen px-4 sm:px-6 pt-16 sm:pt-20">
                <div className="w-full max-w-md sm:max-w-lg">
                    {/* Compact Login Card */}
                    <div className="bg-neutral-900/95 backdrop-blur-xl border border-neutral-800/80 rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-2xl relative">
                        {/* Subtle gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-b from-neutral-800/20 to-transparent rounded-xl sm:rounded-2xl pointer-events-none"></div>

                        <div className="relative z-10">
                            {/* Header Section */}
                            <div className="text-center space-y-4 mb-8">
                                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                                    Welcome back
                                </h2>
                                <p className="text-neutral-400 text-sm sm:text-base">
                                    Don&apos;t have an account?{" "}
                                    <button
                                        className="text-white hover:underline font-medium"
                                        onClick={() => navigate("/signup")}
                                        aria-label="Sign up for a new BillionTube account"
                                    >
                                        Sign up
                                    </button>
                                </p>
                            </div>

                            {/* Login Form */}
                            <form onSubmit={handleSubmit}

                                className="space-y-6" aria-label="Login form">
                                {/* Email/Username */}
                                <div className="space-y-2">
                                    <label
                                        htmlFor="email"
                                        className="text-sm font-medium text-neutral-300 block"
                                    >
                                        Email or Username
                                    </label>
                                    <input
                                        id="email"
                                        type="text"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 bg-neutral-800/80 backdrop-blur border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 transition-all hover:bg-neutral-800 text-base"
                                        placeholder="Enter your email or username"
                                        required
                                    />
                                </div>

                                {/* Password */}
                                <div className="space-y-2">
                                    <label
                                        htmlFor="password"
                                        className="text-sm font-medium text-neutral-300 block"
                                    >
                                        Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 bg-neutral-800/80 backdrop-blur border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 transition-all hover:bg-neutral-800 pr-12 text-base"
                                            placeholder="Enter your password"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-white transition-colors"
                                            aria-label={showPassword ? "Hide password" : "Show password"}
                                        >
                                            {showPassword ? (
                                                <Eye className="w-5 h-5" />
                                            ) : (
                                                <EyeOff className="w-5 h-5" />
                                            )}
                                        </button>
                                    </div>
                                </div>

                                {/* Error Message */}
                                {error && (
                                    <div
                                        role="alert"
                                        className="bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3"
                                    >
                                        <p className="text-red-400 text-sm">{error}</p>
                                    </div>
                                )}

                                {/* Login Button / Loader */}
                                {loggingIn ? (
                                    <div className="flex justify-center py-2">
                                        <Loader2 className="h-8 w-8 text-white animate-spin" />
                                    </div>
                                ) : (
                                    <Button
                                        type="submit"
                                        className="w-full py-3 text-base font-medium"
                                    >
                                        Sign In
                                    </Button>
                                )}

                            </form>
                        </div>
                    </div>

                    {/* Optional: Additional info for mobile */}
                    <div className="text-center mt-6 sm:hidden">
                        <p className="text-neutral-500 text-xs">
                            By signing in, you agree to our terms of service
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}