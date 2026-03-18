import React from 'react';
import { Card } from '../components/common/Card';
import { Shield, Users, Database, Bell } from 'lucide-react';

export const Management: React.FC = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900">Clinic Management</h1>
        <p className="text-slate-500">Configure your hospital infrastructure and staff access.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="hover:border-primary-500 transition-all cursor-pointer group">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Staff Directory</h3>
              <p className="text-sm text-slate-500">Manage doctors, nurses, and administrative staff.</p>
            </div>
          </div>
        </Card>

        <Card className="hover:border-primary-500 transition-all cursor-pointer group">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <Shield className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Role Permissions</h3>
              <p className="text-sm text-slate-500">Define access levels for different staff roles.</p>
            </div>
          </div>
        </Card>

        <Card className="hover:border-primary-500 transition-all cursor-pointer group">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <Database className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Inventory & Pharmacy</h3>
              <p className="text-sm text-slate-500">Track medical supplies and pharmaceutical stock.</p>
            </div>
          </div>
        </Card>

        <Card className="hover:border-primary-500 transition-all cursor-pointer group">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <Bell className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg">System Alerts</h3>
              <p className="text-sm text-slate-500">Configure automated clinical and administrative alerts.</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
