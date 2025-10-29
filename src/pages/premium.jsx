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
            buttonStyle: "bg-gradient-to-r  hover:to-neutral-400 via-gray-600 transition-colors durationn-400 from-neutral-400 text-black hover:text-white transition-all duration-400  "

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
            buttonStyle: "bg-gradient-to-r  hover:to-neutral-400 via-gray-600 transition-colors durationn-400 from-neutral-400 text-black hover:text-white transition-all duration-400  "
        },
    ];

    return (
        <div className="min-h-screen smooch-sans w-full relative mt-15 bg-black">

            <div
                className="absolute inset-0 z-0"
                style={{
                    background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(139, 92, 246, 0.25), transparent 70%), #000000",
                }}
            />
            <div className="min-h-screen  flex flex-col z-20 mb-10  items-center justify-center bg-black   ">
                {/* Header */}
                <h1 className="text-4xl instrument-serif-regular  italic text-white itext-center z-10 mb-3">
                    Choose Your Plan
                </h1>
                <p className="text-gray-200 text-lg instrument-serif-regular mb-7 text-center z-10 ">
                    No contracts. Cancel anytime.
                </p>

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-9 max-w-4xl w-full">
                    {/* insteal of writing cards two time we use map  */}
                    {plans.map((plan, i) => (
                        <div
                            key={i}

                            className="relative flex flex-col justify-between 
bg-gradient-to-bl from-gray-900 via-gray-950 to-black 
border border-neutral-800 rounded-2xl 
shadow-lg shadow-gray-700/20 
hover:shadow-gray-500/z20 hover:border-indigo-900/50 
transition-all duration-600 p-8"



                        >
                            {
                                plan.badge && (
                                    <div className="absolute -top-3 left-6 bg-gradient-to-tl from-purple-950 via-gray-900 to-black text-md font-semibold px-3 py-1 rounded-full text-white">
                                        {plan.badge}
                                    </div>
                                )
                            }

                            < div >
                                <h2 className="text-lg text-gray-200  font-bold  mb-2">
                                    {plan.title}
                                </h2>
                                <p className="text-3xl smooch-sans  text-white">
                                    {plan.price}{" "}
                                    <span className="text-sm font-normal text-gray-400">
                                        {plan.subtitle}
                                    </span>
                                </p>
                                <ul className="mt-6 space-y-3 smooch-sans text-gray-300 text-sm">
                                    {plan.features.map((f, idx) => (
                                        <li key={idx} className="flex items-center gap-2">
                                            <Check className="w-4 h-4 text-blue-400" />
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <button
                                className={`mt-8 w-full p-3 rounded-3xl transition-all  font-medium ${plan.buttonStyle}`}
                            >
                                Get Started
                            </button>
                        </div>
                    ))}
                </div>
            </div >
        </div >

    );
}
