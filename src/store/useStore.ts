import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { AppState, User, Patient } from '../types';

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      // Auth State
      user: null,
      isAuthenticated: false,
      loading: false,
      error: null,
      loginTime: null,

      // Patient State
      patients: [],
      
      // UI State
      viewMode: 'grid',

      // Actions
      setUser: (user: User | null) => set({ 
        user, 
        isAuthenticated: !!user,
        loginTime: user ? Date.now() : null
      }),
      
      setPatients: (patients: Patient[]) => set({ patients }),

      addPatient: (patient: Patient) => set((state) => ({ 
        patients: [patient, ...state.patients] 
      })),

      removePatient: (id: string) => set((state) => ({ 
        patients: state.patients.filter((p) => p.id !== id) 
      })),

      toggleViewMode: () => set((state) => ({ viewMode: state.viewMode === 'grid' ? 'list' : 'grid' })),

      setLoading: (key: 'auth' | 'patient', loading: boolean) => {
        if (key === 'auth') set({ loading });
        if (key === 'patient') set({ loading });
      },

      logout: () => set({ user: null, isAuthenticated: false, loginTime: null }),
    }),
    {
      name: 'healthcare-store',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
