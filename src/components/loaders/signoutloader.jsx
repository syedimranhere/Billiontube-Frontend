import { Loader2 } from "lucide-react"
export const SignoutLoader = () => {
    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center z-[9999]">
            <div className="bg-neutral-900 border border-neutral-700 rounded-lg p-8 flex flex-col items-center">
                <Loader2 className="h-8 w-8 text-blue-500 animate-spin mb-4" />
                <p className="text-white text-lg font-medium">Signing out...</p>
                <p className="text-neutral-400 text-sm mt-1">Please wait a moment</p>
            </div>
        </div>
    )
}