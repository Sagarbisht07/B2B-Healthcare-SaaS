import React, { useEffect, useState } from 'react';
import { Card } from '../components/common/Card';
import { getAnalyticsData } from '../services/api';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell,
  Legend
} from 'recharts';
import { TrendingUp, Users, DollarSign, Download, Filter, ChevronRight, Activity, Zap } from 'lucide-react';
import type { AnalyticsData } from '../types';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

export const Analytics: React.FC = () => {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const result = await getAnalyticsData();
      setData(result);
      setLoading(false);
    };
    loadData();
  }, []);

  if (loading || !data) {
     return (
        <div className="flex h-96 w-full items-center justify-center">
           <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary-200 border-t-primary-600"></div>
        </div>
     );
  }

  return (
    <div className="space-y-10 animate-fade-in animate-duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-2">
        <div className="space-y-1">
          <p className="text-sm font-bold text-primary-600 uppercase tracking-widest">Performance Insights</p>
          <h1 className="text-3xl font-extrabold text-slate-900 flex items-center gap-2 group">
            Data Analytics
            <Zap className="h-6 w-6 text-amber-500 fill-amber-500 animate-pulse" />
          </h1>
          <p className="text-slate-500 font-medium">Detailed metrics on patient growth and revenue performance.</p>
        </div>
        <div className="flex items-center gap-3">
           <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl font-semibold text-slate-700 hover:bg-slate-50 transition-all flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Custom Range
           </button>
           <button className="px-4 py-2 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 shadow-lg shadow-primary-600/20 transition-all flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export Report
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Patient Growth Line Chart */}
        <Card className="shadow-xl shadow-slate-200/50 hover:border-primary-200 transition-all group overflow-visible relative">
           <div className="absolute -top-4 -right-4 h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center ring-8 ring-slate-50 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
              <Activity className="h-8 w-8 text-blue-600" />
           </div>
           <div className="flex items-center justify-between mb-8">
              <div>
                 <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-primary-700 transition-colors">Patient Growth</h3>
                 <p className="text-sm text-slate-500 font-medium flex items-center gap-1.5">
                    <TrendingUp className="h-3 w-3 text-emerald-500" />
                    Increased by 12.5% vs last month
                 </p>
              </div>
           </div>
           <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.patientGrowth}>
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
                <Line 
                   type="monotone" 
                   dataKey="value" 
                   stroke="#2563eb" 
                   strokeWidth={4} 
                   dot={{ r: 6, fill: '#2563eb', strokeWidth: 2, stroke: '#fff' }}
                   activeDot={{ r: 8, strokeWidth: 0 }}
                   animationDuration={2500}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Daily Visits Bar Chart */}
        <Card className="shadow-xl shadow-slate-200/50 hover:border-emerald-200 transition-all group overflow-visible relative">
           <div className="flex items-center justify-between mb-8">
              <div>
                 <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-emerald-700 transition-colors">Daily Visits</h3>
                 <p className="text-sm text-slate-500 font-medium">Distribution across the week</p>
              </div>
           </div>
           <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.dailyVisits}>
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
                    cursor={{fill: '#f1f5f9' }}
                    contentStyle={{
                      borderRadius: '16px',
                      border: 'none',
                      boxShadow: '0 10px 30px -5px rgba(16, 185, 129, 0.15)',
                      padding: '12px'
                    }}
                />
                <Bar 
                   dataKey="visits" 
                   fill="#10b981" 
                   radius={8} 
                   barSize={40}
                   animationDuration={2000}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Revenue Pie Chart */}
        <Card className="shadow-xl shadow-slate-200/50 hover:border-amber-200 transition-all group">
           <div className="flex items-center justify-between mb-8">
              <div>
                 <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-amber-700 transition-colors">Revenue Allocation</h3>
                 <p className="text-sm text-slate-500 font-medium">Quarterly financial breakdown</p>
              </div>
           </div>
           <div className="h-[350px] w-full flex flex-col items-center justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={data.revenue}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={110}
                  fill="#8884d8"
                  paddingAngle={8}
                  dataKey="value"
                  animationDuration={2000}
                >
                  {data.revenue.map((_: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                   contentStyle={{
                     borderRadius: '16px',
                     border: 'none',
                     boxShadow: '0 10px 30px -5px rgba(245, 158, 11, 0.15)',
                     padding: '12px'
                   }}
                />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="relative -top-[165px] flex flex-col items-center pointer-events-none">
               <span className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-none">Total</span>
               <span className="text-2xl font-black text-slate-900">$206k</span>
            </div>
          </div>
        </Card>

        {/* Insight List */}
        <div className="space-y-6">
           <Card className="bg-gradient-to-br from-primary-600 to-primary-800 text-white border-none shadow-2xl shadow-primary-600/20 overflow-hidden relative">
              <div className="absolute top-0 right-0 h-32 w-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
              <Activity className="h-10 w-10 text-white/30 mb-6" />
              <h3 className="text-2xl font-bold mb-2">Automated Insight</h3>
              <p className="text-primary-100 font-medium mb-6 leading-relaxed">
                 You are experiencing 24% higher patient traffic on Wednesdays. Consider optimizing staff allocation for mid-week surges.
              </p>
              <button className="px-6 py-2 bg-white text-primary-700 font-bold rounded-xl hover:bg-primary-50 transition-colors flex items-center gap-2 text-sm shadow-xl shadow-black/10">
                 Run AI Audit
                 <ChevronRight className="h-4 w-4" />
              </button>
           </Card>

           <div className="grid grid-cols-2 gap-4">
              <Card padding="sm" className="hover:border-primary-200 transition-all cursor-pointer">
                 <div className="h-10 w-10 bg-blue-100 rounded-xl flex items-center justify-center mb-3">
                    <Users className="h-5 w-5 text-blue-600" />
                 </div>
                 <h4 className="text-2xl font-black text-slate-900">4.8</h4>
                 <p className="text-xs font-bold text-slate-400 uppercase">Patient Score</p>
              </Card>
              <Card padding="sm" className="hover:border-emerald-200 transition-all cursor-pointer">
                 <div className="h-10 w-10 bg-emerald-100 rounded-xl flex items-center justify-center mb-3">
                    <DollarSign className="h-5 w-5 text-emerald-600" />
                 </div>
                 <h4 className="text-2xl font-black text-slate-900">$184</h4>
                 <p className="text-xs font-bold text-slate-400 uppercase">Avg Revenue/P</p>
              </Card>
           </div>
        </div>
      </div>
    </div>
  );
};
