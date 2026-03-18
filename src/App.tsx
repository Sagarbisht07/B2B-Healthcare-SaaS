import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes/AppRoutes';
import { useStore } from './store/useStore';

const App: React.FC = () => {
  const { loginTime, logout, isAuthenticated } = useStore();

  useEffect(() => {
    if (isAuthenticated && loginTime) {
      const oneHour = 3600000; // 1 hour in ms
      const timePassed = Date.now() - loginTime;

      if (timePassed > oneHour) {
        logout();
      } else {
        // Set a timer for the remaining time
        const remainingTime = oneHour - timePassed;
        const timer = setTimeout(() => {
          logout();
          alert('Session expired. Please log in again.');
        }, remainingTime);

        return () => clearTimeout(timer);
      }
    }
  }, [isAuthenticated, loginTime, logout]);

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;
