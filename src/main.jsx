
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { UserProvider } from './context/AuthContext.jsx'
import { NotificationProvider } from './context/notificationcontext.jsx';

createRoot(document.getElementById('root')).render(

  <NotificationProvider>
    <UserProvider>
      <App />
    </UserProvider>
  </NotificationProvider>

)
