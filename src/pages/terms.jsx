
import { ArrowLeft } from 'lucide-react';

export default function TermsOfService() {
    const handleGoBack = () => {
        window.history.back();
    };

    return (
        <div className="bg-black text-gray-300 min-h-screen">

            {/* Main Content */}
            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="max-w-none">
                    {/* Title and Date */}
                    <div className="mb-12">
                        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                            Terms of Service
                        </h1>
                        <p className="text-gray-400 text-lg">
                            <strong>Last Updated:</strong> [Insert Date]
                        </p>
                    </div>

                    {/* Introduction */}
                    <div className="mb-10">
                        <p className="text-lg leading-relaxed">
                            Welcome to <strong className="text-white">BillionTube</strong>. By using this platform, you agree to the following simple terms. Since this is an early-stage project, these terms may evolve as the product grows.
                        </p>
                    </div>

                    {/* Terms Sections */}
                    <div className="space-y-10">
                        {/* Section 1 */}
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4 border-b border-gray-800 pb-2">
                                1. Using BillionTube
                            </h2>
                            <ul className="space-y-3 list-disc list-inside ml-4">
                                <li>You may browse, search, and upload content (where features are available).</li>
                                <li>You are responsible for your own account activity. Don't share your password.</li>
                                <li>You agree not to abuse the platform (spamming, exploiting bugs, or breaking local laws).</li>
                            </ul>
                        </section>

                        {/* Section 2 */}
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4 border-b border-gray-800 pb-2">
                                2. Content
                            </h2>
                            <ul className="space-y-3 list-disc list-inside ml-4">
                                <li>You retain ownership of any content you upload.</li>
                                <li>By uploading, you give BillionTube permission to display and distribute your content on the platform.</li>
                                <li>Don't upload anything illegal, harmful, or that violates someone else's rights (e.g., copyright, trademarks).</li>
                            </ul>
                        </section>

                        {/* Section 3 */}
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4 border-b border-gray-800 pb-2">
                                3. Early-Stage Disclaimer
                            </h2>
                            <ul className="space-y-3 list-disc list-inside ml-4">
                                <li>BillionTube is in development. Features may break, be removed, or change without notice.</li>
                                <li>We are not liable for any data loss, downtime, or issues caused by the project at this stage.</li>
                                <li>This platform should not be relied on for commercial or critical use—yet.</li>
                            </ul>
                        </section>

                        {/* Section 4 */}
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4 border-b border-gray-800 pb-2">
                                4. Privacy
                            </h2>
                            <ul className="space-y-3 list-disc list-inside ml-4">
                                <li>We collect basic data needed to run the platform (account info, uploads, analytics).</li>
                                <li>We will not sell your personal data.</li>
                                <li>Since this is a demo/early version, data handling practices may improve as we grow.</li>
                            </ul>
                        </section>

                        {/* Section 5 */}
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4 border-b border-gray-800 pb-2">
                                5. Termination
                            </h2>
                            <ul className="space-y-3 list-disc list-inside ml-4">
                                <li>We may suspend or remove accounts that violate these terms.</li>
                                <li>You may delete your account at any time.</li>
                            </ul>
                        </section>

                        {/* Section 6 */}
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4 border-b border-gray-800 pb-2">
                                6. Governing Law
                            </h2>
                            <ul className="space-y-3 list-disc list-inside ml-4">
                                <li>These terms are governed by general international principles of internet service use (specific laws may apply depending on your region).</li>
                            </ul>
                        </section>

                        {/* Section 7 */}
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4 border-b border-gray-800 pb-2">
                                7. Contact
                            </h2>
                            <p className="leading-relaxed">
                                For any issues, suggestions, or concerns, reach out at:
                                <br />
                                <span className="inline-block mt-2">
                                    📩 <strong className="text-white">support@billiontube.dev</strong> (placeholder email)
                                </span>
                            </p>
                        </section>
                    </div>

                    {/* Footer Note */}
                    <div className="mt-16 pt-8 border-t border-gray-800">
                        <p className="text-gray-500 text-center">
                            Thank you for being part of the BillionTube journey.
                        </p>
                    </div>
                </div>
            </main>

            {/* Bottom Spacing */}
            <div className="h-16"></div>
        </div>
    );
}
