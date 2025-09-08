import { Loader2 } from "lucide-react";

export const Blueloader = () => {
    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
            <Loader2 className="animate-spin h-12 w-12 text-blue-500" />
        </div>
    );
}