function Footer() {
    return (
        <footer className="bg-black border-t border-neutral-800">
            <div className="px-6 py-8">
                <div className="max-w-7xl mx-auto">
                    {/* Main footer content - horizontal strip */}
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 lg:gap-1">

                        {/* Far left - Logo */}
                        <div className="flex items-center flex-shrink-0">
                            <a
                                href="/"
                                className="flex items-center space-x-2 text-white hover:text-gray-300 transition-colors duration-200"
                            >
                                <span className="font-semibold text-2xl
                                ">BillionTube</span>
                            </a>
                        </div>

                        {/* Center - Navigation Links */}
                        <div className="flex flex-col sm:flex-row items-start lg:items-center gap-6 lg:flex-1 lg:justify-center">
                            <div className="flex flex-wrap gap-4 sm:gap-6">

                                <a
                                    href="/about"
                                    className="text-neutral-400 hover:text-purple-400 text-sm font-medium transition-colors duration-200"
                                >
                                    About Us
                                </a>

                            </div>

                            {/* Subtext links */}
                            <div className="flex flex-wrap gap-3 sm:gap-4 text-xs">
                                <a
                                    href="/terms"
                                    className="text-neutral-500 hover:text-purple-400 transition-colors duration-200 whitespace-nowrap"
                                >
                                    Terms & Conditions
                                </a>
                                <a
                                    href="/privacy"
                                    className="text-neutral-500 hover:text-purple-400 transition-colors duration-200 whitespace-nowrap"
                                >
                                    Privacy Policy
                                </a>
                            </div>
                        </div>

                        {/* Far right - Copyright */}
                        <div className="flex items-center flex-shrink-0 lg:ml-auto">
                            <p className="text-neutral-500 text-sm whitespace-nowrap">
                                © 2025 BillionTube. All rights reserved.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;