import { Loader2, Eye, EyeOff } from 'lucide-react';
import { useLogin } from '../hooks/user/useLogin';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/cards&buttons/button';
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

            <div
                className="absolute inset-0 z-0"
                style={{
                    background: "radial-gradient(125% 125% at 50% 10%, #000000 40%, #0d1a36 100%)",
                }}
            />


            <header className="absolute top-0 left-0 right-0 z-30 p-4 sm:p-6">
                <Link
                    to="/"
                    aria-label="Go to BillionTube homepage"
                    className="flex items-center gap-2 sm:gap-3"
                >
                    {/* Logo Icon */}
                    <img
                        src="/file.svg"
                        alt="BillionTube logo"
                        className="w-8 h-8 sm:w-10 sm:h-10"
                    />

                    {/* Brand Name */}
                    <h1 className="michroma-regular text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight hover:text-gray-200 transition-colors">
                        BillionTube
                    </h1>
                </Link>
            </header>



            {/* Main Content */}
            <main className="relative z-20 flex items-center justify-center min-h-screen px-4 sm:px-6 pt-16 sm:pt-20">
                <div className="w-full max-w-md sm:max-w-lg">
                    {/* Compact Login Card */}
                    <div className="bg-neutral-900/95 backdrop-blur-3xl opacity-85 border border-neutral-800/80 rounded-md p-6 sm:p-8 shadow-3xl relative">
                        {/* Subtle gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-b from-neutral-800/20 to-transparent rounded-xl sm:rounded-2xl pointer-events-none"></div>

                        <div className="relative z-10">
                            {/* Header Section */}
                            <div className="text-center smooch-sans space-y-4 mb-8">
                                <h2 className="text-2xl sm:text-3xl  text-white tracking-tight">
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
                                        className="w-full px-4 py-3 bg-neutral-900/80 backdrop-blur border border-neutral-700 rounded-sm text-white placeholder-neutral-500 focus:outline-none focus:border-indigo-700 focus:ring-1 focus:ring-neutral-800 transition-all  text-base"
                                        placeholder="Enter your email or username"
                                        required
                                    />
                                </div>

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
                                            className="w-full px-4 py-3 bg-neutral-900/80 backdrop-blur border border-neutral-700 rounded-sm text-white placeholder-neutral-500 focus:outline-none focus:border-indigo-700 focus:ring-1 focus:ring-neutral-800 transition-all pr-12 text-base"
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
                                        className="bg-red-500/10 border border-red-500/20 rounded-sm  px-4 py-3"
                                    >
                                        <p className="text-red-400 text-sm">{error}</p>
                                    </div>
                                )}

                                {/* Login Button / Loader */}
                                {loggingIn ? (
                                    <div className="flex justify-center  py-2">
                                        <Loader2 className="h-8 w-8 text-white animate-spin" />
                                    </div>
                                ) : (
                                    <Button

                                    >
                                        Sign In
                                    </Button>
                                )}

                            </form>
                        </div>
                    </div>


                </div>
            </main>
        </div>
    );
}