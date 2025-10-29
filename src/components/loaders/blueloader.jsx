import { Loader2 } from "lucide-react";

export const Blueloader = () => {
    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center pt-14 sm:pt-16">
            <Loader2 className="animate-spin h-12 w-12 text-indigo-800" />
        </div>
    );
}