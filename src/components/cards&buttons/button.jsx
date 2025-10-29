export default function Button({ children, type, className }) {
    return (
        <button
            type={type}
            className={`px-6 smooch-sans w-full py-3 rounded-4xl 
     bg-gradient-to-bl to-indigo-900 
          hover:bg-gradient-to-br hover:to-indigo-950  
    text-white font-medium text-md   transition-[background-position,background-color,transform] duration-300 ease-linear 
          bg-[length:200%_200%] bg-[position:100%_0] hover:bg-[position:0_0] 
     will-change-transform will-change-background-position
    ${className}`}
        >
            {children}
        </button>
    );
}