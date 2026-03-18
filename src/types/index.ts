export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  condition: string;
  lastVisit: string;
  specialty: string;
  priority: 'Low' | 'Medium' | 'High';
  physician: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  loginTime: number | null;
}

export interface PatientState {
  patients: Patient[];
  loading: boolean;
  error: string | null;
}

export interface UIState {
  viewMode: 'grid' | 'list';
}

export interface AppState extends AuthState, PatientState, UIState {
  setUser: (user: User | null) => void;
  setPatients: (patients: Patient[]) => void;
  addPatient: (patient: Patient) => void;
  removePatient: (id: string) => void;
  toggleViewMode: () => void;
  setLoading: (key: 'auth' | 'patient', loading: boolean) => void;
  logout: () => void;
}

export interface AnalyticsData {
  patientGrowth: { name: string; value: number }[];
  dailyVisits: { name: string; visits: number }[];
  revenue: { name: string; value: number }[];
}
