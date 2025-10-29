import React from 'react';
import { Mail, Github, Linkedin } from 'lucide-react';

const BillionTubeAbout = () => {
    return (
        <div className="min-h-screen bg-black text-zinc-100 relative">
            {/* Background Gradient */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    background:
                        "radial-gradient(125% 125% at 50% 10%, #000000 40%, #0d1a36 100%)",
                }}
            />

            {/* Page Wrapper */}
            <div className="relative z-10 min-h-screen w-full flex flex-col">

                {/* Top Bar */}
                <div className="px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 flex justify-start">
                    <button
                        onClick={() => window.history.back()}
                        className="inline-flex items-center px-4 sm:px-5 py-2 
          bg-gradient-to-l to-indigo-950 
          hover:bg-gradient-to-r hover:to-indigo-950 
          text-white font-semibold rounded-sm shadow-md 
          transition-[background-position,background-color,transform] duration-700 ease-in-out 
          bg-[length:200%_200%] bg-[position:100%_0] hover:bg-[position:0_0] 
          text-sm sm:text-base focus:outline-none focus:ring-2 
          will-change-transform will-change-background-position"
                    >
                        Go Back
                    </button>
                </div>

                {/* Main Section */}
                <section className="flex-1 pt-10 sm:pt-16 pb-10 sm:pb-20">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

                            {/* Left Side */}
                            <div className="space-y-3 sm:space-y-4">
                                <p className="text-zinc-400 smooch-sans text-sm sm:text-base">Hi, I'm</p>
                                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white smooch-sans leading-tight">
                                    Syed Imran
                                </h1>
                                <p className="smooch-sans text-base sm:text-lg text-zinc-400">
                                    Fullstack Developer
                                </p>

                                {/* Description */}
                                <div className="space-y-4 smooch-sans">
                                    <p className="text-zinc-300 text-sm sm:text-base leading-relaxed max-w-xl">
                                        <span className="italic">BillionTube v1.0</span> is my first full MERN stack project — a video platform where I'm learning real-world development. I built it to practice user authentication, handle file uploads, and understand how everything works together.
                                    </p>
                                    <p className="text-zinc-300 text-sm sm:text-base leading-relaxed max-w-xl">
                                        Working on this project taught me more than any tutorial. Every bug I fixed and feature I added helped me understand web development better.
                                    </p>
                                    <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed max-w-xl">
                                        Is it perfect? Hell no. There's still room for improvement — better security, smoother user experience, and more features. But getting v1.0 deployed was an important milestone.
                                    </p>
                                    <p className="text-white text-sm sm:text-base leading-relaxed max-w-xl">
                                        Future releases will include better content discovery, security upgrades, smoother UX, and social features.
                                    </p>
                                </div>

                                {/* Contact Section */}
                                <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 mt-8 sm:mt-10">
                                    {/* Label */}
                                    <p className="bg-white text-zinc-900 px-5 sm:px-7 py-1 rounded-md font-medium text-sm sm:text-base smooch-sans italic text-center sm:text-left">
                                        Get In Touch
                                    </p>

                                    {/* Contact Items */}
                                    <div className="flex flex-wrap justify-center sm:justify-start  mt-3 sm:mt-0">


                                        {/* GitHub */}
                                        <a
                                            href="https://github.com/syedimranhere"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-2 sm:p-3 rounded-md 
                                           hover:text-indigo-900 transition-colors"
                                            aria-label="GitHub Profile"
                                        >
                                            <Github className="w-4 h-4 sm:w-5 sm:h-5" />
                                        </a>

                                        {/* LinkedIn */}
                                        <a
                                            href="https://www.linkedin.com/in/syed-imran-111538372/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-2 sm:p-3 rounded-md hover:text-blue-950 transition-colors"
                                            aria-label="LinkedIn Profile"
                                        >
                                            <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Right Side - Image */}
                            <div className="flex justify-center lg:justify-end">
                                <div className="w-[200px] sm:w-[240px] md:w-[288px] lg:w-[320px] h-[220px] sm:h-[240px] md:h-[380px] lg:h-[380px] rounded-lg overflow-hidden border border-zinc-900 shadow-lg">
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
    )

};

export default BillionTubeAbout;
