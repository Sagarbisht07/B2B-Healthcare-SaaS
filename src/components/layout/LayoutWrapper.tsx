import React, { useState, useEffect } from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { useStore } from '../../store/useStore';
import { onAuthStateChanged, auth } from '../../services/firebase';

export const LayoutWrapper: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const { isAuthenticated, setUser, setLoading, loading } = useStore();
  const location = useLocation();

  useEffect(() => {
    // Only use the real-time auth listener if we're not authenticated yet
    // or to keep things in sync. For mock mode, we rely on Zustand persistence.
    if (!isAuthenticated) {
       setLoading('auth', true);
       const unsubscribe = onAuthStateChanged(auth, (user) => {
         if (user) {
           setUser({
             uid: user.uid,
             email: user.email,
             displayName: user.displayName || 'Demo User',
             photoURL: user.photoURL,
           });
         } else {
           setUser(null);
         }
         setLoading('auth', false);
       });
       return () => unsubscribe();
    }
  }, [setUser, setLoading, isAuthenticated]);

  if (loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-slate-50 transition-all duration-300">
        <div className="flex flex-col items-center gap-4">
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-primary-200 border-t-primary-600 shadow-xl"></div>
          <p className="text-slate-500 font-medium animate-pulse">Initializing CareConnect...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated && location.pathname !== '/login') {
    return <Navigate to="/login" replace />;
  }

  if (location.pathname === '/login') {
    return <Outlet />;
  }

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex flex-col flex-1 w-full overflow-hidden">
        <Navbar onToggleSidebar={() => setSidebarOpen(true)} />
        
        <main className="flex-1 overflow-y-auto overflow-x-hidden pt-4 pb-12 px-4 sm:px-6 lg:px-8 scrollbar-hide">
          <div className="max-w-7xl mx-auto py-6 space-y-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
