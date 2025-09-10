import { Check } from "lucide-react";

export default function Pricing() {
    const plans = [
        {
            title: "Monthly",
            price: "$3.99",
            subtitle: "/month",
            features: [
                "Verified badge",
                "See who viewed your profile",
                "See all subscribers",
                "Boosted reach",
                "Advanced analytics",
            ],
            buttonStyle: "bg-neutral-800 text-white hover:bg-neutral-700",
        },
        {
            title: "Annual",
            price: "$39.99",
            subtitle: "/year",
            badge: "Most Popular",
            features: [
                "Verified badge",
                "See who viewed your profile",
                "See all subscribers",
                "Boosted reach",
                "Advanced analytics",
            ],
            buttonStyle: "bg-blue-600 text-white hover:bg-blue-500",
        },
    ];

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-black px-6 py-16 font-['Inter']">
            {/* Header */}
            <h1 className="text-4xl font-bold text-white itext-center mb-3">
                Choose Your Plan
            </h1>
            <p className="text-gray-400 text-lg mb-12 text-center">
                No contracts. Cancel anytime.
            </p>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
                {/* insteal of writing cards two time we use map  */}
                {plans.map((plan, i) => (
                    <div
                        key={i}
                        className="relative flex flex-col justify-between bg-[#111] border border-neutral-800 rounded-lg p-8 hover:border-blue-500 transition"
                    >blue
                        {/* Badge */}
                        {plan.badge && (
                            <div className="absolute -top-3 left-6 bg-blue-600 text-xs font-semibold px-3 py-1 rounded-full text-white">
                                {plan.badge}
                            </div>
                        )}

                        <div>
                            <h2 className="text-xl font-semibold text-white mb-2">
                                {plan.title}
                            </h2>
                            <p className="text-3xl font-bold text-white">
                                {plan.price}{" "}
                                <span className="text-sm font-normal text-gray-400">
                                    {plan.subtitle}
                                </span>
                            </p>
                            <ul className="mt-6 space-y-3 text-gray-300 text-sm">
                                {plan.features.map((f, idx) => (
                                    <li key={idx} className="flex items-center gap-2">
                                        <Check className="w-4 h-4 text-blue-400" />
                                        {f}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <button
                            className={`mt-8 w-full py-2.5 rounded-md font-medium ${plan.buttonStyle}`}
                        >
                            Get Started
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
