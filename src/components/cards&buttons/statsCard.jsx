export const StatCard = ({ icon: Icon, title, value, subtitle }) => (
    <div className="bg-neutral-900 rounded-lg p-6 border border-neutral-800 hover:border-neutral-700 transition-colors">
        <div className="flex items-center justify-between mb-4">
            <Icon className="w-5 h-5 text-neutral-400" />
        </div>
        <div className="space-y-1">
            <p className="text-2xl font-semibold text-white">
                {typeof value === 'number' ? value.toLocaleString() : value}
            </p>
            <p className="text-sm text-neutral-400">{title}</p>
            {subtitle && <p className="text-xs text-neutral-500">{subtitle}</p>}
        </div>
    </div>
);

export const LargeStatCard = ({ icon: Icon, title, value, subtitle }) => (
    <div className="bg-neutral-900 rounded-lg p-8 border border-neutral-800 hover:border-neutral-700 transition-colors">
        <div className="flex items-center justify-between mb-6">
            <Icon className="w-6 h-6 text-neutral-400" />
        </div>
        <div className="space-y-2">
            <p className="text-4xl font-semibold text-white">
                {typeof value === 'number' ? value.toLocaleString() : value}
            </p>

            <p className="text-sm text-neutral-400">{title}</p>
            {subtitle && <p className="text-xs text-neutral-500">{subtitle}</p>}
        </div>
    </div>
);