import type { Patient, AnalyticsData } from '../types';

export const mockPatients: Patient[] = [
  { id: '1', name: 'John Doe', age: 45, gender: 'Male', condition: 'Hypertension', lastVisit: '2024-03-10', specialty: 'Cardiology', priority: 'Medium', physician: 'Dr. James Smith' },
  { id: '2', name: 'Jane Smith', age: 32, gender: 'Female', condition: 'Type 2 Diabetes', lastVisit: '2024-03-12', specialty: 'Endocrinology', priority: 'High', physician: 'Dr. Sarah Wilson' },
  { id: '3', name: 'Robert Johnson', age: 68, gender: 'Male', condition: 'Heart Failure', lastVisit: '2024-03-05', specialty: 'Cardiology', priority: 'High', physician: 'Dr. James Smith' },
  { id: '4', name: 'Emily Brown', age: 29, gender: 'Female', condition: 'Asthma', lastVisit: '2024-03-14', specialty: 'Pulmonology', priority: 'Low', physician: 'Dr. Robert Blake' },
  { id: '5', name: 'Michael Wilson', age: 52, gender: 'Male', condition: 'COPD', lastVisit: '2024-02-28', specialty: 'Pulmonology', priority: 'Medium', physician: 'Dr. Robert Blake' },
];

export const fetchPatients = async (): Promise<Patient[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockPatients), 800);
  });
};

export const getAnalyticsData = async (): Promise<AnalyticsData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        patientGrowth: [
          { name: 'Jan', value: 400 },
          { name: 'Feb', value: 600 },
          { name: 'Mar', value: 800 },
          { name: 'Apr', value: 1200 },
          { name: 'May', value: 1500 },
        ],
        dailyVisits: [
          { name: 'Mon', visits: 120 },
          { name: 'Tue', visits: 80 },
          { name: 'Wed', visits: 150 },
          { name: 'Thu', visits: 100 },
          { name: 'Fri', visits: 110 },
          { name: 'Sat', visits: 60 },
          { name: 'Sun', visits: 40 },
        ],
        revenue: [
          { name: 'Q1', value: 45000 },
          { name: 'Q2', value: 52000 },
          { name: 'Q3', value: 48000 },
          { name: 'Q4', value: 61000 },
        ]
      });
    }, 1000);
  });
};
