import { Link, useNavigate } from 'react-router-dom';
import { useRegister } from '../hooks/user/useRegister';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import Button from '../components/cards&buttons/button';
export default function SignupPage() {
  const {
    formData,
    loading,
    showPassword,
    error,
    handleInputChange,
    handleFileChange,
    handleSubmit,
    countries,
    genders,
    setShowPassword
  } = useRegister();

  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">

      <div
        className="absolute inset-0 z-0"
        style={{
          background: "radial-gradient(125% 125% at 50% 10%, #000000 40%, #0d1a36 100%)",
        }}
      />



      <header className="absolute top-0 left-0 right-0 z-30 p-6  sm:p-6">
        <Link
          to="/"
          aria-label="Go to BillionTube homepage"
          className="flex items-center gap-2 sm:gap-3"
        >
          {/* Logo Icon */}
          <img
            src="/file.svg"
            alt="BillionTube logo"
            className="w-8 h-8 sm:w-10 sm:h-10"
          />

          {/* Brand Name */}
          <h1 className="michroma-regular text-xl sm:text-2xl md:text-3xl font-bold  text-white tracking-tight hover:text-gray-200 transition-colors">
            BillionTube
          </h1>
        </Link>
      </header>


      {/* Main Content */}
      <div className="relative mt-7  z-20 flex items-center justify-center min-h-screen px-4 sm:px-6 pt-16 sm:pt-20 pb-8">
        <div className="w-full max-w-lg lg:max-w-2xl">
          {/* Compact Card Container */}
          <div className="bg-neutral-900/95 backdrop-blur-xl border opacity-85 border-neutral-800/80 rounded-md  p-6 sm:p-8 shadow-2xl relative">
            <div className="absolute inset-0 bg-gradient-to-b from-neutral-800/20 to-transparent rounded-xl sm:rounded-2xl pointer-events-none"></div>

            <div className="relative z-10">
              {/* Header Section */}
              <div className="text-center smooch-sans space-y-4 mb-6">
                <h2 className="text-2xl smooch-sans sm:text-3xl font-bold text-white tracking-tight">
                  Create your account
                </h2>
                <p className="text-neutral-400 text-sm sm:text-base">
                  Already have an account?{' '}
                  <button
                    className="text-white  hover:underline smooch-sans"
                    onClick={() => navigate('/login')}
                  >
                    Sign in
                  </button>
                </p>
              </div>

              {/* Signup Form */}
              <form onSubmit={handleSubmit} className="space-y-4 ">
                {/* Name and Username Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-neutral-300 block">Full Name</label>
                    <input
                      type="text"
                      name="fullname"
                      value={formData.fullname}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2.5 bg-neutral-900/80 backdrop-blur border border-neutral-700 rounded-sm text-white placeholder-neutral-500 focus:outline-none focus:border-indigo-700  focus:ring-neutral-800  transition-all text-sm"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-neutral-300 block">Username</label>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2.5 bg-neutral-900/80 backdrop-blur border border-neutral-700 rounded-sm text-white placeholder-neutral-500 focus:outline-none focus:border-indigo-900 focus:ring-1 focus:ring-neutral-800 transition-all  text-sm"
                      required
                    />
                  </div>
                </div>

                {/* Email and Password Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-neutral-300 block">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2.5 bg-neutral-900/80 backdrop-blur border border-neutral-700 rounded-sm text-white placeholder-neutral-500 focus:outline-none focus:border-indigo-700 focus:ring-1 focus:ring-neutral-800   transition-all text-sm"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-neutral-300 block">Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2.5 bg-neutral-900/80 backdrop-blur border border-neutral-700 rounded-sm text-white placeholder-neutral-500 focus:outline-none focus:border-indigo-700 focus:ring-1 focus:ring-neutral-800   transition-all hover:bg-neutral-800 pr-10 text-sm"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-white transition-colors"
                      >
                        {showPassword ? (
                          <Eye className="w-4 text-indigo-900 h-4" />
                        ) : (
                          <EyeOff className="w-4 text-indigo-300 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Gender and Country Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-neutral-300 block">Gender</label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2.5 bg-neutral-900/80 backdrop-blur border border-neutral-700 rounded-sm text-white focus:outline-none focus:border-indigo-700 focus:ring-1 focus:ring-neutral-800   hover:bg-neutral-800 cursor-pointer text-sm"
                      required
                    >
                      <option value="" disabled>Select gender</option>
                      {genders.map(g => (
                        <option key={g} value={g} className="bg-neutral-800">{g}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-neutral-300 block">Country</label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2.5 bg-neutral-900/80 backdrop-blur border border-neutral-700 rounded-sm text-white focus:outline-none focus:border-indigo-700 focus:ring-1 focus:ring-neutral-800   transition-all hover:bg-neutral-800 cursor-pointer text-sm"
                      required
                    >
                      <option value="" disabled>Select country</option>
                      {countries.map(c => (
                        <option key={c} value={c} className="bg-neutral-800">{c}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Profile Picture */}
                <div className="space-y-1">
                  <label className="text-sm font-medium text-neutral-300 block">Profile Picture</label>
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full px-3 py-2.5 bg-neutral-900/80 backdrop-blur border border-neutral-700 rounded-xs text-white file:mr-3 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:font-medium file:bg-neutral-700 file:text-white hover:file:bg-neutral-600 file:cursor-pointer cursor-pointer focus:outline-none focus:border-indigo-700 focus:ring-1 focus:ring-neutral-800   transition-all hover:bg-neutral-800 text-sm"

                  />
                </div>

                {/* Error Message */}
                {error && (
                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                    <p className="text-red-400 text-sm">{error}</p>
                  </div>
                )}

                {/* Submit Button */}
                <div className="pt-2 smooch-sans">
                  <Button

                  >
                    {loading ? (
                      <>
                        <Loader2 className="animate-spin text-black h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
                        <span className="hidden sm:inline">Creating...</span>
                      </>
                    ) : (
                      "Create Account"
                    )}
                  </Button>
                </div>

              </form>

            </div>
          </div>
        </div>
      </div>
    </div >
  );
}