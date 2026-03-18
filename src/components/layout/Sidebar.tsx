import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  BarChart2, 
  Settings, 
  ShieldCheck, 
  ChevronRight,
  HelpCircle,
} from 'lucide-react';
import { cn } from '../../utils/cn';

const navItems = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
  { name: 'Patients', icon: Users, path: '/patients' },
  { name: 'Analytics', icon: BarChart2, path: '/analytics' },
  { name: 'Clinic Management', icon: ShieldCheck, path: '/management' },
  { name: 'Settings', icon: Settings, path: '/settings' },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 transform bg-white border-r border-slate-200 transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 lg:z-auto",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo - Mobile only */}
          <div className="flex h-16 shrink-0 items-center gap-2 px-6 lg:hidden">
            <div className="bg-primary-600 p-2 rounded-xl text-white">
              <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>
              </svg>
            </div>
            <span className="text-xl font-bold font-display bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
              CareConnect
            </span>
          </div>

          <div className="flex-1 overflow-y-auto py-6 px-4 space-y-8 scrollbar-hide">
            {/* Main Navigation */}
            <div>
              <p className="px-4 text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">Main Menu</p>
              <nav className="space-y-1">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <NavLink
                      key={item.name}
                      to={item.path}
                      onClick={() => {
                        if (window.innerWidth < 1024) onClose();
                      }}
                      className={cn(
                        "group flex items-center justify-between px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200",
                        isActive 
                          ? "bg-primary-50 text-primary-700 shadow-sm shadow-primary-500/10" 
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className={cn(
                          "h-5 w-5 flex-shrink-0 transition-colors",
                          isActive ? "text-primary-600" : "text-slate-400 group-hover:text-slate-600"
                        )} />
                        {item.name}
                      </div>
                      {isActive && <ChevronRight className="h-4 w-4 text-primary-400" />}
                    </NavLink>
                  );
                })}
              </nav>
            </div>

            {/* Support section */}
            <div>
              <p className="px-4 text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">Support</p>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <HelpCircle className="h-6 w-6 text-primary-600 mb-2" />
                <h4 className="text-sm font-bold text-slate-900 mb-1">Need help?</h4>
                <p className="text-xs text-slate-500 mb-3">Check our docs or contact our support team.</p>
                <button className="text-xs font-semibold text-primary-600 hover:text-primary-700">Explore Help Center &rarr;</button>
              </div>
            </div>
          </div>

          {/* Footer Card */}
          <div className="p-4 bg-slate-50 border-t border-slate-200 lg:bg-white lg:border-t-0">
             <div className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-2xl shadow-sm group hover:border-primary-200 transition-all cursor-pointer">
                <div className="h-10 w-10 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold shadow-md shadow-primary-500/20">
                    JS
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1">
                      <p className="text-sm font-bold text-slate-900 truncate">Dr. James Smith</p>
                      <ShieldCheck className="h-3 w-3 text-primary-500 shrink-0" />
                    </div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Chief Surgeon</p>
                </div>
                <button className="p-1.5 hover:bg-slate-50 rounded-lg text-slate-400 hover:text-primary-600 transition-colors">
                    <Settings className="h-4 w-4" />
                </button>
             </div>
          </div>
        </div>
      </aside>
    </>
  );
};
