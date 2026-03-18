import React, { useEffect, useState, useMemo } from 'react';
import { useStore } from '../store/useStore';
import { fetchPatients } from '../services/api';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { 
  LayoutGrid, 
  List, 
  Search, 
  Filter, 
  UserPlus, 
  MoreHorizontal,
  Calendar,
  ChevronRight,
  MoreVertical,
  Stethoscope,
  ShieldCheck,
  Trash2,
  X,
  Plus
} from 'lucide-react';
import { cn } from '../utils/cn';

export const Patients: React.FC = () => {
  const patients = useStore((state) => state.patients);
  const setPatients = useStore((state) => state.setPatients);
  const viewMode = useStore((state) => state.viewMode);
  const toggleViewMode = useStore((state) => state.toggleViewMode);
  const addPatient = useStore((state) => state.addPatient);
  const removePatient = useStore((state) => state.removePatient);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: 'Male' as const,
    condition: '',
    specialty: '',
    priority: 'Medium' as const,
    physician: 'Dr. James Smith'
  });

  useEffect(() => {
    const loadPatients = async () => {
      setLoading(true);
      try {
        const data = await fetchPatients();
        setPatients(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (patients.length === 0) loadPatients();
  }, [setPatients, patients.length]);

  const filteredPatients = useMemo(() => {
    return patients.filter(p => 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.condition.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [patients, searchTerm]);

  const handleAddPatient = (e: React.FormEvent) => {
    e.preventDefault();
    const newPatient = {
      ...formData,
      id: Math.random().toString(36).substr(2, 9),
      age: parseInt(formData.age),
      lastVisit: new Date().toISOString().split('T')[0]
    };
    addPatient(newPatient as any);
    setIsModalOpen(false);
    setFormData({
      name: '',
      age: '',
      gender: 'Male',
      condition: '',
      specialty: '',
      priority: 'Medium',
      physician: 'Dr. James Smith'
    });
  };

  return (
    <div className="space-y-8 animate-fade-in animate-duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-2">
        <div className="space-y-1">
          <p className="text-sm font-bold text-primary-600 uppercase tracking-widest">Medical Records</p>
          <h1 className="text-3xl font-extrabold text-slate-900 flex items-center gap-2 group">
            Patient Management
            <div className="bg-primary-100 text-primary-700 text-xs px-2 py-1 rounded-lg ring-1 ring-primary-200">
              {filteredPatients.length} Active
            </div>
          </h1>
          <p className="text-slate-500 font-medium">Manage and monitor patient health records efficiently.</p>
        </div>
        <div className="flex items-center gap-3">
           <Button variant="secondary" className="shadow-sm">
              <Filter className="h-4 w-4 mr-2" />
              Filters
           </Button>
           <Button onClick={() => setIsModalOpen(true)} className="shadow-lg shadow-primary-600/20">
              <UserPlus className="h-4 w-4 mr-2" />
              Add New Patient
           </Button>
        </div>
      </div>

      {/* Control Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-white border border-slate-200 rounded-2xl shadow-sm">
        <div className="relative w-full sm:w-80 group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
          <input 
            type="text" 
            placeholder="Search patients, conditions..." 
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-primary-500/10 placeholder:text-slate-400 placeholder:font-medium text-slate-700 transition-all font-sans"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-xl self-end sm:self-auto border border-slate-200">
          <button 
            onClick={() => viewMode === 'list' && toggleViewMode()}
            className={cn(
              "p-2 rounded-lg transition-all flex items-center gap-2 px-3 text-sm font-bold",
              viewMode === 'grid' ? "bg-white text-primary-600 shadow-sm ring-1 ring-slate-100" : "text-slate-500 hover:text-slate-700"
            )}
          >
            <LayoutGrid className="h-4 w-4" />
            Grid
          </button>
          <button 
            onClick={() => viewMode === 'grid' && toggleViewMode()}
            className={cn(
              "p-2 rounded-lg transition-all flex items-center gap-2 px-3 text-sm font-bold",
              viewMode === 'list' ? "bg-white text-primary-600 shadow-sm ring-1 ring-slate-100" : "text-slate-500 hover:text-slate-700"
            )}
          >
            <List className="h-4 w-4" />
            List
          </button>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
           {[...Array(6)].map((_, i) => (
             <Card key={i} className="animate-pulse bg-slate-100 border-dashed h-48"></Card>
           ))}
        </div>
      ) : ( viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPatients.map((patient, i) => (
            <Card key={patient.id} className="group hover:border-primary-500 transition-all duration-300 animate-fade-in" style={{ animationDelay: `${i * 50}ms` }}>
              <div className="flex justify-between items-start mb-4">
                <div className={cn(
                  "h-12 w-12 rounded-2xl flex items-center justify-center font-bold text-lg ring-4 ring-slate-50 group-hover:scale-110 transition-transform",
                  patient.gender === 'Female' ? "bg-pink-100 text-pink-600" : "bg-blue-100 text-blue-600"
                )}>
                  {patient.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex gap-1">
                  <button 
                    onClick={() => removePatient(patient.id)}
                    className="p-1.5 hover:bg-red-50 rounded-lg text-slate-400 hover:text-red-500 transition-colors"
                    title="Remove Patient"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                  <button className="p-1.5 hover:bg-slate-50 rounded-lg text-slate-400 group-hover:text-slate-600">
                    <MoreHorizontal className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <div className="space-y-4">
                 <div>
                    <h3 className="font-bold text-slate-900 text-lg group-hover:text-primary-700 transition-colors leading-tight mb-1">{patient.name}</h3>
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                       <span>{patient.age} Yrs</span>
                       <span className="h-1 w-1 bg-slate-300 rounded-full"></span>
                       <span>{patient.gender}</span>
                    </div>
                 </div>
                 
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 group-hover:bg-primary-50 group-hover:border-primary-100 transition-colors">
                      <p className="text-[10px] text-slate-400 font-bold uppercase mb-1 flex items-center gap-1.5 tracking-wider">
                        <Stethoscope className="h-3 w-3" />
                        Condition
                      </p>
                      <p className="text-xs font-bold text-slate-700 line-clamp-1">{patient.condition}</p>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 group-hover:bg-primary-50 group-hover:border-primary-100 transition-colors">
                      <p className="text-[10px] text-slate-400 font-bold uppercase mb-1 flex items-center gap-1.5 tracking-wider">
                        <ShieldCheck className="h-3 w-3 text-primary-500" />
                        Priority
                      </p>
                      <span className={cn(
                        "text-[10px] font-extrabold px-1.5 py-0.5 rounded-md uppercase tracking-tighter",
                        patient.priority === 'High' ? "bg-red-100 text-red-700" :
                        patient.priority === 'Medium' ? "bg-amber-100 text-amber-700" :
                        "bg-emerald-100 text-emerald-700"
                      )}>
                        {patient.priority}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 px-1">
                     <div className="h-6 w-6 rounded-full bg-slate-200 border border-white shrink-0 overflow-hidden">
                        <div className="h-full w-full bg-gradient-to-br from-slate-300 to-slate-400 flex items-center justify-center text-[10px] text-white font-bold">
                           {patient.physician.split(' ').pop()![0]}
                        </div>
                     </div>
                     <p className="text-xs font-medium text-slate-500 italic truncate">Primary: <span className="text-slate-700 font-semibold non-italic">{patient.physician}</span></p>
                  </div>

                 <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-2 text-slate-400 font-medium">
                       <Calendar className="h-4 w-4" />
                       <span className="text-xs">Last: {patient.lastVisit}</span>
                    </div>
                    <button className="text-sm font-bold text-primary-600 hover:text-primary-700 flex items-center gap-1 group/btn">
                       Details
                       <ChevronRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                 </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="overflow-x-auto p-0 border-slate-200 shadow-xl shadow-slate-200/50">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-200">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Patient Name</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Age/Gender</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Specialty</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Priority</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Physician</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredPatients.map((patient, i) => (
                <tr key={patient.id} className="hover:bg-slate-50 transition-colors group animate-fade-in" style={{ animationDelay: `${i * 30}ms` }}>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "h-10 w-10 shrink-0 rounded-xl flex items-center justify-center font-bold text-sm",
                        patient.gender === 'Female' ? "bg-pink-100 text-pink-600" : "bg-blue-100 text-blue-600"
                      )}>
                        {patient.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="font-bold text-slate-900 group-hover:text-primary-700 transition-colors">{patient.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-semibold text-slate-600">{patient.age} / {patient.gender}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <span className="px-2.5 py-1 bg-slate-100 border border-slate-200 rounded-lg text-[11px] font-bold text-slate-700 group-hover:bg-primary-50 group-hover:border-primary-200 transition-colors">
                        {patient.condition}
                      </span>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider pl-1">{patient.specialty}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "text-[10px] font-extrabold px-2 py-0.5 rounded-md uppercase border",
                      patient.priority === 'High' ? "bg-red-50 text-red-700 border-red-100" :
                      patient.priority === 'Medium' ? "bg-amber-50 text-amber-700 border-amber-100" :
                      "bg-emerald-50 text-emerald-700 border-emerald-100"
                    )}>
                      {patient.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                       <div className="h-6 w-6 rounded-full bg-slate-200 animate-fade-in flex items-center justify-center text-[10px] font-bold text-white uppercase">
                          {patient.physician.split(' ').pop()![0]}
                       </div>
                       <span className="text-sm font-bold text-slate-700 truncate max-w-[120px]">{patient.physician}</span>
                    </div>
                  </td>
                   <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                       <button 
                         onClick={() => removePatient(patient.id)}
                         className="p-2 hover:bg-red-50 rounded-xl text-slate-400 hover:text-red-500 border border-transparent hover:border-red-100 transition-all"
                       >
                         <Trash2 className="h-4 w-4" />
                       </button>
                       <button className="p-2 hover:bg-white hover:shadow-md rounded-xl text-slate-400 group-hover:text-slate-600 border border-transparent hover:border-slate-100 transition-all">
                         <MoreVertical className="h-5 w-5" />
                       </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredPatients.length === 0 && (
            <div className="py-20 text-center space-y-4">
               <div className="h-20 w-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto">
                 <Search className="h-8 w-8 text-slate-300" />
               </div>
               <div>
                  <h3 className="text-lg font-bold text-slate-900">No records found</h3>
                  <p className="text-sm text-slate-500 font-medium">Try adjusting your search or filters.</p>
               </div>
               <Button variant="secondary" onClick={() => setSearchTerm('')}>Clear Search</Button>
            </div>
          )}
        </Card>
      ))}
      {/* Add Patient Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <Card className="w-full max-w-lg shadow-2xl border-none p-0 overflow-hidden animate-scale-up">
            <div className="bg-primary-600 p-6 text-white flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold">Register New Patient</h2>
                <p className="text-primary-100 text-xs mt-1">Fill in the clinical registration details.</p>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-white/10 rounded-xl transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <form onSubmit={handleAddPatient} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Full Name</label>
                  <input 
                    required 
                    type="text" 
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Age</label>
                  <input 
                    required 
                    type="number" 
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all"
                    value={formData.age}
                    onChange={(e) => setFormData({...formData, age: e.target.value})}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Gender</label>
                  <select 
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all"
                    value={formData.gender}
                    onChange={(e) => setFormData({...formData, gender: e.target.value as any})}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="col-span-2 space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Primary Condition</label>
                  <input 
                    required 
                    type="text" 
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all"
                    value={formData.condition}
                    onChange={(e) => setFormData({...formData, condition: e.target.value})}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Specialty</label>
                  <input 
                    required 
                    type="text" 
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all"
                    value={formData.specialty}
                    onChange={(e) => setFormData({...formData, specialty: e.target.value})}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Priority</label>
                  <select 
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all"
                    value={formData.priority}
                    onChange={(e) => setFormData({...formData, priority: e.target.value as any})}
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button 
                  type="button" 
                  variant="secondary" 
                  className="flex-1"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="flex-1 shadow-lg shadow-primary-600/20"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Register Patient
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
};
