import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Home, Lock, Shield } from 'lucide-react';

const AdminLoginPage = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Invalid credentials');
      }

      localStorage.setItem('admin_token', data.token);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <a href="/" className="inline-flex items-center gap-3 mb-6 group">
            <div className="p-3 bg-gold-500 rounded-xl group-hover:scale-105 transition-transform">
              <Home className="h-7 w-7 text-white" />
            </div>
            <div className="text-left">
              <div className="text-2xl font-bold tracking-tight text-white">
                LUXE <span className="text-gold-500">ESTATES</span>
              </div>
              <div className="text-xs tracking-widest uppercase text-slate-400">
                Admin Portal
              </div>
            </div>
          </a>
          <div className="flex items-center justify-center gap-2 text-slate-400 text-sm">
            <Shield className="w-4 h-4 text-gold-500" />
            <span>Secure Admin Access</span>
          </div>
        </div>

        {/* Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl">
          <h1 className="text-2xl font-bold text-white mb-2">Sign In</h1>
          <p className="text-slate-400 text-sm mb-8">
            Enter your admin password to access the management dashboard.
          </p>

          {error && (
            <div className="mb-6 bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl text-sm flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 bg-red-400 rounded-full flex-shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Admin Password
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="admin-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter admin password"
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl pl-11 pr-11 py-3.5 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent placeholder-slate-500 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gold-500 hover:bg-gold-600 text-white font-bold py-3.5 rounded-xl transition-all duration-300 shadow-lg shadow-gold-500/20 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Verifying...
                </>
              ) : (
                <>
                  <Shield className="w-4 h-4" />
                  Access Dashboard
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-800 text-center">
            <a href="/" className="text-slate-500 hover:text-gold-500 text-sm transition-colors">
              ← Return to Public Website
            </a>
          </div>
        </div>

        <p className="text-center text-slate-600 text-xs mt-6">
          © {new Date().getFullYear()} Luxe Estates. Authorised Personnel Only.
        </p>
      </div>
    </div>
  );
};

export default AdminLoginPage;
