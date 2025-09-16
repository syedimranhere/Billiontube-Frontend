import React from 'react';
import { Mail, Github, Linkedin, ExternalLink, ArrowLeft } from 'lucide-react';

const BillionTubeAbout = () => {
    return (
        <div className="min-h-screen bg-black text-zinc-100 relative">
            {/* Back Button */}
            <div className="px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
                <button
                    onClick={() => window.history.back()}
                    className="inline-flex items-center px-3 sm:px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg shadow-md transition-all text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    ← Back
                </button>
            </div>

            <section className="pt-12 sm:pt-16 pb-12 sm:pb-16">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                        {/* Left Content */}
                        <div className="space-y-4 sm:space-y-6">
                            <p className="text-zinc-400 text-sm sm:text-base">Hi, I’m</p>
                            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                                Syed Imran
                            </h1>
                            <p className="text-base sm:text-lg text-zinc-400">
                                Fullstack Developer
                            </p>

                            <div className="space-y-3 sm:space-y-4">
                                <p className="text-zinc-300 text-sm sm:text-base leading-relaxed max-w-xl">
                                    <span className="italic">BillionTube v1.0</span> is my first full MERN project —
                                    a learning-ground video platform where I’m testing myself against
                                    real-world dev problems. It’s less a “finished product” and more a
                                    <span className="italic"> training arena</span> for authentication, UX, and performance.
                                </p>

                                <p className="text-zinc-300 text-sm sm:text-base leading-relaxed max-w-xl">
                                    Every bug I squash and feature I push sharpens my skills for the
                                    next level. This isn’t theory — it’s code under pressure, proving I
                                    can ship and iterate.
                                </p>

                                <p className="text-zinc-400 text-xs sm:text-sm italic leading-relaxed max-w-xl">
                                    Could it go further? Absolutely. Security upgrades, deeper auth
                                    flows, and richer social layers are already on the roadmap. But the
                                    point of v1 is simple: ship fast, break things, learn faster.
                                </p>

                                <p className="text-zinc-300 text-sm sm:text-base leading-relaxed max-w-xl">
                                    Future releases will add
                                    <span className="text-white font-medium">
                                        {" "}
                                        AI-driven content tools, stronger security, integrated workflows,
                                        and scalable social features
                                    </span>
                                    . Each iteration brings BillionTube closer to production-grade
                                    readiness — and me closer to mastering the craft.
                                </p>
                            </div>

                            {/* Contact Section */}
                            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center sm:items-start lg:items-center mt-6">
                                <p className="bg-white text-zinc-900 px-5 sm:px-7 py-2 sm:py-3 rounded-md font-medium text-sm sm:text-base">
                                    Get In Touch
                                </p>

                                <div className="flex gap-2 sm:gap-3">
                                    <a
                                        href="mailto:imransyedhere@gmail.com"
                                        className="p-2 sm:p-3 rounded-md bg-zinc-800 hover:bg-zinc-700 transition-colors"
                                    >
                                        <Mail size={18} className="sm:w-5 sm:h-5" />
                                    </a>
                                    <a
                                        href="https://github.com/syedimranhere"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 sm:p-3 rounded-md bg-zinc-800 hover:bg-zinc-700 transition-colors"
                                    >
                                        <Github size={18} className="sm:w-5 sm:h-5" />
                                    </a>
                                    <a
                                        href="https://www.linkedin.com/in/syed-imran-111538372/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 sm:p-3 rounded-md bg-zinc-800 hover:bg-zinc-700 transition-colors"
                                    >
                                        <Linkedin size={18} className="sm:w-5 sm:h-5" />
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Right Image */}
                        <div className="flex justify-center lg:justify-end">
                            <div className="w-50 sm:w-60 md:w-72 lg:w-80 h-50 sm:h-60 md:h-95 lg:h-95 rounded-2xl overflow-hidden bg-zinc-800 border border-zinc-700 shadow-lg">
                                <img
                                    src="https://res.cloudinary.com/dgrmnftvf/image/upload/v1757974409/billiontube/images/image_1757974414404.jpg"
                                    alt="Profile"
                                    className="w-full h-full object-cover object-center"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default BillionTubeAbout;
