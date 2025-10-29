import {
    Home,
    TrendingUp,
    History,
    Clock,
    Menu,
    Heart,
    BellPlus,
    X,
    Lock,
    LogIn
} from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UseUserContext } from '../context/AuthContext';
import { useLocation } from 'react-router-dom';

const Sidebar = () => {
    const [sidebarExpanded, setSidebarExpanded] = useState(false);
    const location = useLocation();
    const currentpath = location.pathname === '/' ? "home" : location.pathname.split('/')[1];
    const [activeNavItem, setActiveNavItem] = useState(currentpath);

    const sidebarItems = [
        { icon: Home, label: 'Home', id: 'home' },
        { icon: TrendingUp, label: 'Trending', id: 'trending' },
        { icon: History, label: 'History', id: 'history' },
        { icon: Clock, label: 'Watch Later', id: 'watchlater' },
        { icon: Heart, label: 'Liked Videos', id: 'likedvideos' },
        { icon: BellPlus, label: 'Subscriptions', id: 'subscriptions' },
    ];
    const { Authenticated } = UseUserContext();
    const navigate = useNavigate();
    return (
        <>

            {sidebarExpanded && (
                <div
                    className="fixed inset-0 bg-black/50 z-40"
                    onClick={() => setSidebarExpanded(false)}
                />
            )}

            {/* Hamburger Menu Button - Fixed positioning to avoid header conflicts */}
            <button
                onClick={() => setSidebarExpanded(!sidebarExpanded)}
                className="fixed top-3 left-3 sm:top-4 sm:left-4 z-50 p-2 rounded-xs bg-transparent hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
                aria-label="Toggle sidebar"
            >
                <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>

            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0  h-full bg-black border-r border-neutral-800 transition-transform duration-300 z-50
                ${sidebarExpanded ? 'translate-x-0' : '-translate-x-full'} w-64`}
            >
                <div className="h-full flex flex-col">
                    {/* Sidebar Header */}
                    <div className="h-14 sm:h-16 flex items-center justify-between border-b border-neutral-800 px-4">
                        {/* Logo - Positioned to the right side of sidebar */}
                        <div className="flex-1 flex justify-center">
                            <a
                                href="/"
                                className="flex items-center space-x-2 text-white hover:text-gray-200 transition-colors"
                            >
                                <span className="michroma-regular font-semibold text-xl sm:text-2xl">BillionTube</span>
                            </a>
                        </div>

                        {/* Close Button */}
                        <button
                            onClick={() => setSidebarExpanded(false)}
                            className="p-2 rounded-xs hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors ml-2"
                            aria-label="Close sidebar"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    {Authenticated ? (
                        <nav className="flex-1 p-3">
                            <ul className="space-y-2">
                                {sidebarItems.map(({ icon: Icon, label, id }) => (
                                    <li key={id}>
                                        <button
                                            onClick={() => {
                                                setActiveNavItem(id);
                                                navigate(id === "home" ? "/" : `/${id}`);
                                                setSidebarExpanded(false); // Close sidebar on mobile after navigation
                                            }}
                                            className={`group w-full flex items-center px-3 py-3 rounded-xs text-lg 
              transition-all duration-200 
              ${activeNavItem === id
                                                    ? "bg-neutral-900 text-white border border-neutral-700"
                                                    : "text-neutral-200 hover:text-white hover:bg-neutral-900"
                                                }`}
                                        >
                                            <Icon
                                                className={`h-5 w-5 flex-shrink-0 transition-colors ${activeNavItem === id
                                                    ? "text-indigo-600"
                                                    : "group-hover:text-white"
                                                    }`}
                                            />
                                            <span className="ml-3 whitespace-nowrap">{label}</span>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    ) : (
                        <nav className="flex-1 p-3">
                            <ul className="space-y-4">
                                {/* Home (publicly visible) */}
                                <li>
                                    <button
                                        onClick={() => {
                                            setActiveNavItem("home");
                                            navigate("/");
                                            setSidebarExpanded(false);
                                        }}
                                        className={`group w-full flex items-center px-3 py-3 rounded-sm text-lg font-medium 
            transition-all duration-200 
            ${activeNavItem === "home"
                                                ? "bg-black-100 text-white border border-neutral-700"
                                                : "text-neutral-400 hover:text-white hover:bg-neutral-800"
                                            }`}
                                    >
                                        <Home className="h-5 w-5 flex-shrink-0 group-hover:text-white" />
                                        <span className="ml-3 whitespace-nowrap">Home</span>
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={() => {
                                            setActiveNavItem("trending");
                                            navigate("/trending");
                                            setSidebarExpanded(false);
                                        }}
                                        className={`group w-full flex items-center px-3 py-3 rounded-xs text-sm font-medium 
            transition-all duration-200 
            ${activeNavItem === "trending"
                                                ? "bg-black-100 text-white border border-neutral-700"
                                                : "text-neutral-400 hover:text-white hover:bg-neutral-800"
                                            }`}
                                    >
                                        <TrendingUp className="h-5 w-5 flex-shrink-0 group-hover:text-white" />
                                        <span className="ml-3 whitespace-nowrap">Trending</span>
                                    </button>
                                </li>

                                {/* Locked section */}
                                <li className="flex flex-col items-center text-center px-3 py-6 bg-neutral-900 rounded-xs border border-neutral-800">
                                    <Lock className="h-8 w-8 smooch-sans text-neutral-400 mb-3" />
                                    <p className="text-neutral-400 text-sm mb-4">
                                        Access Watch Later, Liked Videos, and more when you sign in.
                                    </p>
                                    <button
                                        onClick={() => {
                                            navigate("/login");
                                            setSidebarExpanded(false);
                                        }}
                                        className="flex items-center gap-2 px-4 py-2 rounded-xs bg-indigo-800 smooch-sans hover:bg-indigo-600 text-white font-medium text-sm transition-colors"
                                    >
                                        <LogIn className="h-4 w-4" />
                                        Sign In
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    )}

                    {/* Footer */}
                    <div className="p-4 border-t flex gap-2 border-neutral-800">
                        <p className="text-md text-neutral-500 text-center">
                            © 2025
                        </p>
                        <p className='michroma-regular'>BillionTube </p>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;