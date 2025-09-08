import { Camera, Edit3, Lock, User, Save, X } from 'lucide-react';
import { timeAgo } from "../utils/timeago.js";
import { Loader2 } from 'lucide-react';
import { useAccountSettings } from "../hooks/user/useaccountsettings.js";

const AccountSettings = () => {
    const {
        pfploading,
        setpfploading,
        settingit,
        setsettingit,
        userInfo,
        setUserInfo,
        error,
        seterror,
        formData,
        setFormData,
        editMode,
        setEditMode,
        fileInputRef,
        handleProfilePictureClick,
        handleFileChange,
        handleUsernameSubmit,
        handleFullnameSubmit,
        handlePasswordSubmit,
        handleCancel,
        user
    } = useAccountSettings();

    return (
        <div className="min-h-screen bg-black">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">

                {/* Page Header */}
                <header className="mb-8 sm:mb-12">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">
                        Account Settings
                    </h1>
                    <p className="text-sm sm:text-base text-gray-400">
                        Manage your profile and account preferences
                    </p>
                </header>

                {/* Profile Picture Section */}
                <section
                    className="bg-black rounded-lg sm:rounded-xl border border-gray-700/50 p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8"
                    aria-labelledby="profile-picture-heading"
                >
                    <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
                        <div className="relative group flex-shrink-0">
                            {pfploading ? (
                                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-neutral-800 flex items-center justify-center">
                                    <Loader2 className="h-8 w-8 sm:h-12 sm:w-12 text-white animate-spin" />
                                </div>
                            ) : (
                                <button
                                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-neutral-200 border-2 border-neutral-200 flex items-center justify-center hover:border-gray-600 transition-all duration-300 overflow-hidden focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
                                    onClick={handleProfilePictureClick}
                                    aria-label="Change profile picture"
                                >
                                    {userInfo.profilePicture ? (
                                        <img
                                            src={userInfo.profilePicture}
                                            alt={`${userInfo.fullname || 'User'}'s profile picture`}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                e.target.style.display = "none";
                                                e.target.nextSibling.style.display = "flex";
                                            }}
                                        />
                                    ) : null}

                                    <span
                                        className={`text-lg sm:text-2xl font-semibold text-neutral-300 ${userInfo.profilePicture ? 'hidden' : 'flex'} items-center justify-center w-full h-full`}
                                        aria-hidden="true"
                                    >
                                        {userInfo.fullname?.charAt(0) || "U"}
                                    </span>

                                    {/* Hover Overlay */}
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                                        <Camera className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                    </div>
                                </button>
                            )}

                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                accept="image/*"
                                className="sr-only"
                                id="profile-picture-input"
                            />
                        </div>

                        <div className="text-center sm:text-left">
                            <h2 id="profile-picture-heading" className="text-base sm:text-lg font-semibold text-white mb-1">
                                Profile Picture
                            </h2>
                            <p className="text-gray-400 text-xs sm:text-sm">
                                Click to change your profile picture
                            </p>
                        </div>
                    </div>
                </section>

                {/* Username Section */}
                <section
                    className="bg-black rounded-lg sm:rounded-xl border border-neutral-700/50 p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8"
                    aria-labelledby="username-heading"
                >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6">
                        <h2 id="username-heading" className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-0">
                            Username
                        </h2>
                        {!editMode.username && (
                            <button
                                onClick={() => setEditMode((prev) => ({ ...prev, username: true }))}
                                className="px-3 sm:px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white text-sm rounded-lg transition-colors flex items-center space-x-2 self-start sm:self-auto"
                            >
                                <Edit3 className="w-4 h-4" />
                                <span className="hidden sm:inline">Change Username</span>
                                <span className="sm:hidden">Change</span>
                            </button>
                        )}
                    </div>

                    {!editMode.username ? (
                        <div className="space-y-4">
                            <div>
                                <label className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                                    Username
                                </label>
                                <p className="text-white text-base sm:text-lg font-medium break-all">
                                    {userInfo.username}
                                </p>
                            </div>
                            <div>
                                <label className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                                    Email
                                </label>
                                <p className="text-white text-base sm:text-lg font-medium break-all">
                                    {userInfo.email}
                                </p>
                            </div>
                        </div>
                    ) : (
                        <form onSubmit={(e) => { e.preventDefault(); handleUsernameSubmit(); }}>
                            <div className="space-y-4 sm:space-y-6">
                                <div>
                                    <label htmlFor="username-input" className="block text-sm font-medium text-gray-400 mb-2">
                                        Username
                                    </label>
                                    <input
                                        id="username-input"
                                        type="text"
                                        value={formData.username}
                                        onChange={(e) =>
                                            setFormData((prev) => ({ ...prev, username: e.target.value }))
                                        }
                                        className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition-colors text-sm sm:text-base"
                                        required
                                        minLength="3"
                                        maxLength="30"
                                    />
                                </div>
                                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                                    <button
                                        type="submit"
                                        disabled={settingit}
                                        className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-white text-black rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2 font-medium text-sm sm:text-base"
                                    >
                                        {settingit ? (
                                            <Loader2 className="h-4 w-4 animate-spin text-black" />
                                        ) : (
                                            <>
                                                <Save className="w-4 h-4" />
                                                <span>Save Username</span>
                                            </>
                                        )}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleCancel("username")}
                                        className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-neutral-800 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center space-x-2 text-sm sm:text-base"
                                    >
                                        <X className="w-4 h-4" />
                                        <span>Cancel</span>
                                    </button>
                                </div>
                            </div>
                        </form>
                    )}
                </section>

                {/* Full Name Section */}
                <section
                    className="bg-black rounded-lg sm:rounded-xl border border-gray-700/50 p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8"
                    aria-labelledby="fullname-heading"
                >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6">
                        <h2 id="fullname-heading" className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-0">
                            Full Name
                        </h2>
                        {!editMode.fullname && (
                            <button
                                onClick={() => setEditMode((prev) => ({ ...prev, fullname: true }))}
                                className="px-3 sm:px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white text-sm rounded-lg transition-colors flex items-center space-x-2 self-start sm:self-auto"
                            >
                                <User className="w-4 h-4" />
                                <span className="hidden sm:inline">Change Full Name</span>
                                <span className="sm:hidden">Change</span>
                            </button>
                        )}
                    </div>

                    {!editMode.fullname ? (
                        <div>
                            <label className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                                Full Name
                            </label>
                            <p className="text-white text-base sm:text-lg font-medium break-words">
                                {userInfo.fullname}
                            </p>
                        </div>
                    ) : (
                        <form onSubmit={(e) => { e.preventDefault(); handleFullnameSubmit(); }}>
                            <div className="space-y-4 sm:space-y-6">
                                <div>
                                    <label htmlFor="fullname-input" className="block text-sm font-medium text-neutral-400 mb-2">
                                        Full Name
                                    </label>
                                    <input
                                        id="fullname-input"
                                        type="text"
                                        value={formData.fullname}
                                        onChange={(e) =>
                                            setFormData((prev) => ({ ...prev, fullname: e.target.value }))
                                        }
                                        className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-neutral-900 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition-colors text-sm sm:text-base"
                                        required
                                        minLength="2"
                                        maxLength="50"
                                    />
                                </div>
                                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                                    <button
                                        type="submit"
                                        disabled={settingit}
                                        className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-white text-black rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2 font-medium text-sm sm:text-base"
                                    >
                                        {settingit ? (
                                            <Loader2 className="h-4 w-4 animate-spin text-black" />
                                        ) : (
                                            <>
                                                <Save className="w-4 h-4" />
                                                <span>Save Full Name</span>
                                            </>
                                        )}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleCancel("fullname")}
                                        className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-neutral-800 text-white rounded-lg hover:bg-neutral-700 transition-colors flex items-center justify-center space-x-2 text-sm sm:text-base"
                                    >
                                        <X className="w-4 h-4" />
                                        <span>Cancel</span>
                                    </button>
                                </div>
                            </div>
                        </form>
                    )}
                </section>

                {/* Change Password Section */}
                <section
                    className="bg-black rounded-lg sm:rounded-xl border border-neutral-700/50 p-4 sm:p-6 lg:p-8"
                    aria-labelledby="password-heading"
                >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6">
                        <h2 id="password-heading" className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-0">
                            Password
                        </h2>
                        {!editMode.password && (
                            <button
                                onClick={() => setEditMode((prev) => ({ ...prev, password: true }))}
                                className="px-3 sm:px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white text-sm rounded-lg transition-colors flex items-center space-x-2 self-start sm:self-auto"
                            >
                                <Lock className="w-4 h-4" />
                                <span className="hidden sm:inline">Change Password</span>
                                <span className="sm:hidden">Change</span>
                            </button>
                        )}
                    </div>

                    {!editMode.password ? (
                        <p className="text-gray-300 text-sm sm:text-base">
                            {user.passwordUpdatedAt
                                ? `Password was last changed ${timeAgo(user.passwordUpdatedAt)}`
                                : "Password was never changed"
                            }
                        </p>
                    ) : (
                        <form onSubmit={(e) => { e.preventDefault(); handlePasswordSubmit(); }}>
                            <div className="space-y-4 sm:space-y-6">
                                <div>
                                    <label htmlFor="current-password" className="block text-sm font-medium text-gray-400 mb-2">
                                        Current Password
                                    </label>
                                    <input
                                        id="current-password"
                                        type="password"
                                        value={formData.currentPassword}
                                        onChange={(e) =>
                                            setFormData((prev) => ({ ...prev, currentPassword: e.target.value }))
                                        }
                                        className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-neutral-900 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition-colors text-sm sm:text-base"
                                        required
                                        autoComplete="current-password"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="new-password" className="block text-sm font-medium text-gray-400 mb-2">
                                        New Password
                                    </label>
                                    <input
                                        id="new-password"
                                        type="password"
                                        value={formData.newPassword}
                                        onChange={(e) =>
                                            setFormData((prev) => ({ ...prev, newPassword: e.target.value }))
                                        }
                                        className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-neutral-900 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition-colors text-sm sm:text-base"
                                        required
                                        minLength="8"
                                        autoComplete="new-password"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-400 mb-2">
                                        Confirm New Password
                                    </label>
                                    <input
                                        id="confirm-password"
                                        type="password"
                                        value={formData.confirmPassword}
                                        onChange={(e) =>
                                            setFormData((prev) => ({ ...prev, confirmPassword: e.target.value }))
                                        }
                                        className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-neutral-900 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition-colors text-sm sm:text-base"
                                        required
                                        autoComplete="new-password"
                                    />
                                </div>

                                {/* Error message */}
                                {error && (
                                    <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                                        <p className="text-red-400 text-sm font-medium" role="alert">
                                            {error}
                                        </p>
                                    </div>
                                )}

                                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                                    <button
                                        type="submit"
                                        disabled={settingit}
                                        className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-white text-black rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2 font-medium text-sm sm:text-base"
                                    >
                                        {settingit ? (
                                            <Loader2 className="h-4 w-4 animate-spin text-black" />
                                        ) : (
                                            <>
                                                <Save className="w-4 h-4" />
                                                <span>Update Password</span>
                                            </>
                                        )}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleCancel("password")}
                                        className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center space-x-2 text-sm sm:text-base"
                                    >
                                        <X className="w-4 h-4" />
                                        <span>Cancel</span>
                                    </button>
                                </div>
                            </div>
                        </form>
                    )}
                </section>
            </div>
        </div>
    );
};

export default AccountSettings;