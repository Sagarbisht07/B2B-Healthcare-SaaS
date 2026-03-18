import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { signInWithEmailAndPassword, auth } from '../services/firebase';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { Shield, Mail, Lock, Eye, EyeOff, CheckCircle2 } from 'lucide-react';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('demo@careconnect.com');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  const { setUser, isAuthenticated } = useStore();
  const navigate = useNavigate();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    setError(null);
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email.trim(), password.trim());
      const user = userCredential.user;
      setUser({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || 'Demo User',
        photoURL: user.photoURL,
      });
      navigate('/');
    } catch (err: any) {
      console.error(err);
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        setError('Invalid email or password. Use demo@careconnect.com / password123');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 overflow-hidden relative">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 h-96 w-96 bg-primary-100 rounded-full blur-3xl -mr-48 -mt-48 opacity-40"></div>
      <div className="absolute bottom-0 left-0 h-96 w-96 bg-primary-100 rounded-full blur-3xl -ml-48 -mb-48 opacity-40"></div>
      
      <div className="w-full max-w-md space-y-8 animate-fade-in relative z-10">
        <div className="text-center group">
          <div className="inline-flex items-center justify-center h-16 w-16 bg-primary-600 rounded-2xl text-white shadow-xl shadow-primary-600/20 group-hover:scale-110 transition-transform duration-300">
            <Shield className="h-8 w-8" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold font-display bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
            CareConnect Pro
          </h2>
          <p className="mt-2 text-sm text-slate-500 font-medium">
            The next-generation B2B healthcare platform
          </p>
        </div>

        <Card className="shadow-2xl shadow-primary-500/10 border-white/40 backdrop-blur-sm bg-white/90">
          <form className="space-y-6" onSubmit={handleLogin}>
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg animate-fade-in">
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 h-5 w-5 bg-red-100 rounded-full flex items-center justify-center">
                    <span className="text-red-600 font-bold text-xs">!</span>
                  </div>
                  <p className="text-sm text-red-700 font-medium">{error}</p>
                </div>
              </div>
            )}

            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-700 ml-1">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@clinic.com"
                  className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all duration-200"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-700 ml-1">Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-11 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all duration-200"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between px-1">
              <label className="flex items-center gap-2 cursor-pointer group">
                <div className="relative h-5 w-5">
                   <input type="checkbox" className="peer absolute opacity-0 cursor-pointer" />
                   <div className="h-5 w-5 border-2 border-slate-200 rounded group-hover:border-primary-500 peer-checked:bg-primary-500 peer-checked:border-primary-500 transition-all"></div>
                   <CheckCircle2 className="absolute top-0.5 left-0.5 h-4 w-4 text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
                </div>
                <span className="text-sm text-slate-600 font-medium">Remember me</span>
              </label>
              <a href="#" className="text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors">
                Forgot Password?
              </a>
            </div>

            <Button
              type="submit"
              className="w-full py-3.5 text-lg shadow-lg shadow-primary-600/20"
              loading={loading}
              size="lg"
            >
              Secure Sign In
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <p className="text-sm text-slate-500">
              New to CareConnect? <a href="#" className="font-bold text-primary-600 hover:text-primary-700">Get started here</a>
            </p>
          </div>
        </Card>

        <div className="flex justify-center gap-8 text-xs font-semibold text-slate-400 uppercase tracking-widest italic opacity-60">
           <span>HIPAA Compliant</span>
           <span>ISO 27001</span>
           <span>SOC 2 Type II</span>
        </div>
      </div>
    </div>
  );
};
