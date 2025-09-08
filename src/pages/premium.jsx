import { useState } from "react";
import { Check } from "lucide-react";

export default function Pricing() {
    const [billing, setBilling] = useState("monthly");

    const plans = {
        monthly: {
            title: "Monthly Plan",
            price: "$3.99 / month",
            features: [
                "Verified badge",
                "See who viewed your profile",
                "See all subscribers",
                "Boosted reach",
                "Advanced analytics",
            ],
        },
        annually: {
            title: "Annual Plan",
            price: "$39.99 / year (~$3.33/month)",
            features: [
                "Verified badge",
                "See who viewed your profile",
                "See all subscribers",
                "Boosted reach",
                "Advanced analytics",
            ],
        },
    };

    return (
        <div className="min-h-screen relative flex flex-col items-center justify-center px-6 py-16 font-['Inter'] overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-[#0d0d0d]">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-transparent to-blue-900/40" />
                <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-purple-700/20 rounded-full blur-[180px]" />
                <div className="absolute bottom-[-100px] right-[-100px] w-[400px] h-[400px] bg-blue-600/20 rounded-full blur-[160px]" />
            </div>

            {/* Header */}
            <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4 relative z-10">
                Choose Your Plan
            </h1>
            <p className="text-gray-400 mb-10 text-lg text-center max-w-xl relative z-10">
                Unlock all premium features — cancel anytime, no hidden fees.
            </p>



            {/* Pricing Cards */}
            <div className="grid md:grid-cols-2 gap-10 w-full max-w-5xl relative z-10">
                {/* Monthly Card */}
                <div
                    className={`relative rounded-2xl bg-black/60 backdrop-blur-xl border border-zinc-800 p-10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-all hover:shadow-[0_8px_48px_rgba(0,0,0,0.6)] hover:scale-[1.02] ${billing === "monthly" ? "border-purple-500" : ""
                        }`}
                >
                    <h2 className="text-xl font-semibold text-white mb-2">
                        {plans.monthly.title}
                    </h2>
                    <p className="text-4xl font-bold text-white mb-8">
                        {plans.monthly.price}
                    </p>
                    <ul className="space-y-3 text-gray-300 mb-10">
                        {plans.monthly.features.map((feature, i) => (
                            <li key={i} className="flex items-center gap-2">
                                <Check className="w-4 h-4 text-purple-400" />
                                {feature}
                            </li>
                        ))}
                    </ul>
                    <button className="w-full py-3 rounded-xl font-semibold bg-gradient-to-r from-teal-500 via-blue-600 to-blue-700 text-white shadow-lg transition-all hover:shadow-[0_0_20px_rgba(139,92,246,0.6)] hover:scale-105 active:scale-95">
                        Get Started
                    </button>
                </div>

                {/* Annual Card */}
                <div
                    className={`relative rounded-2xl bg-black/60 backdrop-blur-xl border border-zinc-800 p-10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-all hover:shadow-[0_8px_48px_rgba(0,0,0,0.6)] hover:scale-[1.02] ${billing === "annually" ? "border-purple-500" : ""
                        }`}
                >
                    <div className="absolute -top-3 left-6 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-full shadow-md animate-pulse">
                        Most Popular
                    </div>
                    <h2 className="text-xl font-semibold text-white mb-2">
                        {plans.annually.title}
                    </h2>
                    <p className="text-4xl font-bold text-white mb-8">
                        {plans.annually.price}
                    </p>
                    <ul className="space-y-3 text-gray-300 mb-10">
                        {plans.annually.features.map((feature, i) => (
                            <li key={i} className="flex items-center gap-2">
                                <Check className="w-4 h-4 text-purple-400" />
                                {feature}
                            </li>
                        ))}
                    </ul>
                    <button className="w-full py-3 rounded-xl font-semibold bg-gradient-to-r from-purple-500 via-yellow-600 to-teal-700 text-white shadow-lg transition-all hover:shadow-[0_8px_20px_rgba(139,92,246,0.6)] hover:scale-105 active:scale-95">
                        Get Started
                    </button>

                </div>
            </div>

            {/* Trust Section */}
            <p className="text-gray-500 text-sm mt-12 text-center relative z-10">
                Secure payments ·  Instant activation
            </p>
        </div>
    );
}
