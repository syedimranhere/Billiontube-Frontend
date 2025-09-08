import React from 'react';
import { Mail, Github, Linkedin, ExternalLink, ArrowLeft } from 'lucide-react';

const BillionTubeAbout = () => {
    return (
        <div className="min-h-screen bg-black text-zinc-100 relative">
            {/* Go Back Button */}
            <div className="absolute top-10 bg-blue-600 rounded-xl py-1 px-1 left-4 sm:top-6 sm:left-6">
                <a
                    href="/"
                    className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors text-sm sm:text-base"
                >
                    <ArrowLeft size={18} className="sm:w-5 sm:h-5" />
                    <span className="hidden sm:inline">Back</span>
                </a>
            </div>

            <section className="pt-16 sm:pt-20 pb-12 sm:pb-16">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 items-center min-h-[70vh] sm:min-h-[80vh]">
                        {/* Left Content */}
                        <div className="space-y-6 sm:space-y-8 text-center lg:text-left">
                            <div>
                                <p className="text-zinc-400 text-base sm:text-lg mb-2">Hi, I am</p>
                                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-3 sm:mb-4 leading-tight">
                                    Syed Imran
                                </h1>
                                <p className="text-lg sm:text-xl text-zinc-400 mb-4 sm:mb-6">
                                    Fullstack Developer
                                </p>
                            </div>

                            <p className="text-zinc-300 text-base sm:text-lg leading-relaxed max-w-lg mx-auto lg:mx-0">
                                BillionTube is my learning-phase video app where I’m stress-testing UX, authentication, and performance. Iterating fast, fixing bugs, and pushing toward scale.
                            </p>
                            <p className="text-zinc-300 text-base sm:text-lg leading-relaxed max-w-lg mx-auto lg:mx-0">
                                I am currently in the learning phase of my journey as a fullstack developer, building projects that act as battlegrounds to sharpen my skills. Each project, including BillionTube, is designed to test me against real-world challenges so I can demonstrate not just theory, but practical, job-ready abilities.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-start">
                                <a
                                    href="#contact"
                                    className="bg-white text-zinc-900 px-6 sm:px-8 py-2.5 sm:py-3 rounded-md font-medium hover:bg-zinc-200 transition-colors inline-flex items-center gap-2 text-sm sm:text-base"
                                >
                                    Get In Touch
                                    <ExternalLink size={18} className="sm:w-5 sm:h-5" />
                                </a>

                                <div className="flex gap-3">
                                    <a
                                        href="mailto:tomasz@example.com"
                                        className="p-2.5 sm:p-3 rounded-md bg-zinc-800 hover:bg-zinc-700 transition-colors"
                                    >
                                        <Mail size={18} className="sm:w-5 sm:h-5" />
                                    </a>
                                    <a
                                        href="https://github.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2.5 sm:p-3 rounded-md bg-zinc-800 hover:bg-zinc-700 transition-colors"
                                    >
                                        <Github size={18} className="sm:w-5 sm:h-5" />
                                    </a>
                                    <a
                                        href="https://linkedin.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2.5 sm:p-3 rounded-md bg-zinc-800 hover:bg-zinc-700 transition-colors"
                                    >
                                        <Linkedin size={18} className="sm:w-5 sm:h-5" />
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Right Image */}
                        <div className="flex justify-center lg:justify-end">
                            <div className="w-full max-w-[300px] sm:max-w-[400px] h-64 sm:h-80 lg:h-96 rounded-2xl overflow-hidden bg-zinc-800 border border-zinc-700">
                                <img
                                    src="https://res.cloudinary.com/dbvxna33m/image/upload/v1756931759/billiontube/images/image_1756931757519.jpg"
                                    alt="Profile"
                                    className="w-full h-full object-cover"
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
