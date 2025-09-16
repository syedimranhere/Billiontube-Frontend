import React, { useState, useEffect, createContext, useContext } from 'react';

// Global Notification Context
const NotificationContext = createContext();

// Notification Provider Component
export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);

    const showNotification = (message, success = true) => {
        const id = Date.now() + Math.random();
        const newNotification = {
            id,
            message,
            success,
            timestamp: Date.now()
        };

        setNotifications(prev => [...prev, newNotification]);

        // Auto remove after 3 seconds
        setTimeout(() => {
            setNotifications(prev => prev.filter(notif => notif.id !== id));
        }, 900);
    };

    const removeNotification = (id) => {
        setNotifications(prev => prev.filter(notif => notif.id !== id));
    };

    return (
        <NotificationContext.Provider value={{ showNotification }}>
            {children}
            <NotificationContainer
                notifications={notifications}
                removeNotification={removeNotification}
            />
        </NotificationContext.Provider>
    );
};

// Hook to use notifications
export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotification must be used within a NotificationProvider');
    }
    return context;
};

const NotificationContainer = ({ notifications, removeNotification }) => {
    return (
        <div className="fixed top-4 right-4 left-4 sm:left-auto z-50 space-y-2 sm:space-y-2">
            {notifications.map((notification) => (
                <NotificationItem
                    key={notification.id}
                    notification={notification}
                    onRemove={() => removeNotification(notification.id)}
                />
            ))}
        </div>
    );
};

const NotificationItem = ({ notification, onRemove }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Trigger entrance animation
        setTimeout(() => setIsVisible(true), 10);
    }, []);

    const handleRemove = () => {
        setIsVisible(false);
        setTimeout(onRemove, 300); // Wait for exit animation
    };

    return (
        <div
            className={`transform transition-all duration-400 ease-in-out ${isVisible
                    ? "translate-x-0 opacity-100 scale-100"
                    : "translate-x-full opacity-0 scale-95"
                }`}
        >
            <div
                className={`
        px-3 py-2 sm:px-5 sm:py-4 rounded-lg shadow-lg border-l-4 
        w-full max-w-[90%] sm:max-w-md
        ${notification.success
                        ? "bg-neutral-950 text-neutral-200 border-green-400"
                        : "bg-neutral-950 border-red-500 text-neutral-200"
                    }
      `}
            >
                <div className="flex items-start justify-between gap-2 sm:gap-3">
                    {/* Left Section */}
                    <div className="flex items-start flex-1 min-w-0">
                        <div
                            className={`w-2 h-2 rounded-full mt-1 mr-2 sm:mr-3 flex-shrink-0 ${notification.success ? "bg-green-400" : "bg-red-500"
                                }`}
                        ></div>
                        <p className="text-sm sm:text-base font-medium leading-relaxed break-words">
                            {notification.message}
                        </p>
                    </div>

                    {/* Close Button */}
                    <button
                        onClick={handleRemove}
                        className="flex-shrink-0 text-gray-400 hover:text-gray-200 transition-colors 
                     p-1 rounded touch-manipulation active:scale-90"
                        aria-label="Close notification"
                    >
                        <svg
                            className="w-5 h-5 sm:w-6 sm:h-6"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 
                 0 111.414 1.414L11.414 10l4.293 4.293a1 1 
                 0 01-1.414 1.414L10 11.414l-4.293 
                 4.293a1 1 0 01-1.414-1.414L8.586 
                 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );

};