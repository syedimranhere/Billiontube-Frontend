import React from 'react';
import { Mail, Github, Linkedin, ExternalLink, ArrowLeft } from 'lucide-react';

const BillionTubeAbout = () => {
    return (
        <div className="min-h-screen bg-black text-zinc-100 relative">
            {/* Background */}
            <div className="min-h-screen w-full relative">

                <div
                    className="absolute inset-0 z-0"
                    style={{
                        background: "radial-gradient(125% 125% at 50% 100%, #000000 40%, #010133 100%)",
                    }}
                />


                <div className="px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 relative z-10">
                    <button
                        onClick={() => window.history.back()}
                        className="inline-flex items-center px-3 sm:px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg shadow-md transition-all text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        ← Back
                    </button>
                </div>

                {/* Main Content */}
                <section className="pt-12 sm:pt-16 pb-12 sm:pb-16 relative z-10">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                            {/* Left Content */}
                            <div className="space-y-4 sm:space-y-6">
                                <p className="text-zinc-400 text-sm sm:text-base">Hi, I'm</p>
                                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                                    Syed Imran
                                </h1>
                                <p className="text-base sm:text-lg text-zinc-400">
                                    Fullstack Developer
                                </p>

                                <div className="space-y-3 sm:space-y-4">
                                    <p className="text-zinc-300 text-sm sm:text-base leading-relaxed max-w-xl">
                                        <span className="italic">BillionTube v1.0</span> is my first full MERN stack project - a video platform where I'm learning real-world development. I built it to practice user authentication, handle file uploads, and understand how everything works together.
                                    </p>

                                    <p className="text-zinc-300 text-sm sm:text-base leading-relaxed max-w-xl">
                                        Working on this project taught me more than any tutorial. Every bug I fixed and feature I added helped me understand web development better. It's practical experience that I can build on for future projects.
                                    </p>

                                    <p className="text-zinc-300 text-xs sm:text-sm italic leading-relaxed max-w-xl">
                                        Is it perfect? Hell no. There's still room for improvement - better security, smoother user experience, and additional features. But getting v1.0 working and deployed was an important milestone in my learning journey.
                                    </p>

                                    <p className="text-white font-medium text-sm sm:text-base leading-relaxed max-w-xl">
                                        Future releases will include improved content discovery, enhanced security features, better user workflows, and social interaction tools. Each version helps me grow as a developer and understand what it takes to build production-quality applications.
                                    </p>
                                </div>

                                {/* Contact Section */}
                                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center sm:items-start lg:items-center mt-6">
                                    <p className="bg-white text-zinc-900 px-5 sm:px-7 py-2 sm:py-3 rounded-md font-medium text-sm sm:text-base">
                                        Get In Touch
                                    </p>

                                    <div className="flex gap-2 sm:gap-3 items-center">
                                        {/* Email as plain text */}
                                        <div
                                            className="px-3 py-2 sm:px-4 sm:py-2 rounded-md bg-zinc-800 text-sm text-white cursor-text select-all"
                                            aria-label="Copy Email"
                                        >
                                            imransyedhere@gmail.com
                                        </div>

                                        {/* GitHub */}
                                        <a
                                            href="https://github.com/syedimranhere"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-2 sm:p-3 rounded-md bg-zinc-800 hover:bg-zinc-700 transition-colors"
                                            aria-label="GitHub Profile"
                                        >
                                            <Github className="w-4 h-4 sm:w-5 sm:h-5" />
                                        </a>

                                        {/* LinkedIn */}
                                        <a
                                            href="https://www.linkedin.com/in/syed-imran-111538372/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-2 sm:p-3 rounded-md bg-zinc-800 hover:bg-zinc-700 transition-colors"
                                            aria-label="LinkedIn Profile"
                                        >
                                            <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Right Content - Profile Image */}
                            <div className="flex justify-center lg:justify-end">
                                <div className="w-[200px] sm:w-[240px] md:w-[288px] lg:w-[320px] h-[200px] sm:h-[240px] md:h-[380px] lg:h-[380px] rounded-2xl overflow-hidden bg-zinc-800 border border-zinc-700 shadow-lg">
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
        </div>
    );
};

export default BillionTubeAbout;
