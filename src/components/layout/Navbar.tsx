import React from 'react';
import { Bell, User as UserIcon, LogOut, Menu } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { signOut, auth } from '../../services/firebase';
import { useNavigate } from 'react-router-dom';
import { Button } from '../common/Button';

interface NavbarProps {
  onToggleSidebar: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar }) => {
  const { user, logout } = useStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      logout();
      navigate('/login');
    } catch (err) {
      console.error('Logout failed', err);
    }
  };

  const handleNotification = async () => {
    if (!("Notification" in window)) return;

    const requestPermission = async () => {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        sendSWNotification('Welcome to CareConnect!', 'Notifications are now active.');
      }
    };

    const sendSWNotification = async (title: string, body: string) => {
      if ('serviceWorker' in navigator) {
        const registration = await navigator.serviceWorker.ready;
        registration.showNotification(title, {
          body,
          icon: '/favicon.svg',
          badge: '/favicon.svg',
          tag: 'careconnect-update'
        });
      }
    };

    if (Notification.permission === "granted") {
      sendSWNotification('CareConnect Notification', 'New patient record has been updated.');
    } else if (Notification.permission !== "denied") {
      requestPermission();
    }
  };

  return (
    <header className="sticky top-0 z-30 flex w-full bg-white/80 backdrop-blur-md border-b border-slate-200 h-16 transition-all duration-300">
      <div className="flex h-full w-full items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <button 
            onClick={onToggleSidebar}
            className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-lg hover:text-slate-700"
          >
            <Menu className="h-6 w-6" />
          </button>
          <div className="flex items-center gap-2 group cursor-pointer" onClick={() => navigate('/')}>
            <div className="bg-primary-600 p-2 rounded-xl text-white group-hover:scale-110 transition-transform">
              <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>
              </svg>
            </div>
            <span className="hidden sm:block text-xl font-bold font-display bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
              CareConnect
            </span>
          </div>
        </div>

        {/* Global Search */}
        <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
          <div className="relative w-full group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
               <svg className="h-4 w-4 text-slate-400 group-focus-within:text-primary-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
               </svg>
            </div>
            <input 
              type="text" 
              placeholder="Search records, appointments..." 
              className="block w-full pl-10 pr-3 py-2 border-none bg-slate-100 hover:bg-slate-200 focus:bg-white focus:ring-2 focus:ring-primary-500/10 rounded-xl text-sm transition-all font-medium placeholder:text-slate-500"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={handleNotification}
            className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors relative"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
          
          <div className="h-4 w-px bg-slate-200 mx-1 hidden sm:block"></div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-sm font-medium text-slate-700 leading-none">{user?.displayName || 'Dr. Smith'}</span>
              <span className="text-xs text-slate-500">Administrator</span>
            </div>
            <button className="h-10 w-10 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 overflow-hidden ring-2 ring-white shadow-sm">
              {user?.photoURL ? (
                <img src={user.photoURL} alt="Avatar" className="h-full w-full object-cover" />
              ) : (
                <UserIcon className="h-5 w-5" />
              )}
            </button>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="hidden sm:inline-flex text-red-600 hover:bg-red-50 hover:text-red-700">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
