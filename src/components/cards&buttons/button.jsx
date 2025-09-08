export const Button = ({ children, variant = 'default', className = '', disabled = false, type = 'button' }) => {
    const baseClasses =
        "inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2 focus:ring-offset-black disabled:pointer-events-none disabled:opacity-50";

    const variants = {
        default: "bg-white text-black hover:bg-neutral-200 font-semibold hover:shadow-lg",
        outline: "border border-neutral-700 bg-transparent text-neutral-300 hover:bg-neutral-800 hover:border-neutral-600 hover:shadow-md",
        ghost: "bg-transparent text-neutral-400 hover:text-white hover:bg-neutral-900"
    };

    return (
        <button
            type={type}
            className={`${baseClasses} ${variants[variant]} ${className}`}
            disabled={disabled}
        >
            {children}
        </button>
    );
};
