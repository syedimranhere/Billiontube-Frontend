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
                    <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 items-center min-h-[auto] sm:min-h-[60vh]">
                        {/* Left Content */}
                        <div className="space-y-6 sm:space-y-8 text-center lg:text-left">
                            <div>
                                <p className="text-zinc-400 text-sm sm:text-base mb-1 sm:mb-2">Hi, I am</p>
                                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2 sm:mb-3 leading-tight">
                                    Syed Imran
                                </h1>
                                <p className="text-base sm:text-lg text-zinc-400 mb-3 sm:mb-4">
                                    Fullstack Developer
                                </p>
                            </div>

                            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed max-w-full sm:max-w-lg mx-auto lg:mx-0">
                                BillionTube is my learning-phase video app where I’m stress-testing UX, authentication, and performance. Iterating fast, fixing bugs, and pushing toward scale.
                            </p>
                            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed max-w-full sm:max-w-lg mx-auto lg:mx-0">
                                I am currently in the learning phase of my journey as a fullstack developer, building projects that act as battlegrounds to sharpen my skills. Each project, including BillionTube, is designed to test me against real-world challenges so I can demonstrate not just theory, but practical, job-ready abilities.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-center lg:justify-start mt-4 sm:mt-6">
                                <p

                                    className="bg-white text-zinc-900 px-5 sm:px-7 py-2 sm:py-3 rounded-md font-medium"
                                >
                                    Get In Touch

                                </p>

                                <div className="flex gap-2 sm:gap-3">
                                    <a
                                        href="https://mail.google.com/mail/?view=cm&fs=1&to=imransyedhere@gmail.com&su=Let%27s%20Connect&body=Hey%20Imran,%20I%20checked%20out%20BillionTube!"
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
                        <div className="flex justify-center lg:justify-end mt-6 lg:mt-0">
                            <div className="w-48 sm:w-60 md:w-72 lg:w-80 h-48 sm:h-60 md:h-72 lg:h-96 rounded-2xl overflow-hidden bg-zinc-800 border border-zinc-700">
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
