import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './utils/Layout';
import Home from './pages/Home.jsx';
import SignupPage from './pages/signup.jsx';
import LoginPage from './pages/Login';
import VideoUploadPage from './pages/uploadVideopage.jsx';
import VideoPage from './pages/videoPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import Dashboard from './pages/Dashboard.jsx';
import AccountSettings from './pages/accountsettings.jsx'
import VideoManagement from './pages/uservideos';
import UnauthorizedPage from './pages/unauthorized.jsx';
import LikedVideos from './pages/LikedVideos.jsx';
import { WatchLaterPage } from './pages/watchlater.jsx';
import Mysubscriptions from './pages/mysubscriptions.jsx';
import WatchHistory from './pages/watchHistory.jsx';
import Premium from './pages/premium.jsx';
import BillionTubeAbout from './pages/about.jsx';
import TrendingPage from './pages/trendingpage.jsx';
import ProtectedRoute from './hooks/protectedRoute.jsx';
import NotFoundPage from './pages/notfound.jsx';
import { SearchPage } from './pages/searchPage.jsx';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/trending" element={<TrendingPage />} />
          <Route path="/video/:videoId" element={<VideoPage />} />
          <Route path="/user-profile/:userId" element={<ProfilePage />} />
          <Route path="/premium" element={<Premium />} />
          <Route path="/search/:query" element={<SearchPage />} />

          {/* Protected Routes */}
          <Route path="/upload" element={<ProtectedRoute><VideoUploadPage /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/account-settings" element={<ProtectedRoute><AccountSettings /></ProtectedRoute>} />
          <Route path="/my-content" element={<ProtectedRoute><VideoManagement /></ProtectedRoute>} />
          <Route path="/watchlater" element={<ProtectedRoute><WatchLaterPage /></ProtectedRoute>} />
          <Route path="/  " element={<ProtectedRoute><LikedVideos /></ProtectedRoute>} />
          <Route path="/subscriptions" element={<ProtectedRoute><Mysubscriptions /></ProtectedRoute>} />
          <Route path="/history" element={<ProtectedRoute><WatchHistory /></ProtectedRoute>} />
        </Route>

        {/* Public Routes */}
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/about" element={<BillionTubeAbout />} />
        <Route path="/unauthorized404" element={<UnauthorizedPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter >
  )
}
export default App
