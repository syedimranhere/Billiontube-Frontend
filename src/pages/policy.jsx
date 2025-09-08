import React from 'react';
import { ArrowLeft, Shield } from 'lucide-react';

export default function PrivacyPolicy() {
    const handleGoBack = () => {
        window.history.back();
    };

    return (
        <div className="bg-black text-gray-300 min-h-screen">
            {/* Header */}
            <header className="border-b border-gray-800 bg-black">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-between">
                        <a href="/" className="text-white text-2xl font-bold hover:text-gray-300 transition-colors">
                            BillionTube
                        </a>
                        <button
                            onClick={handleGoBack}
                            classzName="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-white border border-gray-700 rounded-lg hover:border-gray-600 transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="max-w-none">
                    {/* Title and Date with Shield Icon */}
                    <div className="mb-12">
                        <div className="flex items-center gap-3 mb-4">
                            <Shield className="w-10 h-10 text-blue-400" />
                            <h1 className="text-4xl sm:text-5xl font-bold text-white">
                                Privacy Policy
                            </h1>
                        </div>
                        <div className="mb-4">
                            <span className="inline-block px-3 py-1 bg-gray-800 text-gray-300 text-sm rounded-full border border-gray-700">
                                Draft Version
                            </span>
                        </div>
                        <p className="text-gray-400 text-lg">
                            <strong>Last Updated:</strong> [Insert Date]
                        </p>
                    </div>

                    {/* Introduction */}
                    <div className="mb-10 p-6 bg-gray-900/50 rounded-lg border border-gray-800">
                        <p className="text-lg leading-relaxed">
                            At <strong className="text-white">BillionTube</strong>, your privacy matters. Since this platform is still in development, our data practices are lightweight and may evolve as the product matures.
                        </p>
                    </div>

                    {/* Privacy Sections */}
                    <div className="space-y-10">
                        {/* Section 1 */}
                        <section className="bg-gray-900/30 p-6 rounded-lg border border-gray-800/50">
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                                <span className="text-blue-400">1.</span>
                                Information We Collect
                            </h2>
                            <p className="mb-4">When you use BillionTube, we may collect:</p>
                            <ul className="space-y-3 list-disc list-inside ml-4">
                                <li><strong className="text-gray-200">Account information</strong>: username, email, and profile details.</li>
                                <li><strong className="text-gray-200">Content data</strong>: videos, thumbnails, and descriptions you upload.</li>
                                <li><strong className="text-gray-200">Usage data</strong>: searches, views, likes, and interactions.</li>
                                <li><strong className="text-gray-200">Technical data</strong>: IP address, device type, and browser (for analytics/security).</li>
                            </ul>
                        </section>

                        {/* Section 2 */}
                        <section className="bg-gray-900/30 p-6 rounded-lg border border-gray-800/50">
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                                <span className="text-blue-400">2.</span>
                                How We Use Your Information
                            </h2>
                            <p className="mb-4">We use your data to:</p>
                            <ul className="space-y-3 list-disc list-inside ml-4">
                                <li>Run the platform and deliver its features.</li>
                                <li>Improve user experience (search accuracy, recommendations, performance).</li>
                                <li>Keep the platform safe (monitoring abuse, security checks).</li>
                            </ul>
                        </section>

                        {/* Section 3 */}
                        <section className="bg-gray-900/30 p-6 rounded-lg border border-gray-800/50">
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                                <span className="text-blue-400">3.</span>
                                Sharing of Information
                            </h2>
                            <ul className="space-y-3 list-disc list-inside ml-4">
                                <li>We <strong className="text-green-400">do not sell</strong> your personal data to third parties.</li>
                                <li>Content you upload may be publicly visible to other users.</li>
                                <li>If required by law, we may share data with authorities.</li>
                            </ul>
                        </section>

                        {/* Section 4 */}
                        <section className="bg-gray-900/30 p-6 rounded-lg border border-gray-800/50">
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                                <span className="text-blue-400">4.</span>
                                Data Storage
                            </h2>
                            <ul className="space-y-3 list-disc list-inside ml-4">
                                <li>Data is stored securely using standard database practices.</li>
                                <li>Since this is an early-stage project, uptime and backup guarantees are limited.</li>
                                <li>You may request account deletion at any time.</li>
                            </ul>
                        </section>

                        {/* Section 5 */}
                        <section className="bg-gray-900/30 p-6 rounded-lg border border-gray-800/50">
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                                <span className="text-blue-400">5.</span>
                                Cookies & Tracking
                            </h2>
                            <ul className="space-y-3 list-disc list-inside ml-4">
                                <li>We may use cookies or similar tools to improve site performance and remember preferences.</li>
                                <li>You can disable cookies in your browser settings, but some features may stop working.</li>
                            </ul>
                        </section>

                        {/* Section 6 */}
                        <section className="bg-gray-900/30 p-6 rounded-lg border border-gray-800/50">
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                                <span className="text-blue-400">6.</span>
                                Children's Privacy
                            </h2>
                            <ul className="space-y-3 list-disc list-inside ml-4">
                                <li>BillionTube is not intended for children under 13.</li>
                                <li>If we learn a child has registered, we will delete the account.</li>
                            </ul>
                        </section>

                        {/* Section 7 */}
                        <section className="bg-gray-900/30 p-6 rounded-lg border border-gray-800/50">
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                                <span className="text-blue-400">7.</span>
                                Changes to this Policy
                            </h2>
                            <p>
                                We may update this Privacy Policy as the project evolves. Updates will be posted with a new "Last Updated" date.
                            </p>
                        </section>

                        {/* Section 8 */}
                        <section className="bg-gray-900/30 p-6 rounded-lg border border-gray-800/50">
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                                <span className="text-blue-400">8.</span>
                                Contact Us
                            </h2>
                            <p className="leading-relaxed">
                                For questions or feedback about privacy:
                                <br />
                                <span className="inline-block mt-3 p-3 bg-gray-800 rounded-lg border border-gray-700">
                                    📩 <strong className="text-white">privacy@billiontube.dev</strong>
                                    <span className="text-gray-400 ml-2">(placeholder email)</span>
                                </span>
                            </p>
                        </section>
                    </div>

                    {/* Footer Note */}
                    <div className="mt-16 pt-8 border-t border-gray-800">
                        <div className="text-center">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-900/20 border border-blue-800/30 rounded-lg">
                                <Shield className="w-4 h-4 text-blue-400" />
                                <p className="text-gray-300">
                                    Your privacy is our priority as we build the future of content sharing.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Bottom Spacing */}
            <div className="h-16"></div>
        </div>
    );
}