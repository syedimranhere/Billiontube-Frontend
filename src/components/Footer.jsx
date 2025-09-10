function Footer() {
    return (
        <footer className="bg-black border-t border-neutral-800">
            <div className="px-4 sm:px-6 py-6 sm:py-8">
                <div className="max-w-7xl mx-auto">
                    {/* Main footer content */}
                    <div className="flex flex-col space-y-6 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">

                        {/* Navigation Links - Center on large screens */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 lg:flex-1 lg:justify-center order-2 lg:order-1">
                            {/* Main links */}
                            <div className="flex flex-wrap gap-4 sm:gap-6">
                                <a
                                    href="/about"
                                    className="text-neutral-400 hover:text-purple-400 text-sm font-medium transition-colors duration-200"
                                >
                                    About Us
                                </a>
                                <a
                                    href="/contact"
                                    className="text-neutral-400 hover:text-purple-400 text-sm font-medium transition-colors duration-200"
                                >
                                    Contact
                                </a>
                                <a
                                    href="/privacy"
                                    className="text-neutral-400 hover:text-purple-400 text-sm font-medium transition-colors duration-200"
                                >
                                    Privacy
                                </a>
                            </div>

                            {/* Secondary links */}
                            <div className="flex flex-wrap gap-3 sm:gap-4">
                                <a
                                    href="/terms"
                                    className="text-neutral-500 hover:text-purple-400 text-xs transition-colors duration-200 whitespace-nowrap"
                                >
                                    Terms & Conditions
                                </a>
                                <a
                                    href="/support"
                                    className="text-neutral-500 hover:text-purple-400 text-xs transition-colors duration-200 whitespace-nowrap"
                                >
                                    Support
                                </a>
                            </div>
                        </div>

                        {/* Copyright - Right on large screens, top on mobile */}
                        <div className="flex items-center justify-center sm:justify-start lg:justify-end order-1 lg:order-2">
                            <p className="text-neutral-500 text-xs sm:text-sm text-center sm:text-left lg:text-right whitespace-nowrap">
                                © 2025 BillionTube. All rights reserved.
                            </p>
                        </div>
                    </div>

                    {/* Optional: Social links or additional info */}
                    <div className="mt-6 pt-4 border-t border-neutral-800/50 lg:mt-4 lg:pt-3">
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <span className="text-neutral-600 text-xs">Follow us:</span>
                                <div className="flex gap-3">
                                    <a
                                        href="#"
                                        className="text-neutral-500 hover:text-purple-400 transition-colors duration-200"
                                        aria-label="Twitter"
                                    >
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                                        </svg>
                                    </a>
                                    <a
                                        href="#"
                                        className="text-neutral-500 hover:text-purple-400 transition-colors duration-200"
                                        aria-label="YouTube"
                                    >
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                        </svg>
                                    </a>
                                    <a
                                        href="#"
                                        className="text-neutral-500 hover:text-purple-400 transition-colors duration-200"
                                        aria-label="Discord"
                                    >
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0190 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9460 2.4189-2.1568 2.4189Z" />
                                        </svg>
                                    </a>
                                </div>
                            </div>

                            <div className="text-neutral-600 text-xs">
                                Made with ❤️ for creators worldwide
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;