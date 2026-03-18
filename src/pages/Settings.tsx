import React from 'react';
import { Card } from '../components/common/Card';
import { User, Bell, Shield, Smartphone, Globe } from 'lucide-react';
import { Button } from '../components/common/Button';

export const Settings: React.FC = () => {
  return (
    <div className="space-y-10 animate-fade-in animate-duration-500">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Platform Settings</h1>
        <p className="text-slate-500 font-medium">Global configuration for your clinic's digital workspace.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-64 shrink-0">
          <Card padding="sm" className="space-y-1">
            <button className="w-full flex items-center gap-3 px-3 py-2 bg-primary-50 text-primary-700 rounded-xl text-sm font-bold">
              <User className="h-4 w-4" />
              General Profile
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2 text-slate-500 hover:bg-slate-50 rounded-xl text-sm font-bold transition-all">
              <Bell className="h-4 w-4" />
              Notifications
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2 text-slate-500 hover:bg-slate-50 rounded-xl text-sm font-bold transition-all">
              <Shield className="h-4 w-4" />
              Security
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2 text-slate-500 hover:bg-slate-50 rounded-xl text-sm font-bold transition-all">
              <Smartphone className="h-4 w-4" />
              Device Management
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2 text-slate-500 hover:bg-slate-50 rounded-xl text-sm font-bold transition-all">
              <Globe className="h-4 w-4" />
              localization
            </button>
          </Card>
        </div>

        <div className="flex-1 space-y-8">
           <Card>
              <h3 className="text-xl font-bold mb-6">Profile Settings</h3>
              <div className="space-y-6">
                 <div className="flex items-center gap-6 pb-6 border-b border-slate-100">
                    <div className="h-20 w-20 bg-primary-100 rounded-2xl flex items-center justify-center text-primary-600">
                       <User className="h-10 w-10 text-primary-300" />
                    </div>
                    <div>
                        <Button size="sm">Change Avatar</Button>
                        <p className="text-xs text-slate-500 mt-2 font-medium">JPG, PNG or GIF up to 5MB.</p>
                    </div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-sm font-bold text-slate-700 uppercase tracking-wide">Full Name</label>
                       <input type="text" defaultValue="Dr. James Smith" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500/10 focus:border-primary-500 outline-none" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-sm font-bold text-slate-700 uppercase tracking-wide">Organization</label>
                       <input type="text" defaultValue="CareCenter Inc." className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500/10 focus:border-primary-500 outline-none" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-sm font-bold text-slate-700 uppercase tracking-wide">Email</label>
                       <input type="email" defaultValue="demo@careconnect.com" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500/10 focus:border-primary-500 outline-none" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-sm font-bold text-slate-700 uppercase tracking-wide">License No.</label>
                       <input type="text" defaultValue="MD-8234-912" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500/10 focus:border-primary-500 outline-none" />
                    </div>
                 </div>
              </div>
           </Card>

           <Card className="border-red-100 bg-red-50/20">
              <h3 className="text-xl font-bold text-red-700 mb-2">Danger Zone</h3>
              <p className="text-sm text-red-600 mb-6 font-medium">Actions here are irreversible. Please use caution.</p>
              <Button variant="danger" size="sm" className="shadow-lg shadow-red-500/10">Delete Organization</Button>
           </Card>
        </div>
      </div>
    </div>
  );
};
