import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LayoutWrapper } from '../components/layout/LayoutWrapper';

// Lazy load pages
const Dashboard = lazy(() => import('../pages/Dashboard').then(module => ({ default: module.Dashboard })));
const Patients = lazy(() => import('../pages/Patients').then(module => ({ default: module.Patients })));
const Analytics = lazy(() => import('../pages/Analytics').then(module => ({ default: module.Analytics })));
const Management = lazy(() => import('../pages/Management').then(module => ({ default: module.Management })));
const Settings = lazy(() => import('../pages/Settings').then(module => ({ default: module.Settings })));
const Login = lazy(() => import('../pages/Login').then(module => ({ default: module.Login })));

const LoadingSpinner = () => (
  <div className="flex items-center justify-center p-20 w-full animate-fade-in">
    <div className="h-12 w-12 animate-linear-spin rounded-full border-4 border-primary-100 border-t-primary-600 shadow-xl"></div>
  </div>
);

export const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route element={<LayoutWrapper />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/patients" element={<Patients />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/management" element={<Management />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};
