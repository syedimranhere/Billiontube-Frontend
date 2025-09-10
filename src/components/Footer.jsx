function Footer() {
    return (
        <footer className="bg-black border-t border-neutral-800">
            <div className="px-3 sm:px-4 py-4">
                <div className="max-w-7xl mx-auto">
                    {/* Main footer content */}
                    <div className="flex flex-col items-center space-y-3 sm:space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">

                        {/* Copyright */}
                        <div className="order-1 lg:order-1">
                            <p className="text-neutral-500 text-xs sm:text-sm text-center lg:text-left whitespace-nowrap">
                                © 2025 BillionTube. All rights reserved.
                            </p>
                        </div>

                        {/* Navigation Links */}
                        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5 order-2 lg:order-2">
                            <a
                                href="/about"
                                className="text-neutral-400 hover:text-purple-400 text-xs sm:text-sm font-medium transition-colors duration-200"
                            >
                                About Us
                            </a>
                            <a
                                href="/terms"
                                className="text-neutral-500 hover:text-purple-400 text-xs sm:text-sm transition-colors duration-200 whitespace-nowrap"
                            >
                                Terms & Conditions
                            </a>
                        </div>
                    </div>

                    {/* Bottom strip */}
                    <div className="mt-4 pt-2 border-t border-neutral-800/50">
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
                            <div className="text-neutral-600 text-[11px] sm:text-xs text-center sm:text-left">
                                Made with ❤️ for creators worldwide
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
