import {
    Search,
    X,
    Crown,
    Upload,
    LayoutDashboard,
    Video,
    LogOut,
    Settings,
    ChevronDown,
    Plus
} from 'lucide-react';
import { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { UseUserContext } from "../context/AuthContext";

import HeaderLoader from "./loaders/headerloader";
import { usersAPI } from '../services/usersservice';
import { SignoutLoader } from './loaders/signoutloader';

// Separate component for search input - isolated state
const SearchInput = ({ className, autoFocus = false }) => {
    const [localQuery, setLocalQuery] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (localQuery.trim()) {
            navigate(`/search/${localQuery.trim()}`);
        }
    };

    const handleChange = (e) => {
        setLocalQuery(e.target.value);
    };

    return (
        <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-neutral-100 z-10" />
            </div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Search content..."
                    value={localQuery}
                    onChange={handleChange}
                    className={className}
                    autoFocus={autoFocus}
                />
            </form>
        </div>
    );
};

const Header = () => {
    const [signoutLoading, setSignoutLoading] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [showMobileSearch, setShowMobileSearch] = useState(false);

    const { Authenticated, setAuthenticated, setUser, loading, user } = UseUserContext();
    const profileMenuRef = useRef(null);
    const navigate = useNavigate();

    // Handle clicks outside profile menu
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
                setShowProfileMenu(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Memoized profile menu handler
    const handleProfileMenuClick = useCallback(async (action) => {
        setShowProfileMenu(false);
        switch (action) {
            case "dashboard":
                navigate("/dashboard");
                break;
            case "content":
                navigate("/my-content");
                break;
            case "settings":
                navigate("/account-settings");
                break;
            case "signout":
                try {
                    setSignoutLoading(true);
                    navigate("/login");
                    await usersAPI.logout();
                    setUser(null);
                    setAuthenticated(false);
                } catch (err) {
                    console.error("Logout failed:", err);
                } finally {
                    setSignoutLoading(false);
                }
                break;
        }
    }, [navigate, setUser, setAuthenticated]);

    // Memoized navigation handlers
    const handleToggleMobileSearch = useCallback(() => {
        setShowMobileSearch(!showMobileSearch);
    }, [showMobileSearch]);

    const handleToggleProfileMenu = useCallback(() => {
        setShowProfileMenu(!showProfileMenu);
    }, [showProfileMenu]);

    const handleNavigatePremium = useCallback(() => {
        navigate("/premium");
    }, [navigate]);

    const handleNavigateUpload = useCallback(() => {
        navigate("/upload");
    }, [navigate]);

    const handleNavigateLogin = useCallback(() => {
        navigate("/login");
    }, [navigate]);

    const handleNavigateSignup = useCallback(() => {
        navigate("/signup");
    }, [navigate]);

    if (loading || (Authenticated && !user)) {
        return <HeaderLoader />;
    }

    return (
        <>
            <header
                className="h-14 sm:h-16 
            bg-black
            backdrop-blur-3xl backdrop-saturate-150
            border-b border-neutral-600/50 
            flex items-center px-3 sm:px-4 
            relative z-30 
            before:absolute before:inset-x-0 before:bottom-0 
            before:h-px before:bg-gradient-to-r before:from-transparent before:via-neutral-600/60 before:to-transparent
            after:absolute after:inset-x-0 after:bottom-0 after:h-6
            after:bg-gradient-to-t after:from-transparent after:via-neutral-900/20 after:to-neutral-900/5
            after:pointer-events-none"
            >
                <div className="flex items-center justify-between w-full">
                    <div className="flex items-center">
                        <div className="w-10 h-10 flex-shrink-0"></div>

                        {/* Text + Logo inline */}
                        <a
                            href="/"
                            className={`flex items-center text-white hover:text-gray-200 transition-colors ml-1 sm:ml-1 ${showMobileSearch ? 'hidden' : 'flex'} lg:flex`}
                        >
                            {/* Text (hidden on mobile, visible sm+) */}
                            <span className="hidden sm:inline font-bold text-base sm:text-lg lg:text-xl xl:text-2xl tracking-tight truncate">
                                BillionTube
                            </span>

                            {/* Logo (always visible) */}
                            <img
                                src="/file.svg"
                                alt="BillionTube logo"
                                className="w-8 h-8 sm:w-10 sm:h-10 ml-0 sm:ml-2"
                            />
                        </a>
                    </div>






                    {/* Desktop search bar - hidden on mobile */}
                    <div className="hidden lg:flex flex-1 max-w-md xl:max-w-xl mx-4 xl:mx-6">
                        <SearchInput
                            className="block w-full pl-10 pr-4 py-2 
                            bg-neutral-800/70 backdrop-blur-sm border border-neutral-700/60 
                            rounded-full text-white placeholder-neutral-500 text-sm
                            focus:outline-none focus:ring-2 focus:ring-blue-500/60 focus:border-blue-500/60
                            transition-all duration-200 shadow-sm"
                        />
                    </div>

                    {/* Mobile expanded search bar */}
                    {showMobileSearch && (
                        <div className="lg:hidden flex-1 mx-2">
                            <SearchInput
                                className="block w-full pl-10 pr-4 py-2 
                                bg-neutral-800/70 backdrop-blur-sm border border-neutral-700/60 
                                rounded-full text-white placeholder-neutral-500 text-sm
                                focus:outline-none focus:ring-2 focus:ring-blue-500/60 focus:border-blue-500/60
                                transition-all duration-200 shadow-sm"
                                autoFocus={true}
                            />
                        </div>
                    )}

                    {/* Right Actions */}
                    <div className="flex items-center space-x-1 sm:space-x-2">
                        {/* Mobile Search Toggle Button */}
                        <button
                            className="lg:hidden p-2 rounded-full bg-neutral-800/70 backdrop-blur-sm border border-neutral-700/60 text-neutral-400 hover:text-white hover:bg-neutral-700/70 transition-colors"
                            onClick={handleToggleMobileSearch}
                        >
                            {showMobileSearch ? (
                                <X className="h-4 w-4" />
                            ) : (
                                <Search className="h-4 w-4" />
                            )}
                        </button>

                        {Authenticated ? (
                            <>
                                {/* Pro Button - Responsive */}
                                <button
                                    onClick={handleNavigatePremium}
                                    className="inline-flex items-center gap-1 sm:gap-2 px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 
                                rounded-full border border-zinc-700/60 bg-zinc-900/80 backdrop-blur-sm
                                text-xs sm:text-sm font-medium text-zinc-200 tracking-wide
                                transition-all duration-300 hover:border-yellow-400/80 hover:text-yellow-400 
                                hover:shadow-[0_0_12px_rgba(255,215,0,0.4)] active:scale-95"
                                >
                                    <Crown className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 flex-shrink-0" />
                                    <span className="hidden sm:inline">Go Pro</span>
                                    <span className="sm:hidden">Pro</span>
                                </button>

                                {/* Upload Button - Hide text on mobile when search is active */}
                                <button
                                    onClick={handleNavigateUpload}
                                    className={`inline-flex items-center px-2 py-2 sm:px-3 sm:py-2 lg:px-4
                                bg-neutral-800/70 backdrop-blur-sm hover:bg-neutral-700/70 border border-neutral-700/60 
                                text-white text-xs sm:text-sm font-medium rounded-full transition-colors ${showMobileSearch ? 'lg:hidden' : ''
                                        }`}
                                >
                                    <Plus className="w-3 h-3 sm:w-4 sm:h-4 lg:hidden" />
                                    <Upload className="w-4 h-4 hidden lg:block" />
                                    <span className={`ml-1.5 hidden lg:inline ${showMobileSearch ? 'lg:hidden' : 'sm:inline'
                                        }`}>Upload</span>
                                </button>

                                {/* Profile Dropdown */}
                                <div className="relative" ref={profileMenuRef}>
                                    <button
                                        onClick={handleToggleProfileMenu}
                                        className="flex items-center p-1 rounded-full 
                                    bg-neutral-800/70 backdrop-blur-sm border border-neutral-700/60 
                                    hover:bg-neutral-700/70 transition-colors group"
                                    >
                                        <div className="relative">
                                            <img
                                                src={user.avatar || "/api/placeholder/32/32"}
                                                alt="User avatar"
                                                className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 rounded-full object-cover ring-1 ring-neutral-600/60 group-hover:ring-neutral-500/60 transition-all"
                                            />
                                        </div>
                                        <ChevronDown className={`h-3 w-3 ml-1 text-neutral-400 transition-transform duration-200 ${showProfileMenu ? 'rotate-180' : ''
                                            } ${showMobileSearch ? 'hidden' : 'hidden md:block'}`} />
                                    </button>

                                    {showProfileMenu && (
                                        <div className="absolute right-0 mt-2 w-48 bg-neutral-900/95 backdrop-blur-xl backdrop-saturate-150 border border-neutral-700/60 rounded-lg shadow-xl z-50 overflow-hidden">
                                            {/* User Info */}
                                            <div className="px-4 py-3 border-b border-neutral-700/60">
                                                <div className="flex items-center space-x-3">
                                                    <img
                                                        src={user?.avatar || "/api/placeholder/24/24"}
                                                        alt="User avatar"
                                                        className="w-6 h-6 rounded-full object-cover"
                                                    />
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm font-medium text-white truncate">
                                                            {user.username || "User"}
                                                        </p>
                                                        <p className="text-xs text-neutral-400 truncate">
                                                            Manage your account
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Menu Items */}
                                            <div className="py-1">
                                                <button
                                                    onClick={() => handleProfileMenuClick("dashboard")}
                                                    className="w-full flex items-center px-4 py-2 text-sm text-neutral-300 hover:text-white hover:bg-neutral-800/70 transition-colors"
                                                >
                                                    <LayoutDashboard className="h-4 w-4 mr-3" />
                                                    Dashboard
                                                </button>
                                                <button
                                                    onClick={() => handleProfileMenuClick("content")}
                                                    className="w-full flex items-center px-4 py-2 text-sm text-neutral-300 hover:text-white hover:bg-neutral-800/70 transition-colors"
                                                >
                                                    <Video className="h-4 w-4 mr-3" />
                                                    My Content
                                                </button>
                                                <button
                                                    onClick={() => handleProfileMenuClick("settings")}
                                                    className="w-full flex items-center px-4 py-2 text-sm text-neutral-300 hover:text-white hover:bg-neutral-800/70 transition-colors"
                                                >
                                                    <Settings className="h-4 w-4 mr-3" />
                                                    Settings
                                                </button>
                                            </div>

                                            {/* Sign out */}
                                            <div className="border-t border-neutral-700/60 py-1">
                                                <button
                                                    onClick={() => handleProfileMenuClick("signout")}
                                                    className="w-full flex items-center px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-neutral-800/70 transition-colors"
                                                >
                                                    <LogOut className="h-4 w-4 mr-3" />
                                                    Sign Out
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={handleNavigateLogin}
                                    className={`px-2 py-1.5 sm:px-3 sm:py-2 lg:px-4 text-xs sm:text-sm font-medium text-neutral-300 hover:text-white rounded-full hover:bg-neutral-800/70 backdrop-blur-sm transition-colors ${showMobileSearch ? 'hidden sm:block' : ''
                                        }`}
                                >
                                    Sign in
                                </button>
                                <button
                                    onClick={handleNavigateSignup}
                                    className={`px-2 py-1.5 sm:px-3 sm:py-2 lg:px-4 bg-blue-600/90 backdrop-blur-sm hover:bg-blue-700/90 text-white text-xs sm:text-sm font-medium rounded-full transition-colors ${showMobileSearch ? 'hidden sm:block' : ''
                                        }`}
                                >
                                    Sign up
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </header>

            {/* Fullscreen Signout Loader */}
            {signoutLoading && (
                <SignoutLoader />
            )}
        </>
    );
};
export default Header;