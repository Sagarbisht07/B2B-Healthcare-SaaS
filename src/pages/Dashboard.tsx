import React, { useEffect } from 'react';
import { Card } from '../components/common/Card';
import { 
  Users, 
  Activity, 
  Calendar, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight,
  ClipboardList,
  MoreVertical,
} from 'lucide-react';
import { useStore } from '../store/useStore';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { cn } from '../utils/cn';

const data = [
  { name: 'Mon', patients: 32 },
  { name: 'Tue', patients: 45 },
  { name: 'Wed', patients: 58 },
  { name: 'Thu', patients: 48 },
  { name: 'Fri', patients: 62 },
  { name: 'Sat', patients: 28 },
  { name: 'Sun', patients: 18 },
];

export const Dashboard: React.FC = () => {
  const { user } = useStore();
  
  useEffect(() => {
    const triggerWelcomeNotification = async () => {
      if ('serviceWorker' in navigator && Notification.permission === 'granted') {
        const registration = await navigator.serviceWorker.ready;
        registration.showNotification(`Welcome back, ${user?.displayName || 'Doctor'}!`, {
          body: 'Your clinic dashboard is ready for today.',
          icon: '/favicon.svg',
          badge: '/favicon.svg',
          tag: 'welcome-msg'
        });
      }
    };
    triggerWelcomeNotification();
  }, [user]);

  const stats = [
    { 
      label: 'Total Patients', 
      value: '1,284', 
      change: '+12.5%', 
      isUp: true, 
      icon: Users,
      color: 'blue'
    },
    { 
      label: 'Active Cases', 
      value: '482', 
      change: '+2.1%', 
      isUp: true, 
      icon: Activity,
      color: 'emerald'
    },
    { 
      label: 'Appointments', 
      value: '36', 
      change: '-4.3%', 
      isUp: false, 
      icon: Calendar,
      color: 'amber'
    },
    { 
      label: 'Avg. Recovery', 
      value: '14 Days', 
      change: '+3.2%', 
      isUp: true, 
      icon: ClipboardList,
      color: 'purple'
    },
  ];

  return (
    <div className="space-y-10 animate-fade-in animate-duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
        <div className="space-y-1">
          <p className="text-sm font-bold text-primary-600 uppercase tracking-widest">Clinic Overview</p>
          <h1 className="text-3xl font-extrabold text-slate-900 flex items-center gap-2 group">
            Welcome back, {user?.displayName || 'Dr. Smith'}
            <span className="text-2xl animate-bounce">👋</span>
          </h1>
          <p className="text-slate-500 font-medium">Here's what's happening at your clinic today.</p>
        </div>
        <div className="flex items-center gap-3">
           <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl font-semibold text-slate-700 hover:bg-slate-50 transition-all flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Mar 18, 2026
           </button>
           <button className="px-4 py-2 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 shadow-lg shadow-primary-600/20 transition-all flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Reports
           </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.label} className="group hover:border-primary-500 transition-all duration-300 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-125 transition-transform duration-500">
                <stat.icon className="h-20 w-20" />
             </div>
             <div className="flex flex-col gap-4 relative z-10">
                <div className={cn(
                  "h-12 w-12 rounded-2xl flex items-center justify-center transition-all group-hover:rotate-12 group-hover:scale-110 shadow-sm",
                  stat.color === 'blue' ? "bg-blue-100 text-blue-600" :
                  stat.color === 'emerald' ? "bg-emerald-100 text-emerald-600" :
                  stat.color === 'amber' ? "bg-amber-100 text-amber-600" : "bg-purple-100 text-purple-600"
                )}>
                   <stat.icon className="h-6 w-6" />
                </div>
                <div className="space-y-1">
                   <p className="text-sm font-bold text-slate-500 uppercase tracking-wide">{stat.label}</p>
                   <div className="flex items-end justify-between">
                      <h3 className="text-3xl font-extrabold text-slate-900 leading-none">{stat.value}</h3>
                      <div className={cn(
                        "flex items-center gap-1 text-sm font-bold mb-1",
                        stat.isUp ? "text-emerald-600" : "text-red-500"
                      )}>
                         {stat.isUp ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                         {stat.change}
                      </div>
                   </div>
                </div>
             </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Patient Volume Chart */}
        <Card className="lg:col-span-2 shadow-2xl shadow-slate-200/50">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-extrabold text-slate-900 mb-1">Patient Volume</h3>
              <p className="text-sm text-slate-500 font-medium">Weekly traffic analysis</p>
            </div>
            <button className="p-2 hover:bg-slate-50 rounded-lg text-slate-400">
              <MoreVertical className="h-5 w-5" />
            </button>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorPatients" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 500}}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 500}}
                />
                <Tooltip 
                  contentStyle={{
                    borderRadius: '16px',
                    border: 'none',
                    boxShadow: '0 10px 30px -5px rgba(59, 130, 246, 0.15)',
                    padding: '12px'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="patients" 
                  stroke="#2563eb" 
                  strokeWidth={4}
                  fillOpacity={1} 
                  fill="url(#colorPatients)" 
                  animationDuration={2000}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Recent Activities */}
        <Card className="shadow-2xl shadow-slate-200/50">
           <h3 className="text-xl font-extrabold text-slate-900 mb-6">Recent Alerts</h3>
           <div className="space-y-6">
              {[
                { time: '10m ago', msg: 'New Patient Record: Emily Brown', type: 'info', patient: 'EB' },
                { time: '2h ago', msg: 'Pharmacy pickup confirmed - John Doe', type: 'success', patient: 'JD' },
                { time: '4h ago', msg: 'Lab results missing - Robert Johnson', type: 'warning', patient: 'RJ' },
                { time: 'Yesterday', msg: 'Appointment canceled - Michael Wilson', type: 'error', patient: 'MW' },
              ].map((alert, i) => (
                <div key={i} className="flex gap-4 group cursor-pointer animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
                   <div className={cn(
                     "h-10 w-10 shrink-0 rounded-full flex items-center justify-center font-bold text-xs ring-4 ring-slate-50",
                     alert.type === 'info' ? "bg-blue-100 text-blue-600" :
                     alert.type === 'success' ? "bg-emerald-100 text-emerald-600" :
                     alert.type === 'warning' ? "bg-amber-100 text-amber-600" : "bg-red-100 text-red-600"
                   )}>
                      {alert.patient}
                   </div>
                   <div className="border-b border-slate-100 pb-4 w-full">
                      <div className="flex justify-between items-start mb-1">
                         <p className="text-sm font-bold text-slate-800 group-hover:text-primary-600 transition-colors leading-tight">
                            {alert.msg}
                         </p>
                      </div>
                      <p className="text-xs text-slate-400 font-medium">{alert.time}</p>
                   </div>
                </div>
              ))}
              <button className="w-full py-3 text-sm font-bold text-slate-500 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all border border-dashed border-slate-200">
                 View All Alerts &uarr;
              </button>
           </div>
        </Card>
      </div>
    </div>
  );
};
