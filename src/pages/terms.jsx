
import { ArrowLeft } from 'lucide-react';

export default function TermsOfService() {
    const handleGoBack = () => {
        window.history.back();
    };
    const terms = [
        {
            title: "1. Using BillionTube",
            content: [
                "You may browse, search, and upload content (where features are available).",
                "You are responsible for your own account activity. Don't share your password.",
                "You agree not to abuse the platform (spamming, exploiting bugs, or breaking local laws).",
            ],
        },
        {
            title: "2. Content",
            content: [
                "You retain ownership of any content you upload.",
                "By uploading, you give BillionTube permission to display and distribute your content on the platform.",
                "Don't upload anything illegal, harmful, or that violates someone else's rights (e.g., copyright, trademarks).",
            ],
        },
        {
            title: "3. Early-Stage Disclaimer",
            content: [
                "BillionTube is in development. Features may break, be removed, or change without notice.",
                "We are not liable for any data loss, downtime, or issues caused by the project at this stage.",
                "This platform should not be relied on for commercial or critical use—yet.",
            ],
        },
        {
            title: "4. Privacy",
            content: [
                "We collect basic data needed to run the platform (account info, uploads, analytics).",
                "We will not sell your personal data.",
                "Since this is a demo/early version, data handling practices may improve as we grow.",
            ],
        },
        {
            title: "5. Termination",
            content: [
                "We may suspend or remove accounts that violate these terms.",
                "You may delete your account at any time.",
            ],
        },
        {
            title: "6. Governing Law",
            content: [
                "These terms are governed by general international principles of internet service use (specific laws may apply depending on your region).",
            ],
        },
    ]
    return (
        <div className="bg-black text-gray-300 min-h-screen">
            {/* Back Button */}
            <div className="px-4 sm:px-6 lg:px-8 pt-6">
                <button
                    onClick={() => window.history.back()}
                    className="inline-flex items-center px-3 sm:px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg shadow-md transition-all text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    ← Back
                </button>
            </div>

            {/* Main Content */}
            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">

                <div className="mb-8 sm:mb-12 text-center sm:text-left">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
                        Terms of Service
                    </h1>
                    <p className="text-gray-400 text-base sm:text-lg">
                        <strong>Last Updated:</strong> [September 10, 2025]
                    </p>
                </div>

                {/* Introduction */}
                <div className="mb-10 sm:mb-12 text-base sm:text-lg leading-relaxed">
                    <p>
                        Welcome to <strong className="text-white">BillionTube</strong>. By using this platform, you agree to the following simple terms. Since this is an early-stage project, these terms may evolve as the product grows.
                    </p>
                </div>

                {/* Terms Sections */}
                <div className="space-y-8 sm:space-y-12">
                    {terms.map((section, idx) => (
                        <section key={idx}>
                            <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 border-b border-gray-800 pb-1 sm:pb-2">
                                {section.title}
                            </h2>
                            <ul className="space-y-2 sm:space-y-3 list-disc list-inside ml-4 text-base sm:text-lg">
                                {section.content.map((item, i) => (
                                    <li key={i}>{item}</li>
                                ))}
                            </ul>
                        </section>
                    ))}


                    <section>
                        <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 border-b border-gray-800 pb-1 sm:pb-2">
                            7. Contact
                        </h2>
                        <p className="leading-relaxed text-base sm:text-lg">
                            For any issues, suggestions, or concerns, reach out at:
                            <br />
                            <span className="inline-block mt-2 text-white font-medium">
                                📩 imransyedhere@gmail.com
                            </span>
                        </p>
                    </section>
                </div>

                {/* Footer Note */}
                <div className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-gray-800 text-center">
                    <p className="text-gray-500 text-sm sm:text-base">
                        Thank you for being part of the BillionTube journey.
                    </p>
                </div>
            </main>


            <div className="h-12 sm:h-16"></div>
        </div>
    );


}
